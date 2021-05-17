import { testSnippetsJetBrains } from './testSnippetsJetBrains'
import { testSnippetsVSCode } from './testSnippetsVSCode'
import { snippetsFormatterJetBrains } from '../JetBrains'
import { snippetsFormatterVSCode } from '../VSCode'
import { Snippet } from '../../../types'

describe('snippetsFormatters', () => {
  const snippets: Snippet[] = [
    {
      name: '@mob',
      mediaQueryVariable: 'mobile',
    },
    {
      name: '@tab',
      mediaQueryVariable: 'tablet',
    },
    {
      name: 'colpr',
      property: 'color',
      variable: 'color-primary',
      description: '#111',
    },
    {
      name: 'colsec',
      property: 'color',
      variable: 'color-secondary',
      description: '#222',
    },
    {
      name: 'colv',
      property: 'color',
      variable: null,
    },
  ]

  it('generates snippets for JetBrains', () => {
    expect(snippetsFormatterJetBrains('MyConfig', snippets)).toBe(
      testSnippetsJetBrains
    )
  })

  it('generates snippets for VS Code', () => {
    expect(snippetsFormatterVSCode('MyConfig', snippets)).toBe(
      testSnippetsVSCode
    )
  })
})
