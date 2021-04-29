const path = require('path')

const designSystemConfig = require(path.resolve('./designsystem.config.js'))

const commonIgnoredValues = ['initial', 'inherit', 'unset', 'revert']

const autoFixFunc = (node) => {
  const { value, prop } = node

  const configGroup = designSystemConfig.variablesGroups.find((group) =>
    Object.values(group.properties).includes(prop)
  )

  if (configGroup) {
    const variable = Object.keys(configGroup.variables).find(
      (key) => configGroup.variables[key] === value
    )

    if (variable) {
      return `var(--${configGroup.name}${designSystemConfig.separator}${variable})`
    }
  }
}

module.exports = {
  plugins: ['stylelint-declaration-strict-value'],
  rules: {
    'scale-unlimited/declaration-strict-value': [
      [
        '/(color$|background)/',
        'font-size',
        'line-height',
        '/(^(margin|padding|top|right|bottom|left)|gap$)/',
      ],
      {
        ignoreValues: {
          '/(color$|background)/': [
            ...commonIgnoredValues,
            'currentColor',
            'transparent',
            'none',
          ],
          'font-size': [...commonIgnoredValues],
          'line-height': [...commonIgnoredValues],
          '/(^(margin|padding|top|right|bottom|left)|gap$)/': [
            ...commonIgnoredValues,
            'auto',
            0,
            '1px',
            '-1px',
            '/(%|vw|vh|vmin|vmax)$/',
          ],
        },
        expandShorthand: true,
        autoFixFunc,
      },
    ],
  },
}
