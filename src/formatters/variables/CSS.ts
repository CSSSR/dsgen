import {
  MediaQuery,
  Variable,
  VariablesFormatter,
  VariablesGroup,
} from '../../types'

export const variablesFormatterCSS: VariablesFormatter = (
  themes,
  mediaQueries
) => {
  const mediaQueriesText = formatMediaQueries(mediaQueries)
  const themesText = themes
    .map((theme) => formatTheme(theme.selector, theme.variablesGroups))
    .join('\n')

  return [mediaQueriesText, themesText].filter(Boolean).join('\n\n')
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

const formatVariable = ({ name, value }: Variable): string =>
  `--${name}: ${value};`

const formatMediaQueries = (mediaQueries: MediaQuery[]): string => {
  return mediaQueries
    .map(({ name, value }) => `@custom-media --${name} ${value};`)
    .join('\n')
}
