import { snippetsFormatterIntelliJ } from './formatters/snippets/IntelliJ'
import { snippetsFormatterVSCode } from './formatters/snippets/VSCode'
import { variablesFormatterCSS } from './formatters/variables/CSS'
import {
  Config,
  Snippet,
  SnippetsFormatter,
  SnippetsTarget,
  Theme,
  ThemeName,
  Variable,
  VariablesFormatter,
  VariablesGroup,
} from './types'

const DEFAULT_SEPARATOR = ''
const DEFAULT_WILDCARD_SUFFIX = 'var'

export const getThemes = (config: Config): Theme[] => {
  const themesMap = Object.entries(
    config.themes ?? { default: ':root' }
  ).reduce<Record<ThemeName, Theme>>((acc, [themeName, themeSelector]) => {
    acc[themeName] = {
      selector: themeSelector,
      variablesGroups: [],
    }
    return acc
  }, {})

  config.variablesGroups.forEach((group) => {
    Object.keys(themesMap).forEach((themeName, themeIdx) => {
      const themeVariables = Object.entries(group.variables)
        .map<Variable | null>(([varName, varValue]) => {
          const name = getVariableName(varName, group.name)

          if (typeof varValue === 'string') {
            return themeIdx === 0
              ? {
                  name,
                  value: varValue,
                }
              : null
          } else {
            return varValue[themeName]
              ? {
                  name,
                  value: varValue[themeName],
                }
              : null
          }
        })
        .filter((v): v is Variable => !!v)

      if (themeVariables.length) {
        themesMap[themeName].variablesGroups.push({
          description: group.description,
          variables: themeVariables,
        })
      }
    })
  })

  return Object.values(themesMap)
}

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
              const snippetText = getSnippetText(
                prefix,
                varName,
                config.separator
              )
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
                  name: getSnippetText(
                    prefix,
                    DEFAULT_WILDCARD_SUFFIX,
                    config.separator
                  ),
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

const getSnippetText = (
  prefix: string,
  suffix: string,
  separator: string = DEFAULT_SEPARATOR
): string => [prefix, suffix].join(separator)

const getVariableName = (variableName: string, group: string) =>
  `${group}-${variableName}`

export const styleFormatters: Record<'CSS', VariablesFormatter> = {
  CSS: variablesFormatterCSS,
}

export const snippetsFormatters: Record<SnippetsTarget, SnippetsFormatter> = {
  IntelliJ: snippetsFormatterIntelliJ,
  VSCode: snippetsFormatterVSCode,
}
