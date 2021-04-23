export type Config = {
  name: string
  separator?: string
  variablesGroups: Array<{
    name: string
    description?: string
    properties: Array<{
      property: string
      prefix: string
      withWildcard?: true
    }>
    variables: Array<{
      name: string
      suffix?: string
      value: string
    }>
  }>
}

export type VariablesGroup = {
  description?: string
  variables: Variable[]
}

export type Variable = {
  name: string
  value: string
}

export type VariablesFormatter = (variablesGroups: VariablesGroup[]) => string

export type Snippet = {
  name: string
  property: string
  variable: string | null
}

export type SnippetsFormatter = (name: string, snippets: Snippet[]) => string

export type SnippetsTarget = 'IntelliJ' | 'VSCode'
