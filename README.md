# 🚧 This project is under heavy development 🚧

The goal of this project is to ease creation and usage of a basic CSS design system. Our aim to bring Tailwind's design system benefits to a regular CSS workflow.

As a result you will use a configurable set of CSS variables throughout your styles while your IDE and linter will assist you with snippets and auto fixing.

Main parts of the project:

- [**Style variables**](#style-variables) to hold global values meaningful for the whole project (colors, typography and so on)
- [**IDE snippets**](#ide-snippets) to ease usage of variables for developers
- [**Linting configuration**](#linting-configuration) to enforce usage of variables and fight the habit of using absolute values

All these parts are connected via special [configuration file](#configuration-file) containing rules of your design system.

## Installation

### Prerequisites

- Install and configure PostCSS:
  1. Install [`postcss`](https://github.com/postcss/postcss#usage) and [`postcss-custom-media`](https://github.com/postcss/postcss-custom-media)
  1. Add `postcss-custom-media` to `postcss.config.js`
- Install [`stylelint`](https://stylelint.io/user-guide/get-started)

### Project installation

1. Add this project as dev dependency
1. Copy [`designsystem.config.js`](designsystem.config.js) to the root of your project
1. Make changes to your `designsystem.config.js`:
   - Set name of your project
   - Adjust values and properties list to your project's needs
   - Adjust media queries list
   - Set CSS file path
1. Add generation script to `package.json`: `"dsgen": "dsgen"`
1. Run generation script: `yarn dsgen`, it will generate:
   - CSS file with CSS variables and custom media variables (see example [design-system.css](design-system.css) here)
   - Snippets for IDEs (see examples in [snippets](snippets) directory here)
1. Import generated CSS file inside your `index.css`:
   ```css
   @import 'design-system.css';
   ```
1. Add snippets
1. [Configure `stylelint`](#extending-stylelint-config)

## Configuration file

Here's an example of our configuration file:

```js
// designsystem.config.js
module.exports = {
  separator: '-',
  variablesGroups: [
    {
      name: 'color',
      description: 'Text colors',
      withWildcard: true,
      properties: {
        color: 'color',
      },
      variables: {
        primary: '#111',
        secondary: '#999',
      },
    },
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
  mediaQueries: [
    {
      name: 'mobile',
      snippet: '@mob',
      value: '(max-width: 640px)',
    },
    {
      name: 'tablet',
      snippet: '@tab',
      value: '(max-width: 1024px)',
    },
  ],
}
```

This example contains:

- list of variables for colors
- list of variables for font sizes
- list of media queries

All these variables and media queries will be converted to [CSS file](#style-variables) and [IDE snippets](#ide-snippets).

You can see full example in [`designsystem.config.js`](designsystem.config.js) file in this repo.

### Theming support

To create multiple themes:

* Add `themes` object to config, where key is theme name and value is theme selector. E.g.:
  ```
  themes: {
    default: ':root',
    dark: 'html.theme_dark',
  },
  ```
* Now you can add multiple values for each variable:
  ```
  variables: {
    primary: {
      default: '#111',
      dark: '#eee',
    },
  }
  ```

## Style variables

CSS variables generated from config are exported to a separate file. It is recommended to not change this file manually as it could be rewritten after config update.

E.g. for a config above these variables will be generated:

```css
@custom-media --mobile (max-width: 640px);
@custom-media --tablet (max-width: 1024px);

:root {
  /* Text colors */
  --color-primary: #111;
  --color-secondary: #999;

  /* Font sizes */
  --font-size-s: 12px;
  --font-size-m: 16px;
  --font-size-l: 24px;
}
```

### z-indices

For z-indices we recommend using [`postcss-easy-z`](https://github.com/CSSSR/postcss-easy-z) to manually declare relations between them.

## IDE snippets

IDE snippets are also generated from config file.

E.g. for a config above these snippets will be generated:
```
@mob            -> @media (--mobile) {}
@tab            -> @media (--tablet) {}
color-primary   -> color: var(--color-primary);
color-secondary -> color: var(--color-secondary);
fz-s            -> font-size: var(--font-size-s);
fz-m            -> font-size: var(--font-size-m);
fz-l            -> font-size: var(--font-size-l);
```

### WebStorm and other IntelliJ IDEs

IntelliJ IDEs doesn't support project snippets, so you'll need to add snippets globally. Place snippets file inside `jba_config/templates` in the [IDE configuration directory](https://www.jetbrains.com/help/webstorm/tuning-the-ide.html#config-directory).

E.g. on Mac OS: `~/Library/Application\ Support/JetBrains/WebStorm2021.1/jba_config/templates/`

Then restart IDE, and you'll see snippets group available in Preferences:
![](http://s.csssr.ru/U07B23NE8/2021-04-30-12-34-34-sce35.jpg)

You'll need to manually enable/disable snippets groups if you are working on multiple projects with different design system configs.

To make this process easier please vote for [per-project templates in IntelliJ IDEs](https://youtrack.jetbrains.com/issue/IDEA-242159).

### Visual Studio Code

By default, VS Code snippets are placed inside `.vscode` folders. That way snippets will be available only for current project.

You'll need to update `.gitignore` to commit snippets without committing other workspace settings:

```ignore
.vscode/*
!.vscode/*.code-snippets
```

## Linting configuration

We use linting to enforce usage of CSS variables instead of absolute values. To achieve that we use [`stylelint-declaration-strict-value`](https://github.com/AndyOGo/stylelint-declaration-strict-value) plugin for [`stylelint`](https://stylelint.io).

### Auto fixing

Other benefit of using `stylelint-declaration-strict-value` is that it supports [auto fixing](https://github.com/AndyOGo/stylelint-declaration-strict-value). We use `dsgen` config file to determine which absolute values should be replaced with CSS variables.

E.g. with this config

```js
// dsgen.config.js
module.exports = {
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
  extends: ['design-system-generator/stylelint.dsgenConfig'],
}
```

To customize config just copy [stylelint.dsgenConfig.js](stylelint.dsgenConfig.js) to the root of your project, make changes and extend it in your main Stylelint config file:

```js
// stylelint.config.js
module.exports = {
  extends: ['./stylelint.dsgenConfig'],
}
```
