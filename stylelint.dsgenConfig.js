const appRoot = require('app-root-path')
const { getStrictValueRule } = require('./lib/stylelint')
const designSystemConfig = require(appRoot + '/designsystem.config.js')

module.exports = {
  plugins: ['stylelint-declaration-strict-value'],
  rules: {
    'scale-unlimited/declaration-strict-value': getStrictValueRule(
      designSystemConfig
    ),
  },
}
