The goal of this project is to ease creation and usage of a basic CSS design system.

By design system we mean restricted list of values (colors, typography, spacings, etc.) which are used throughout a project by both designers and developers. This project covers only developers side of a design system.

Main parts of the project:

- [**Style variables**](#style-variables) to hold global values meaningful for the whole project (colors, typography and so on)
- [**IDE snippets**](#ide-snippets) to ease usage of variables for developers
- [**Linting configuration**](#linting-configuration) to enforce usage of variables and fight the habit of using absolute values

## Style variables

## IDE snippets

## Linting configuration

We use linting to enforce usage of CSS variables instead of absolute values. To achieve that we use [`stylelint-declaration-strict-value`](https://github.com/AndyOGo/stylelint-declaration-strict-value) plugin for [`stylelint`](https://stylelint.io).

### Auto fixing

Other benefit of using `stylelint-declaration-strict-value` is that it supports [auto fixing](https://github.com/AndyOGo/stylelint-declaration-strict-value). We use `dsgen` config file to determine which absolute values should be replaced with CSS variables.

E.g. with this config

```js
// dsgen.config.js
module.exports = {
  name: 'Design System',
  variablesGroups: [
    {
      name: 'font-size',
      description: 'Font sizes',
      properties: {
        fz: 'font-size',
      },
      variables: {
        s: '12px',
        m: '16px',
        l: '24px',
      },
    },
  ],
}
```

```css
.component {
  font-size: 16px;
}

/* becomes */
.component {
  font-size: var(--font-size-m);
}
```

### Extending stylelint config

You can either extend our standard config or create your own custom config and extend it.

To use our config as is:
```js
// stylelint.config.js
module.exports = {
  extends: [
    'css-styleguide-generator/stylelint.dsgenConfig',
  ],
}
```

To customize config just copy [stylelint.dsgenConfig.js](stylelint.dsgenConfig.js) to the root of your project, make changes and extend it in your main Stylelint config file:

```js
// stylelint.config.js
module.exports = {
  extends: [
    './stylelint.dsgenConfig',
  ],
}
```
