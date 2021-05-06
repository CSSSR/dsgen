const appRoot = require('app-root-path')
const { getStrictValueRule } = require('./lib/stylelint')
const dsgenConfig = require(appRoot + '/dsgen.config.js')

module.exports = {
  plugins: ['stylelint-declaration-strict-value'],
  rules: {
    'scale-unlimited/declaration-strict-value': getStrictValueRule(dsgenConfig),
  },
}
