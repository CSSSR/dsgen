import { Snippet, SnippetsFormatter } from '../../types'

type VSCodeSnippet = [
  string,
  {
    scope: string
    prefix: string
    body: string
  }
]

export const snippetsFormatterVSCode: SnippetsFormatter = (_name, snippets) => {
  return JSON.stringify(
    Object.fromEntries(snippets.map(formatSnippet)),
    null,
    2
  )
}

const formatSnippet = (snippet: Snippet): VSCodeSnippet => [
  snippet.name,
  {
    scope: 'css,postcss',
    prefix: snippet.name,
    body: `${snippet.property}: var(--${snippet.variable || '$0'});`,
  },
]
