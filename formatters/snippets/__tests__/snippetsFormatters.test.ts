import { testSnippetsIntelliJ } from './testSnippetsIntelliJ'
import { testSnippetsVSCode } from './testSnippetsVSCode'
import { snippetsFormatterIntelliJ } from '../IntelliJ'
import { snippetsFormatterVSCode } from '../VSCode'
import { Snippet } from '../../../types'

describe('snippetsFormatters', () => {
  const snippets: Snippet[] = [
    {
      name: 'colpr',
      property: 'color',
      variable: 'color-primary',
    },
    {
      name: 'colsec',
      property: 'color',
      variable: 'color-secondary',
    },
    {
      name: 'colv',
      property: 'color',
      variable: null,
    },
  ]

  it('generates snippets for IntelliJ', () => {
    expect(snippetsFormatterIntelliJ('MyConfig', snippets)).toBe(
      testSnippetsIntelliJ
    )
  })

  it('generates snippets for VS Code', () => {
    expect(snippetsFormatterVSCode('MyConfig', snippets)).toBe(
      testSnippetsVSCode
    )
  })
})
