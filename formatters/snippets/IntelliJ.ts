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

const formatSnippet = (snippet: Snippet): string => {
  const value =
    'mediaQueryVariable' in snippet
      ? `@media (--${snippet.mediaQueryVariable}) {&#10;$END$&#10;}`
      : `${snippet.property}: var(--${snippet.variable || '$END$'});`

  const contextStrings =
    'mediaQueryVariable' in snippet
      ? [
          '<option name="CSS" value="true" />',
          '<option name="CSS_DECLARATION_BLOCK" value="false" />',
          '<option name="CSS_PROPERTY_VALUE" value="false" />',
        ]
      : ['<option name="CSS_DECLARATION_BLOCK" value="true" />']

  return [
    `<template name="${snippet.name}" value="${value}" description="" toReformat="true" toShortenFQNames="true">`,
    '  <context>',
    ...contextStrings.map((str) => `    ${str}`),
    '  </context>',
    '</template>',
  ]
    .map((str) => `  ${str}`)
    .join('\n')
}
