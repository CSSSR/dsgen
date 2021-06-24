import { PropertiesHyphen } from 'csstype'
import { TokenGroup } from './types'

type TokenGroupProperties = Record<string, keyof PropertiesHyphen>

const textColorProperties: TokenGroupProperties = { color: 'color' }
const bgColorProperties: TokenGroupProperties = {
  bgc: 'background-color',
  'border-color': 'border-color',
  fill: 'fill',
  stroke: 'stroke',
}

export const TOKEN_GROUPS_DETAILS: Record<
  TokenGroup,
  {
    variablePrefix: string
    description: string
    properties: TokenGroupProperties
  }
> = {
  colors: {
    variablePrefix: 'color',
    description: 'Common colors for texts and backgrounds',
    properties: {
      ...textColorProperties,
      ...bgColorProperties,
    },
  },
  textColors: {
    variablePrefix: 'color-text',
    description: 'Text colors',
    properties: textColorProperties,
  },
  bgColors: {
    variablePrefix: 'color-bg',
    description: 'Background colors',
    properties: bgColorProperties,
  },
  fontSizes: {
    variablePrefix: 'font-size',
    description: 'Font sizes',
    properties: {
      fz: 'font-size',
    },
  },
  lineHeights: {
    variablePrefix: 'line-height',
    description: 'Line heights',
    properties: {
      lh: 'line-height',
    },
  },
  space: {
    variablePrefix: 'space',
    description: 'Spacing',
    properties: {
      p: 'padding',
      pt: 'padding-top',
      pr: 'padding-right',
      pb: 'padding-bottom',
      pl: 'padding-left',
      m: 'margin',
      mt: 'margin-top',
      mr: 'margin-right',
      mb: 'margin-bottom',
      ml: 'margin-left',
      top: 'top',
      right: 'right',
      bottom: 'bottom',
      left: 'left',
      gap: 'grid-gap',
    },
  },
  shadows: {
    variablePrefix: 'shadow',
    description: 'Shadows',
    properties: {
      bs: 'box-shadow',
      ts: 'text-shadow',
    },
  },
}
