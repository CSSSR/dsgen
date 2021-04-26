export const testSnippetsVSCode = JSON.stringify(
  {
    '@mob': {
      scope: 'css,postcss',
      prefix: '@mob',
      body: ['@media (--mobile) {', '\t$0', '}'],
    },
    '@tab': {
      scope: 'css,postcss',
      prefix: '@tab',
      body: ['@media (--tablet) {', '\t$0', '}'],
    },
    colpr: {
      scope: 'css,postcss',
      prefix: 'colpr',
      body: 'color: var(--color-primary);',
    },
    colsec: {
      scope: 'css,postcss',
      prefix: 'colsec',
      body: 'color: var(--color-secondary);',
    },
    colv: {
      scope: 'css,postcss',
      prefix: 'colv',
      body: 'color: var(--$0);',
    },
  },
  null,
  2
)
