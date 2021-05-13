import { PropertiesHyphen } from 'csstype'
import { Node } from 'postcss'
import Declaration from 'postcss/lib/declaration'
import type {
  AutoFixFunc,
  IgnoreValueList,
  SecondaryOptions,
} from 'stylelint-declaration-strict-value/dist/defaults'

import { getVariableName } from '../helpers'
import { Config } from '../types'

export const commonIgnoredValues: IgnoreValueList = [
  'initial',
  'inherit',
  'unset',
  'revert',
  'currentColor',
  'transparent',
  'none',
  'auto',
  0,
  '/(%|vw|vh|vmin|vmax)$/',
]

export const getStrictValueRule = (
  config: Config
): [string[], SecondaryOptions] => {
  const propertiesList = config.variablesGroups.flatMap((group) =>
    Object.values(group.properties)
  )
  const propertiesWithIgnoredValues = config.variablesGroups.reduce<
    Record<string, IgnoreValueList>
  >((acc, { properties, allowedValues }) => {
    if (allowedValues) {
      Object.values(properties).forEach((property) => {
        acc[property] = [...commonIgnoredValues, ...allowedValues]
      })
    }
    return acc
  }, {})

  return [
    propertiesList,
    {
      ignoreValues: {
        '': commonIgnoredValues,
        ...propertiesWithIgnoredValues,
      },
      expandShorthand: true,
      autoFixFunc: getAutoFixFunc(config),
      severity: config?.linting?.severity ?? 'error',
    },
  ]
}

const getAutoFixFunc = (config: Config): AutoFixFunc => (node) => {
  if (isDeclaration(node)) {
    const { value, prop } = node

    const configGroup = config.variablesGroups.find((group) =>
      Object.values(group.properties).includes(prop as keyof PropertiesHyphen)
    )

    if (configGroup) {
      const variables = Object.keys(configGroup.variables).filter(
        (key) => configGroup.variables[key] === value
      )

      if (variables.length === 1) {
        return `var(--${getVariableName(variables[0], configGroup.name)})`
      }
    }

    return value
  }

  return ''
}

const isDeclaration = (node: Node): node is Declaration => node.type === 'decl'
