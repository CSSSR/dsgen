import { VariablesGroup } from '../../../types'
import { variablesFormatterCSS } from '../CSS'
import { testVariablesCSS } from './testVariablesCSS'

describe('variablesFormatters', () => {
  const variablesGroups: VariablesGroup[] = [
    {
      description: 'Text colors',
      variables: [
        {
          name: 'color-text-primary',
          value: '#111',
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
  ]

  it('formats CSS variables', () => {
    expect(variablesFormatterCSS(variablesGroups)).toBe(testVariablesCSS)
  })
})
