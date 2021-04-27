import { snippetsFormatterIntelliJ } from './formatters/snippets/IntelliJ'
import { snippetsFormatterVSCode } from './formatters/snippets/VSCode'
import { variablesFormatterCSS } from './formatters/variables/CSS'
import {
  Config,
  Snippet,
  SnippetsFormatter,
  SnippetsTarget,
  VariablesFormatter,
  VariablesGroup,
} from './types'

const DEFAULT_SEPARATOR = ''
const DEFAULT_WILDCARD_SUFFIX = 'var'

export const getVariablesGroups = (config: Config): VariablesGroup[] => {
  return config.variablesGroups.map((group) => ({
    description: group.description,
    variables: Object.entries(group.variables).map(([varName, varValue]) => ({
      name: getVariableName(varName, group.name),
      value: varValue,
    })),
  }))
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
                description: varValue,
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
