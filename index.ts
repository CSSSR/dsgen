import { snippetsFormatterIntelliJ } from './formatters/snippets/IntelliJ'
import { snippetsFormatterVSCode } from './formatters/snippets/VSCode'
import { variablesFormatterCSS } from './formatters/variables/CSS'
import {
  Config,
  Snippet,
  SnippetsFormatter,
  SnippetsTarget,
  Variable,
  VariablesFormatter,
  VariablesGroup,
} from './types'

const DEFAULT_SEPARATOR = ''
const DEFAULT_WILDCARD_SUFFIX = 'v'

export const getVariablesGroups = (config: Config): VariablesGroup[] => {
  return config.variablesGroups.map((group) => ({
    description: group.description,
    variables: group.variables.map((configVar) => ({
      name: getVariableName(configVar, group.name),
      value: configVar.value,
    })),
  }))
}

export const getSnippetsList = (config: Config): Snippet[] => {
  return config.variablesGroups.flatMap((group) => {
    return group.properties.flatMap(({ property, prefix, withWildcard }) =>
      group.variables
        .map(
          (variable): Snippet => {
            const snippetText = getSnippetText(
              prefix,
              variable.suffix || variable.name,
              config.separator
            )
            return {
              name: snippetText,
              property,
              variable: getVariableName(variable, group.name),
            }
          }
        )
        .concat(
          withWildcard
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
  })
}

const getSnippetText = (
  prefix: string,
  suffix: string,
  separator: string = DEFAULT_SEPARATOR
): string => [prefix, suffix].join(separator)

const getVariableName = (variable: Variable, group: string) =>
  `${group}-${variable.name}`

const styleFormatters: Record<'CSS', VariablesFormatter> = {
  CSS: variablesFormatterCSS,
}

const snippetsFormatters: Record<SnippetsTarget, SnippetsFormatter> = {
  IntelliJ: snippetsFormatterIntelliJ,
  VSCode: snippetsFormatterVSCode,
}
