import { Snippet, SnippetsFormatter } from '../../types'

export const snippetsFormatterIntelliJ: SnippetsFormatter = (
  name,
  snippets
) => {
  const items = snippets.map(formatSnippet).join('\n')

  return formatRoot(name, items)
}

const formatRoot = (name: string, children: string): string =>
  `
<templateSet group="${name}">
${children}
</templateSet>
`.trim()

const formatSnippet = ({ name, property, variable }: Snippet): string =>
  [
    `<template name="${name}" value="${property}: var(--${
      variable || '$END$'
    });" description="" toReformat="false" toShortenFQNames="true">`,
    '  <context>',
    '    <option name="CSS_DECLARATION_BLOCK" value="true" />',
    '  </context>',
    '</template>',
  ]
    .map((str) => `  ${str}`)
    .join('\n')
