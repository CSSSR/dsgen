import { snippetsFormatterJetBrains } from './formatters/snippets/JetBrains'
import { snippetsFormatterVSCode } from './formatters/snippets/VSCode'
import { variablesFormatterCSS } from './formatters/variables/CSS'
import { TOKEN_GROUPS_DETAILS } from './tokenGroups'
import {
  Config,
  Snippet,
  SnippetsFormatter,
  SnippetsTarget,
  Theme,
  TOKEN_GROUPS,
  TokenGroup,
  Variable,
  VariablesFormatter,
  VariablesGroup,
  VariablesMap,
  ConfigVariable,
  VariableValue,
} from './types'

const DEFAULT_WILDCARD_SUFFIX = 'var'

export const getThemes = (config: Config): Theme[] =>
  Object.entries(config.themes ?? { default: ':root' }).map<Theme>(
    ([themeName, themeSelector], themeIdx) => ({
      selector: themeSelector,
      variablesGroups: getThemeVariablesGroups(config, themeName, themeIdx),
    })
  )

const getThemeVariablesGroups = (
  config: Config,
  themeName: string,
  themeIdx: number
): VariablesGroup[] =>
  TOKEN_GROUPS.map<VariablesGroup | undefined>((tokenGroup) => {
    const groupVariables = config[tokenGroup]
    const themeVariables = groupVariables
      ? getThemeVariables(tokenGroup, groupVariables, themeName, themeIdx)
      : []

    if (themeVariables.length) {
      return {
        description: TOKEN_GROUPS_DETAILS[tokenGroup].description,
        variables: themeVariables,
      }
    }
  }).filter(isNotNil)

const getThemeVariables = (
  tokenGroup: TokenGroup,
  variables: VariablesMap,
  themeName: string,
  themeIdx: number
): Variable[] =>
  Object.entries(variables)
    .map<Variable | null>(([varName, configVariable]) => {
      const name = getVariableName(tokenGroup, varName)
      const varValue = getVariableValue(configVariable)
      // Add descriptions only inside first theme to not clutter CSS file with repeating comments
      const description =
        themeIdx === 0 ? getVariableDescription(configVariable) : undefined

      if (typeof varValue === 'string') {
        return themeIdx === 0 ? { name, value: varValue, description } : null
      } else {
        return varValue[themeName]
          ? { name, value: varValue[themeName], description }
          : null
      }
    })
    .filter(isNotNil)

export const getSnippetsList = (config: Config): Snippet[] => {
  const mediaQuerySnippets: Snippet[] = config.mediaQueries
    ? Object.entries(config.mediaQueries).map(([mqName]) => ({
        name: `@${mqName}`,
        mediaQueryVariable: mqName,
      }))
    : []

  const variablesSnippets: Snippet[] = TOKEN_GROUPS.flatMap((tokenGroup) => {
    return Object.entries(TOKEN_GROUPS_DETAILS[tokenGroup].properties).flatMap(
      ([prefix, property]) => {
        const groupVariables = config[tokenGroup]
        return groupVariables
          ? Object.entries(groupVariables)
              .map(
                ([varName, varValue]): Snippet => {
                  const snippetText = getSnippetText(prefix, varName)
                  return {
                    name: snippetText,
                    property,
                    variable: getVariableName(tokenGroup, varName),
                    description: [
                      getDefaultVariableValue(varValue),
                      getVariableDescription(varValue),
                    ]
                      .filter(Boolean)
                      .join(' - '),
                  }
                }
              )
              .concat({
                name: getSnippetText(prefix, DEFAULT_WILDCARD_SUFFIX),
                property,
                variable: null,
              })
          : []
      }
    )
  })

  return [...mediaQuerySnippets, ...variablesSnippets]
}

const getSnippetText = (prefix: string, suffix: string): string =>
  [prefix, suffix].join('-')

export const getVariableName = (tokenGroup: TokenGroup, variableName: string) =>
  `${TOKEN_GROUPS_DETAILS[tokenGroup].variablePrefix}-${variableName}`

export const styleFormatters: Record<'CSS', VariablesFormatter> = {
  CSS: variablesFormatterCSS,
}

export const snippetsFormatters: Record<SnippetsTarget, SnippetsFormatter> = {
  JetBrains: snippetsFormatterJetBrains,
  VSCode: snippetsFormatterVSCode,
}

export const isNotNil = <T>(v: T): v is Exclude<T, null | undefined> =>
  v !== null && v !== undefined

export const getDefaultVariableValue = (
  configVariable: ConfigVariable
): string => {
  const variableValue = getVariableValue(configVariable)
  return typeof variableValue === 'string'
    ? variableValue
    : Object.values(variableValue)[0]
}

export const getVariableValue = (
  configVariable: ConfigVariable
): VariableValue =>
  Array.isArray(configVariable) ? configVariable[0] : configVariable

export const getVariableDescription = (
  configVariable: ConfigVariable
): string | undefined =>
  Array.isArray(configVariable) ? configVariable[1] : undefined
