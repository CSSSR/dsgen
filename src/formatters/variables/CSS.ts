import { isNotNil } from '../../helpers'
import {
  MediaQueries,
  Variable,
  VariablesFormatter,
  VariablesGroup,
} from '../../types'

const WARNING =
  "/* This file is auto-generated by `dsgen`, don't change it manually */"

export const variablesFormatterCSS: VariablesFormatter = (
  themes,
  mediaQueries
) => {
  const mediaQueriesText = formatMediaQueries(mediaQueries ?? {})
  const themesText = themes
    .map((theme) => formatTheme(theme.selector, theme.variablesGroups))
    .join('\n')

  return [WARNING, mediaQueriesText, themesText].filter(Boolean).join('\n\n')
}

const formatTheme = (selector: string, groups: VariablesGroup[]): string =>
  `
${selector} {
${groups.map(formatGroup).join('\n\n')}
}
`.trimStart()

const formatGroup = (group: VariablesGroup): string =>
  (group.description ? [`/* ${group.description} */`] : [])
    .concat(group.variables.map(formatVariable))
    .map((str) => `  ${str}`)
    .join('\n')

const formatVariable = ({ name, value, description }: Variable): string =>
  [`--${name}: ${value};`, description ? `/* ${description} */` : null]
    .filter(isNotNil)
    .join(' ')

const formatMediaQueries = (mediaQueries: MediaQueries): string => {
  return Object.entries(mediaQueries)
    .map(([name, value]) => `@custom-media --${name} ${value};`)
    .join('\n')
}
