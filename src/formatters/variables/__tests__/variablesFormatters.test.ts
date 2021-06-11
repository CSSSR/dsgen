import { MediaQueries, Theme } from '../../../types'
import { variablesFormatterCSS } from '../CSS'
import {
  testOnlyVariablesCSS,
  testVariablesAndMediaQueriesCSS,
} from './testVariablesAndMediaQueriesCSS'

describe('variablesFormatters', () => {
  const themes: Theme[] = [
    {
      selector: ':root',
      variablesGroups: [
        {
          description: 'Text colors',
          variables: [
            {
              name: 'color-text-primary',
              value: '#111',
              description: 'Primary color',
            },
            {
              name: 'color-text-secondary',
              value: '#222',
            },
          ],
        },
        {
          description: 'Font sizes',
          variables: [
            {
              name: 'font-size-s',
              value: '12px',
            },
            {
              name: 'font-size-m',
              value: '16px',
            },
            {
              name: 'font-size-l',
              value: '24px',
            },
          ],
        },
        {
          variables: [
            {
              name: 'line-height-narrow',
              value: '1.1',
            },
            {
              name: 'line-height-normal',
              value: '1.3',
            },
            {
              name: 'line-height-wide',
              value: '1.5',
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
              name: 'color-text-primary',
              value: '#eee',
            },
            {
              name: 'color-text-secondary',
              value: '#ddd',
            },
          ],
        },
      ],
    },
  ]

  const mediaQueries: MediaQueries = {
    mobile: '(max-width: 640px)',
    tablet: '(max-width: 1024px)',
    desktop: '(min-width: 1025px)',
  }

  it('formats CSS variables', () => {
    expect(variablesFormatterCSS(themes, mediaQueries)).toBe(
      testVariablesAndMediaQueriesCSS
    )
  })

  it('formats CSS variables without media queries', () => {
    expect(variablesFormatterCSS(themes)).toBe(testOnlyVariablesCSS)
  })
})
