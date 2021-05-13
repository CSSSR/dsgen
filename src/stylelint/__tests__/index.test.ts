import Declaration from 'postcss/lib/declaration'
import { commonIgnoredValues, getAutoFixFunc, getStrictValueRule } from '../'
import { Config } from '../../types'

describe('getStrictValueRule', () => {
  it('returns list of rules', () => {
    const config: Config = {
      textColors: {},
      bgColors: {},
      space: {},
      linting: {
        severity: 'warning',
        allowedSpaceValues: ['-1px', '1px'],
      },
    }

    const result = getStrictValueRule(config)
    const expected: typeof result = [
      [
        'color',
        'background-color',
        'border-color',
        'fill',
        'stroke',
        'padding',
        'padding-top',
        'padding-right',
        'padding-bottom',
        'padding-left',
        'margin',
        'margin-top',
        'margin-right',
        'margin-bottom',
        'margin-left',
        'top',
        'right',
        'bottom',
        'left',
        'grid-gap',
      ],
      {
        ignoreValues: expect.objectContaining({
          '': commonIgnoredValues,
          padding: [...commonIgnoredValues, '-1px', '1px'],
          'padding-top': [...commonIgnoredValues, '-1px', '1px'],
          'margin-bottom': [...commonIgnoredValues, '-1px', '1px'],
          right: [...commonIgnoredValues, '-1px', '1px'],
          'grid-gap': [...commonIgnoredValues, '-1px', '1px'],
        }),
        expandShorthand: true,
        autoFixFunc: expect.any(Function),
        severity: 'warning',
      },
    ]

    expect(result).toEqual(expected)
  })
})

describe('getAutoFixFunc', () => {
  it('fixes color if it is present in config', () => {
    const autoFixFunc = getAutoFixFunc({
      textColors: {
        primary: '#111',
      },
    })
    const colorDecl = {
      type: 'decl',
      prop: 'color',
      value: '#111',
    } as Declaration
    const result = autoFixFunc(colorDecl, {} as any, {} as any, {})
    expect(result).toBe('var(--color-primary)')
  })

  it('fixes color if it is present in config with first theme', () => {
    const autoFixFunc = getAutoFixFunc({
      textColors: {
        secondary: {
          default: '#222',
          dark: '#333',
        },
      },
    })
    const colorDecl = {
      type: 'decl',
      prop: 'color',
      value: '#222',
    } as Declaration
    const result = autoFixFunc(colorDecl, {} as any, {} as any, {})
    expect(result).toBe('var(--color-secondary)')
  })

  it("doesn't fix color if it is present in config but not in the first theme", () => {
    const autoFixFunc = getAutoFixFunc({
      textColors: {
        secondary: {
          default: '#222',
          dark: '#333',
        },
      },
    })
    const colorDecl = {
      type: 'decl',
      prop: 'color',
      value: '#333',
    } as Declaration
    const result = autoFixFunc(colorDecl, {} as any, {} as any, {})
    expect(result).toBe('#333')
  })

  it("doesn't fix color if it is in unsupported property", () => {
    const autoFixFunc = getAutoFixFunc({
      textColors: {
        primary: '#111',
      },
    })
    const colorDecl = {
      type: 'decl',
      prop: 'border-color',
      value: '#111',
    } as Declaration
    const result = autoFixFunc(colorDecl, {} as any, {} as any, {})
    expect(result).toBe('#111')
  })

  it("doesn't fix color if it is present multiple times in config", () => {
    const autoFixFunc = getAutoFixFunc({
      textColors: {
        duplicate1: '#fff',
        duplicate2: '#fff',
      },
    })
    const colorDecl = {
      type: 'decl',
      prop: 'color',
      value: '#fff',
    } as Declaration
    const result = autoFixFunc(colorDecl, {} as any, {} as any, {})
    expect(result).toBe('#fff')
  })
})
