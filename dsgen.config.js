module.exports = {
  themes: {
    default: ':root',
    dark: 'html.theme_dark',
  },
  textColors: {
    primary: {
      default: '#111',
      dark: '#eee',
    },
    secondary: '#999',
    link: 'deepskyblue',
    'link-hover': 'blue',
    success: 'lime',
    warning: 'yellow',
    error: 'red',
  },
  bgColors: {
    primary: {
      default: '#fff',
      dark: '#111',
    },
    secondary: '#eee',
    success: 'lime',
    warning: 'yellow',
    error: 'red',
  },
  fontSizes: {
    xs: '8px',
    s: '12px',
    m: '16px',
    l: '24px',
    xl: '32px',
  },
  lineHeights: {
    narrow: '1.1',
    normal: '1.3',
    wide: '1.5',
  },
  space: {
    xs: '4px',
    s: '8px',
    m: '12px',
    l: '16px',
    xl: '24px',
  },
  shadows: {
    modal: '0px 5px 15px rgba(43, 51, 62, 0.5)',
    light: {
      default: '0px 4px 8px rgba(126, 143, 164, 0.15)',
      dark: '0px 5px 15px rgba(43, 51, 62, 0.2)',
    },
  },
  mediaQueries: {
    mobile: '(max-width: 640px)',
    tablet: '(max-width: 1024px)',
    desktop: '(min-width: 1025px)',
  },
}
