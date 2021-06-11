import { IgnoreValueList } from 'stylelint-declaration-strict-value/dist/defaults'

export const TOKEN_GROUPS = [
  'textColors',
  'bgColors',
  'fontSizes',
  'lineHeights',
  'space',
  'shadows',
] as const

export type TokenGroup = typeof TOKEN_GROUPS[number]

export type Config = {
  output?: {
    CSS?: string
    snippets?: {
      [key in SnippetsTarget]?: string
    }
  }
  linting?: {
    severity?: 'warning' | 'error'
    allowedSpaceValues?: IgnoreValueList
  }
  themes?: Record<ThemeName, string>
  mediaQueries?: MediaQueries
} & {
  [key in TokenGroup]?: VariablesMap
}

export type VariablesMap = Record<string, ConfigVariable>
export type ThemeName = string
export type VariableValue = string | Record<ThemeName, string>
export type ConfigVariable = VariableValue | [VariableValue, string]

export type VariablesGroup = {
  description?: string
  variables: Variable[]
}

export type Theme = {
  selector: string
  variablesGroups: VariablesGroup[]
}

export type Variable = {
  name: string
  value: string
  description?: string
}

export type MediaQueries = Record<string, string>

export type VariablesFormatter = (
  themes: Theme[],
  mediaQueries?: MediaQueries
) => string

export type Snippet =
  | {
      name: string
      property: string
      variable: string | null
      description?: string
    }
  | {
      name: string
      mediaQueryVariable: string
    }

export type SnippetsFormatter = (name: string, snippets: Snippet[]) => string

export type SnippetsTarget = 'JetBrains' | 'VSCode'
