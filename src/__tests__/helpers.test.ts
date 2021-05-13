import { getSnippetsList, getThemes } from '../helpers'
import { Config } from '../types'

describe('dsgen', () => {
  describe('color', () => {
    const colorConfig: Config = {
      variablesGroups: [
        {
          name: 'color',
          withWildcard: true,
          properties: {
            col: 'color',
          },
          variables: {
            primary: '#111',
            secondary: '#222',
          },
        },
      ],
    }

    it('generates variables list', () => {
      const result = getThemes(colorConfig)
      const expected: typeof result = [
        {
          selector: ':root',
          variablesGroups: [
            {
              variables: [
                {
                  name: 'color-primary',
                  value: '#111',
                },
                {
                  name: 'color-secondary',
                  value: '#222',
                },
              ],
            },
          ],
        },
      ]
      expect(result).toEqual(expected)
    })

    it('generates snippets list', () => {
      const result = getSnippetsList(colorConfig)
      const expected: typeof result = [
        {
          name: 'col-primary',
          property: 'color',
          variable: 'color-primary',
          description: '#111',
        },
        {
          name: 'col-secondary',
          property: 'color',
          variable: 'color-secondary',
          description: '#222',
        },
        {
          name: 'col-var',
          property: 'color',
          variable: null,
        },
      ]
      expect(result).toEqual(expected)
    })
  })

  describe('spacing', () => {
    const spacingConfig: Config = {
      variablesGroups: [
        {
          name: 'spacing',
          description: 'Spacing',
          properties: {
            p: 'padding',
            pb: 'padding-bottom',
          },
          variables: {
            s: '8px',
            m: '12px',
          },
        },
      ],
    }

    it('generates variables list', () => {
      const result = getThemes(spacingConfig)
      const expected: typeof result = [
        {
          selector: ':root',
          variablesGroups: [
            {
              description: 'Spacing',
              variables: [
                {
                  name: 'spacing-s',
                  value: '8px',
                },
                {
                  name: 'spacing-m',
                  value: '12px',
                },
              ],
            },
          ],
        },
      ]
      expect(result).toEqual(expected)
    })

    it('generates snippets list', () => {
      const result = getSnippetsList(spacingConfig)
      const expected: typeof result = [
        {
          name: 'p-s',
          property: 'padding',
          variable: 'spacing-s',
          description: '8px',
        },
        {
          name: 'p-m',
          property: 'padding',
          variable: 'spacing-m',
          description: '12px',
        },
        {
          name: 'pb-s',
          property: 'padding-bottom',
          variable: 'spacing-s',
          description: '8px',
        },
        {
          name: 'pb-m',
          property: 'padding-bottom',
          variable: 'spacing-m',
          description: '12px',
        },
      ]
      expect(result).toEqual(expected)
    })
  })

  describe('themes', () => {
    const themesConfig: Config = {
      themes: {
        default: ':root',
        dark: 'html.theme_dark',
      },
      variablesGroups: [
        {
          name: 'color',
          withWildcard: true,
          properties: {
            col: 'color',
          },
          variables: {
            primary: {
              default: '#111',
              dark: '#eee',
            },
            secondary: {
              default: '#222',
              dark: '#ddd',
            },
            link: '#888',
          },
        },
      ],
    }

    it('generates variables list', () => {
      const result = getThemes(themesConfig)
      const expected: typeof result = [
        {
          selector: ':root',
          variablesGroups: [
            {
              variables: [
                {
                  name: 'color-primary',
                  value: '#111',
                },
                {
                  name: 'color-secondary',
                  value: '#222',
                },
                {
                  name: 'color-link',
                  value: '#888',
                },
              ],
            },
          ],
        },
        {
          selector: 'html.theme_dark',
          variablesGroups: [
            {
              variables: [
                {
                  name: 'color-primary',
                  value: '#eee',
                },
                {
                  name: 'color-secondary',
                  value: '#ddd',
                },
              ],
            },
          ],
        },
      ]
      expect(result).toEqual(expected)
    })

    it('generates snippets list', () => {
      const result = getSnippetsList(themesConfig)
      const expected: typeof result = [
        {
          name: 'col-primary',
          property: 'color',
          variable: 'color-primary',
          description: '#111',
        },
        {
          name: 'col-secondary',
          property: 'color',
          variable: 'color-secondary',
          description: '#222',
        },
        {
          name: 'col-link',
          property: 'color',
          variable: 'color-link',
          description: '#888',
        },
        {
          name: 'col-var',
          property: 'color',
          variable: null,
        },
      ]
      expect(result).toEqual(expected)
    })
  })

  describe('media queries', () => {
    const mediaQueriesConfig: Config = {
      variablesGroups: [],
      mediaQueries: [
        {
          name: 'mobile',
          snippet: '@mob',
          value: '(max-width: 640px)',
        },
        {
          name: 'tablet',
          snippet: '@tab',
          value: '(max-width: 1024px)',
        },
      ],
    }

    it('generates snippets list', () => {
      const result = getSnippetsList(mediaQueriesConfig)
      const expected: typeof result = [
        {
          name: '@mob',
          mediaQueryVariable: 'mobile',
        },
        {
          name: '@tab',
          mediaQueryVariable: 'tablet',
        },
      ]
      expect(result).toEqual(expected)
    })
  })
})
