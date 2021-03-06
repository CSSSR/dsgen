import type {
  IgnoreValueList,
  SecondaryOptions,
} from 'stylelint-declaration-strict-value/dist/defaults'
import { TOKEN_GROUPS_DETAILS } from '../tokenGroups'
import { Config, TOKEN_GROUPS } from '../types'
import { getAutoFixFunc } from './autofix'

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
  const uniquePropertiesList = [...new Set(propertiesList)]

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
    uniquePropertiesList,
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
