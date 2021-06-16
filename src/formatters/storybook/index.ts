import * as prettier from 'prettier'
import {
  getVariableDescription,
  getVariableName,
  getVariableValue,
  isNotNil,
} from '../../helpers'
import { TOKEN_GROUPS_DETAILS } from '../../tokenGroups'
import {
  Config,
  ConfigVariable,
  TOKEN_GROUPS,
  TokenGroup,
  VariablesMap,
} from '../../types'
import { STORYBOOK_PRESENTERS } from './presenters'
import { Attributes, t } from '../../templating'

export const formatStorybookMDX = (config: Config): string => {
  const themes = config.themes ? Object.keys(config.themes) : undefined
  const sections = TOKEN_GROUPS.map((tokenGroup) => {
    const groupVariables = config[tokenGroup]
    return groupVariables
      ? formatSection(tokenGroup, groupVariables, themes)
      : null
  })

  const content = [INTRO, ...sections].filter(isNotNil).join('\n\n')
  return prettier.format(content, { parser: 'mdx' })
}

const INTRO = `
import { Meta } from '@storybook/addon-docs/blocks'

<Meta title="Design Tokens" />

# Design Tokens

<br />
`.trim()

const formatSection = (
  tokenGroup: TokenGroup,
  variables: VariablesMap,
  themes?: string[]
): string => {
  const hasThemedVariables = Object.values(variables).some(
    (variable) => typeof getVariableValue(variable) !== 'string'
  )
  return [
    getSectionHeader(tokenGroup),
    formatTable(tokenGroup, variables, hasThemedVariables ? themes : undefined),
  ].join('\n\n')
}

const getSectionHeader = (tokenGroup: TokenGroup): string =>
  `## ${TOKEN_GROUPS_DETAILS[tokenGroup].description}`

const formatTable = (
  tokenGroup: TokenGroup,
  variables: VariablesMap,
  themes?: string[]
): string => {
  return t('table', [
    t(
      'thead',
      t('tr', [
        t('th', 'Variable name'),
        ...(themes ?? ['Value']).map((theme) => t('th', upperFirst(theme))),
        t('th', 'Description'),
      ])
    ),
    t(
      'tbody',
      Object.entries(variables).map(([name, value]) =>
        formatVariable(tokenGroup, name, value, themes)
      )
    ),
  ])
}

const upperFirst = (str: string): string =>
  `${str[0].toUpperCase()}${str.substr(1)}`

// todo добавлять стили только если не process.env.NODE_ENV = test

const formatVariable = (
  tokenGroup: TokenGroup,
  name: string,
  configVar: ConfigVariable,
  themes?: string[]
): string => {
  const value = getVariableValue(configVar)
  const valueCells =
    typeof value === 'string'
      ? [formatValueCell(tokenGroup, value, { colspan: themes?.length })]
      : (themes || []).map((theme) => formatValueCell(tokenGroup, value[theme]))

  return t('tr', [
    t('td', `--${getVariableName(tokenGroup, name)}`),
    ...valueCells,
    t('td', getVariableDescription(configVar)),
  ])
}

const formatValueCell = (
  tokenGroup: TokenGroup,
  value: string,
  attrs?: Attributes
): string => {
  return t('td', formatValueCellContent(tokenGroup, value), attrs)
}

const formatValueCellContent = (
  tokenGroup: TokenGroup,
  value: string
): string => {
  return process.env.NODE_ENV === 'test'
    ? value
    : STORYBOOK_PRESENTERS[tokenGroup](value)
}
