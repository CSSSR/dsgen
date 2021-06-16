export const storybookMDXSingleTheme = `
import { Meta } from "@storybook/addon-docs/blocks";

<Meta title="Design Tokens" />

# Design Tokens

<br />

## Text colors

<table>
  <thead>
    <tr>
      <th>Variable name</th>
      <th>Value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>--color-text-primary</td>
      <td>#333</td>
      <td></td>
    </tr>
    <tr>
      <td>--color-text-secondary</td>
      <td>#444</td>
      <td></td>
    </tr>
  </tbody>
</table>

## Background colors

<table>
  <thead>
    <tr>
      <th>Variable name</th>
      <th>Value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>--color-bg-primary</td>
      <td>#111</td>
      <td>Primary color</td>
    </tr>
    <tr>
      <td>--color-bg-secondary</td>
      <td>#222</td>
      <td></td>
    </tr>
  </tbody>
</table>
`.trimStart()

export const storybookMDXMultipleThemes = `
import { Meta } from "@storybook/addon-docs/blocks";

<Meta title="Design Tokens" />

# Design Tokens

<br />

## Text colors

<table>
  <thead>
    <tr>
      <th>Variable name</th>
      <th>Light</th>
      <th>Dark</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>--color-text-primary</td>
      <td>#110</td>
      <td>#111</td>
      <td>Primary color</td>
    </tr>
    <tr>
      <td>--color-text-secondary</td>
      <td colspan="2">#222</td>
      <td></td>
    </tr>
  </tbody>
</table>

## Background colors

<table>
  <thead>
    <tr>
      <th>Variable name</th>
      <th>Value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>--color-bg-default</td>
      <td>#fff</td>
      <td>Default background</td>
    </tr>
  </tbody>
</table>
`.trimStart()
