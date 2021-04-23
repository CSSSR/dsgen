import { Variable, VariablesFormatter, VariablesGroup } from '../../types'

export const variablesFormatterCSS: VariablesFormatter = (variablesGroups) => {
  const groupsText = variablesGroups.map(formatGroup).join('\n\n')

  return formatRoot(groupsText)
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
