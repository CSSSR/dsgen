import { snippetsFormatterIntelliJ } from './formatters/snippets/IntelliJ'
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
    .map<Variable | null>(([varName, varValue]) => {
      const name = getVariableName(tokenGroup, varName)

      if (typeof varValue === 'string') {
        return themeIdx === 0 ? { name, value: varValue } : null
      } else {
        return varValue[themeName] ? { name, value: varValue[themeName] } : null
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
                    description: getDefaultVariableValue(varValue),
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
  IntelliJ: snippetsFormatterIntelliJ,
  VSCode: snippetsFormatterVSCode,
}

export const isNotNil = <T>(v: T): v is Exclude<T, null | undefined> =>
  v !== null && v !== undefined

export const getDefaultVariableValue = (variableValue: VariableValue): string =>
  typeof variableValue === 'string'
    ? variableValue
    : Object.values(variableValue)[0]
