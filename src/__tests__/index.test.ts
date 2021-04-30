import { getSnippetsList, getVariablesGroups } from '../helpers'
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
      const result = getVariablesGroups(colorConfig)
      const expected: typeof result = [
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
      ]
      expect(result).toEqual(expected)
    })

    it('generates snippets list', () => {
      const result = getSnippetsList(colorConfig)
      const expected: typeof result = [
        {
          name: 'colprimary',
          property: 'color',
          variable: 'color-primary',
          description: '#111',
        },
        {
          name: 'colsecondary',
          property: 'color',
          variable: 'color-secondary',
          description: '#222',
        },
        {
          name: 'colvar',
          property: 'color',
          variable: null,
        },
      ]
      expect(result).toEqual(expected)
    })
  })

  describe('spacing', () => {
    const spacingConfig: Config = {
      separator: '-',
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
      const result = getVariablesGroups(spacingConfig)
      const expected: typeof result = [
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
