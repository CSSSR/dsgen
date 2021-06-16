import { Config } from '../../../types'
import { formatStorybookMDX } from '../'
import {
  storybookMDXMultipleThemes,
  storybookMDXSingleTheme,
} from './testVariables'

describe('formatStorybookMDX', () => {
  it('formats config with single theme', () => {
    const config: Config = {
      textColors: {
        primary: '#333',
        secondary: '#444',
      },
      bgColors: {
        primary: ['#111', 'Primary color'],
        secondary: '#222',
      },
    }

    expect(formatStorybookMDX(config)).toBe(storybookMDXSingleTheme)
  })

  it('formats config with multiple themes', () => {
    const config: Config = {
      themes: {
        light: ':root',
        dark: 'html.theme_dark',
      },
      textColors: {
        primary: [
          {
            light: '#110',
            dark: '#111',
          },
          'Primary color',
        ],
        secondary: '#222',
      },
      bgColors: {
        default: ['#fff', 'Default background'],
      },
    }

    expect(formatStorybookMDX(config)).toBe(storybookMDXMultipleThemes)
  })
})
