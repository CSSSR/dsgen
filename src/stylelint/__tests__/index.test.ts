import { Config } from '../../types'
import { commonIgnoredValues, getStrictValueRule } from '../'

describe('getStrictValueRule', () => {
  it('returns list of rules', () => {
    const config: Config = {
      variablesGroups: [
        {
          name: 'color',
          properties: {
            col: 'color',
          },
          variables: {},
        },
        {
          name: 'color-bg',
          properties: {
            bgc: 'background-color',
            brc: 'border-color',
            fill: 'fill',
            stroke: 'stroke',
          },
          variables: {},
        },
        {
          name: 'font-size',
          properties: {
            fz: 'font-size',
          },
          variables: {},
        },
        {
          name: 'line-height',
          properties: {
            lh: 'line-height',
          },
          variables: {},
        },
        {
          name: 'spacing',
          properties: {
            p: 'padding',
            pt: 'padding-top',
            mb: 'margin-bottom',
            gap: 'grid-gap',
          },
          variables: {},
          allowedValues: ['-1px', '1px'],
        },
      ],
    }

    const result = getStrictValueRule(config)
    const expected: typeof result = [
      [
        'color',
        'background-color',
        'border-color',
        'fill',
        'stroke',
        'font-size',
        'line-height',
        'padding',
        'padding-top',
        'margin-bottom',
        'grid-gap',
      ],
      {
        ignoreValues: {
          '': commonIgnoredValues,
          padding: [...commonIgnoredValues, '-1px', '1px'],
          'padding-top': [...commonIgnoredValues, '-1px', '1px'],
          'margin-bottom': [...commonIgnoredValues, '-1px', '1px'],
          'grid-gap': [...commonIgnoredValues, '-1px', '1px'],
        },
        expandShorthand: true,
        autoFixFunc: expect.any(Function),
      },
    ]

    expect(result).toEqual(expected)
  })
})
