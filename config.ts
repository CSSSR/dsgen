import { Config } from './generator/types'

export const config: Config = {
  name: 'Design System',
  separator: '-',
  variablesGroups: [
    {
      name: 'color',
      description: 'Text colors',
      withWildcard: true,
      properties: {
        color: 'color',
      },
      variables: {
        primary: '#111',
        secondary: '#999',
        link: 'deepskyblue',
        'link-hover': 'blue',
        success: 'lime',
        warning: 'yellow',
        error: 'red',
      },
    },
    {
      name: 'color-bg',
      description: 'Background colors',
      withWildcard: true,
      properties: {
        bgc: 'background-color',
        fill: 'fill',
        stroke: 'stroke',
      },
      variables: {
        primary: '#fff',
        secondary: '#eee',
        success: 'lime',
        warning: 'yellow',
        error: 'red',
      },
    },
    {
      name: 'font-size',
      description: 'Font sizes',
      properties: {
        fz: 'font-size',
      },
      variables: {
        xs: '8px',
        s: '12px',
        m: '16px',
        l: '24px',
        xl: '32px',
      },
    },
    {
      name: 'line-height',
      description: 'Line heights',
      properties: {
        lh: 'line-height',
      },
      variables: {
        narrow: '1.1',
        normal: '1.3',
        wide: '1.5',
      },
    },
    {
      name: 'spacing',
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
        t: 'top',
        r: 'right',
        b: 'bottom',
        l: 'left',
        gap: 'grid-gap',
      },
      variables: {
        xs: '4px',
        s: '8px',
        m: '12px',
        l: '16px',
        xl: '24px',
      },
    },
  ],
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
    {
      name: 'desktop',
      snippet: '@desk',
      value: '(min-width: 1025px)',
    },
  ],
}
