import { snippetsFormatterIntelliJ } from './formatters/snippets/IntelliJ'
import { snippetsFormatterVSCode } from './formatters/snippets/VSCode'
import { variablesFormatterCSS } from './formatters/variables/CSS'
import {
  Config,
  Snippet,
  SnippetsFormatter,
  SnippetsTarget,
  Theme,
  Variable,
  VariablesFormatter,
  VariablesGroup,
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
  config.variablesGroups
    .map<VariablesGroup | undefined>((group) => {
      const themeVariables = getThemeVariables(group, themeName, themeIdx)

      if (themeVariables.length) {
        return {
          description: group.description,
          variables: themeVariables,
        }
      }
    })
    .filter(isNotNil)

const getThemeVariables = (
  group: Config['variablesGroups'][number],
  themeName: string,
  themeIdx: number
): Variable[] =>
  Object.entries(group.variables)
    .map<Variable | null>(([varName, varValue]) => {
      const name = getVariableName(varName, group.name)

      if (typeof varValue === 'string') {
        return themeIdx === 0 ? { name, value: varValue } : null
      } else {
        return varValue[themeName] ? { name, value: varValue[themeName] } : null
      }
    })
    .filter(isNotNil)

export const getSnippetsList = (config: Config): Snippet[] => {
  const mediaQuerySnippets: Snippet[] =
    config.mediaQueries?.map((mediaQuery) => ({
      name: mediaQuery.snippet,
      mediaQueryVariable: mediaQuery.name,
    })) || []

  const variablesSnippets: Snippet[] = config.variablesGroups.flatMap(
    (group) => {
      return Object.entries(group.properties).flatMap(([prefix, property]) =>
        Object.entries(group.variables)
          .map(
            ([varName, varValue]): Snippet => {
              const snippetText = getSnippetText(prefix, varName)
              return {
                name: snippetText,
                property,
                variable: getVariableName(varName, group.name),
                description:
                  typeof varValue === 'string'
                    ? varValue
                    : Object.values(varValue)[0],
              }
            }
          )
          .concat(
            group.withWildcard
              ? {
                  name: getSnippetText(prefix, DEFAULT_WILDCARD_SUFFIX),
                  property,
                  variable: null,
                }
              : []
          )
      )
    }
  )

  return [...mediaQuerySnippets, ...variablesSnippets]
}

const getSnippetText = (prefix: string, suffix: string): string =>
  [prefix, suffix].join('-')

export const getVariableName = (variableName: string, group: string) =>
  `${group}-${variableName}`

export const styleFormatters: Record<'CSS', VariablesFormatter> = {
  CSS: variablesFormatterCSS,
}

export const snippetsFormatters: Record<SnippetsTarget, SnippetsFormatter> = {
  IntelliJ: snippetsFormatterIntelliJ,
  VSCode: snippetsFormatterVSCode,
}

export const isNotNil = <T>(v: T): v is Exclude<T, null | undefined> =>
  v !== null && v !== undefined
