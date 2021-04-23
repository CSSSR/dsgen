import { getSnippetsList, getVariablesGroups } from '../'
import { Config } from '../types'

describe('styleguide generator', () => {
  describe('color', () => {
    const colorConfig: Config = {
      name: 'Colors',
      variablesGroups: [
        {
          name: 'color',
          properties: [
            {
              property: 'color',
              prefix: 'col',
              withWildcard: true,
            },
          ],
          variables: [
            {
              name: 'primary',
              value: '#111',
              suffix: 'pr',
            },
            {
              name: 'secondary',
              value: '#222',
              suffix: 'sec',
            },
          ],
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
      expect(result).toEqual(expected)
    })
  })

  describe('spacing', () => {
    const spacingConfig: Config = {
      name: 'Spacing',
      separator: '-',
      variablesGroups: [
        {
          name: 'spacing',
          description: 'Spacing',
          properties: [
            {
              property: 'padding',
              prefix: 'p',
            },
            {
              property: 'padding-bottom',
              prefix: 'pb',
            },
          ],
          variables: [
            {
              name: 's',
              value: '8px',
            },
            {
              name: 'm',
              value: '12px',
            },
          ],
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
        },
        {
          name: 'p-m',
          property: 'padding',
          variable: 'spacing-m',
        },
        {
          name: 'pb-s',
          property: 'padding-bottom',
          variable: 'spacing-s',
        },
        {
          name: 'pb-m',
          property: 'padding-bottom',
          variable: 'spacing-m',
        },
      ]
      expect(result).toEqual(expected)
    })
  })
})
