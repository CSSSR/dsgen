import * as CSS from 'csstype'
import { isNotNil } from './helpers'

export type Attributes = Record<
  string,
  string | number | undefined | null | CSS.Properties
>

export const t = (
  tag: keyof HTMLElementTagNameMap,
  children: string | string[] | undefined | null,
  attrs?: Attributes
) =>
  `<${tag} ${attrs ? formatAttributes(attrs) : ''}>${
    Array.isArray(children) ? children.join('') : children ?? ''
  }</${tag}>`

const formatAttributes = (attrs: Attributes): string =>
  Object.entries(attrs)
    .filter(([attrName, attrValue]) => isNotNil(attrValue))
    .map(([attrName, attrValue]) => {
      return `${attrName}={${JSON.stringify(attrValue)}}`
    })
    .join(' ')
