import { PropertiesHyphen } from 'csstype'
import { Node } from 'postcss'
import Declaration from 'postcss/lib/declaration'
import { AutoFixFunc } from 'stylelint-declaration-strict-value/dist/defaults'

import { getDefaultVariableValue, getVariableName, isNotNil } from '../helpers'
import { TOKEN_GROUPS_DETAILS } from '../tokenGroups'
import { Config, TOKEN_GROUPS, TokenGroup } from '../types'

export const getAutoFixFunc =
  (config: Config): AutoFixFunc =>
  (node) => {
    if (isDeclaration(node)) {
      const { value, prop } = node

      const applicableVariables = TOKEN_GROUPS.filter((tokenGroup) =>
        doesTokenGroupHaveProperty(tokenGroup, prop)
      ).flatMap((tokenGroup) =>
        getApplicableGroupVariables(config, tokenGroup, value)
      )

      return applicableVariables.length === 1 ? applicableVariables[0] : value
    }

    return ''
  }

const isDeclaration = (node: Node): node is Declaration => node.type === 'decl'

const doesTokenGroupHaveProperty = (
  tokenGroup: TokenGroup,
  property: string
): boolean => {
  return Object.values(TOKEN_GROUPS_DETAILS[tokenGroup].properties).includes(
    property as keyof PropertiesHyphen
  )
}

const getApplicableGroupVariables = (
  config: Config,
  tokenGroup: TokenGroup,
  value: string
): string[] => {
  return Object.entries(config[tokenGroup] ?? {})
    .filter(
      ([_varName, varValue]) => getDefaultVariableValue(varValue) === value
    )
    .map(([varName]) => `var(--${getVariableName(tokenGroup, varName)})`)
}
