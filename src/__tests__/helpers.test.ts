import { getSnippetsList, getThemes } from '../helpers'
import { Config } from '../types'

describe('dsgen', () => {
  describe('color', () => {
    const colorConfig: Config = {
      textColors: {
        primary: '#111',
        secondary: '#222',
      },
    }

    it('generates variables list', () => {
      const result = getThemes(colorConfig)
      const expected: typeof result = [
        {
          selector: ':root',
          variablesGroups: [
            {
              description: 'Text colors',
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
          name: 'color-primary',
          property: 'color',
          variable: 'color-primary',
          description: '#111',
        },
        {
          name: 'color-secondary',
          property: 'color',
          variable: 'color-secondary',
          description: '#222',
        },
        {
          name: 'color-var',
          property: 'color',
          variable: null,
        },
      ]
      expect(result).toEqual(expected)
    })
  })

  describe('spacing', () => {
    const spacingConfig: Config = {
      space: {
        s: '8px',
        m: '12px',
      },
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
                  name: 'space-s',
                  value: '8px',
                },
                {
                  name: 'space-m',
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
      const expected: typeof result = expect.arrayContaining([
        {
          name: 'p-s',
          property: 'padding',
          variable: 'space-s',
          description: '8px',
        },
        {
          name: 'p-m',
          property: 'padding',
          variable: 'space-m',
          description: '12px',
        },
        {
          name: 'p-var',
          property: 'padding',
          variable: null,
        },
        {
          name: 'pb-s',
          property: 'padding-bottom',
          variable: 'space-s',
          description: '8px',
        },
        {
          name: 'pb-m',
          property: 'padding-bottom',
          variable: 'space-m',
          description: '12px',
        },
        {
          name: 'pb-var',
          property: 'padding-bottom',
          variable: null,
        },
      ])
      expect(result).toEqual(expected)
    })
  })

  describe('themes', () => {
    const themesConfig: Config = {
      themes: {
        default: ':root',
        dark: 'html.theme_dark',
      },
      textColors: {
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
    }

    it('generates variables list', () => {
      const result = getThemes(themesConfig)
      const expected: typeof result = [
        {
          selector: ':root',
          variablesGroups: [
            {
              description: 'Text colors',
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
              description: 'Text colors',
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
          name: 'color-primary',
          property: 'color',
          variable: 'color-primary',
          description: '#111',
        },
        {
          name: 'color-secondary',
          property: 'color',
          variable: 'color-secondary',
          description: '#222',
        },
        {
          name: 'color-link',
          property: 'color',
          variable: 'color-link',
          description: '#888',
        },
        {
          name: 'color-var',
          property: 'color',
          variable: null,
        },
      ]
      expect(result).toEqual(expected)
    })
  })

  describe('media queries', () => {
    const mediaQueriesConfig: Config = {
      mediaQueries: {
        mobile: '(max-width: 640px)',
        tablet: '(max-width: 1024px)',
      },
    }

    it('generates snippets list', () => {
      const result = getSnippetsList(mediaQueriesConfig)
      const expected: typeof result = [
        {
          name: '@mobile',
          mediaQueryVariable: 'mobile',
        },
        {
          name: '@tablet',
          mediaQueryVariable: 'tablet',
        },
      ]
      expect(result).toEqual(expected)
    })
  })
})
