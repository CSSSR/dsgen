import { PropertiesHyphen } from 'csstype'
import { Node } from 'postcss'
import Declaration from 'postcss/lib/declaration'
import type {
  AutoFixFunc,
  IgnoreValueList,
  SecondaryOptions,
} from 'stylelint-declaration-strict-value/dist/defaults'

import { getDefaultVariableValue, getVariableName } from '../helpers'
import { TOKEN_GROUPS_DETAILS } from '../tokenGroups'
import { Config, TOKEN_GROUPS } from '../types'

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
  const propertiesList = TOKEN_GROUPS.flatMap((tokenGroup) =>
    config[tokenGroup]
      ? Object.values(TOKEN_GROUPS_DETAILS[tokenGroup].properties)
      : []
  )

  const allowedSpaceValues = config.linting?.allowedSpaceValues
  const spaceIgnoredValues =
    config.space && allowedSpaceValues
      ? Object.values(TOKEN_GROUPS_DETAILS.space.properties).reduce<
          Record<string, IgnoreValueList>
        >((acc, spaceProperty) => {
          acc[spaceProperty] = [...commonIgnoredValues, ...allowedSpaceValues]
          return acc
        }, {})
      : {}

  return [
    propertiesList,
    {
      ignoreValues: {
        '': commonIgnoredValues,
        ...spaceIgnoredValues,
      },
      expandShorthand: true,
      autoFixFunc: getAutoFixFunc(config),
      severity: config?.linting?.severity ?? 'error',
    },
  ]
}

export const getAutoFixFunc = (config: Config): AutoFixFunc => (node) => {
  if (isDeclaration(node)) {
    const { value, prop } = node

    const propTokenGroup = TOKEN_GROUPS.find((tokenGroup) =>
      Object.values(TOKEN_GROUPS_DETAILS[tokenGroup].properties).includes(
        prop as keyof PropertiesHyphen
      )
    )
    const variablesMap = propTokenGroup && config[propTokenGroup]

    if (propTokenGroup && variablesMap) {
      const variables = Object.entries(variablesMap).filter(
        ([_varName, varValue]) => getDefaultVariableValue(varValue) === value
      )

      if (variables.length === 1) {
        return `var(--${getVariableName(propTokenGroup, variables[0][0])})`
      }
    }

    return value
  }

  return ''
}

const isDeclaration = (node: Node): node is Declaration => node.type === 'decl'
