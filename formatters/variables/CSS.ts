import {
  MediaQuery,
  Variable,
  VariablesFormatter,
  VariablesGroup,
} from '../../types'

export const variablesFormatterCSS: VariablesFormatter = (
  variablesGroups,
  mediaQueries
) => {
  const mediaQueriesText = formatMediaQueries(mediaQueries)
  const groupsText = variablesGroups.map(formatGroup).join('\n\n')

  return [mediaQueriesText, formatRoot(groupsText)].filter(Boolean).join('\n\n')
}

const formatRoot = (children: string): string =>
  `
:root {
${children}
}
`.trim()

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
