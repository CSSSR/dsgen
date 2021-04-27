import { PropertiesHyphen } from 'csstype'

export type Config = {
  name: string
  separator?: string
  variablesGroups: Array<{
    name: string
    description?: string
    withWildcard?: true
    properties: Record<PropertySnippet, keyof PropertiesHyphen>
    variables: Record<VariableName, VariableValue>
  }>
  mediaQueries?: MediaQuery[]
}

type PropertySnippet = string
type VariableName = string
type VariableValue = string

export type VariablesGroup = {
  description?: string
  variables: Variable[]
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
  variablesGroups: VariablesGroup[],
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
