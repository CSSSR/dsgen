import type { PropertiesHyphen } from 'csstype'
import { IgnoreValueList } from 'stylelint-declaration-strict-value/dist/defaults'

export type Config = {
  output?: {
    CSS?: string
    snippets?: {
      [key in SnippetsTarget]?: string
    }
  }
  separator?: string
  themes?: Record<ThemeName, string>
  variablesGroups: Array<{
    name: string
    description?: string
    withWildcard?: true
    properties: Record<PropertySnippet, keyof PropertiesHyphen>
    variables: Record<VariableName, VariableValue>
    allowedValues?: IgnoreValueList
  }>
  mediaQueries?: MediaQuery[]
}

type PropertySnippet = string
type VariableName = string
export type ThemeName = string
type VariableValue = string | Record<ThemeName, string>

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
}

export type MediaQuery = {
  name: string
  snippet: string
  value: string
}

export type VariablesFormatter = (
  themes: Theme[],
  mediaQueries: MediaQuery[]
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

export type SnippetsTarget = 'IntelliJ' | 'VSCode'
