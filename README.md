# 🚧 This project is under heavy development 🚧

The goal of this project is to ease creation and usage of a basic CSS design system (design tokens). Our aim is to bring Tailwind's design system benefits to a regular CSS workflow.

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
1. Copy [`dsgen.config.js`](dsgen.config.js) to the root of your project
1. Make changes to your `dsgen.config.js`:
   - Adjust design tokens (colors, fonts, etc.)
   - Adjust media queries list
   - Set CSS file path
1. Run generation script: `npx dsgen`, it will generate:
   - CSS file with CSS variables and custom media variables (see example [design-tokens.css](design-tokens.css) here)
   - Snippets for IDEs (see examples in [snippets](snippets) directory here)
1. Import generated CSS file inside your `index.css`:
   ```css
   @import 'design-tokens.css';
   ```
1. [Add snippets to your IDE](#ide-snippets)
1. [Configure `stylelint`](#configuring-stylelint)

## Configuration file

You can see full example in [`dsgen.config.js`](dsgen.config.js) file in this repo.

Tokens from this config will be converted to [CSS file](#style-variables) and [IDE snippets](#ide-snippets).

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
  textColors: {
    primary: {
      default: '#111',
      dark: '#eee',
    },
  }
  ```

## Style variables

CSS variables generated from config are exported to a separate file. Don't change this file manually as it will be fully rewritten after config update.

See example CSS file in [design-tokens.css](design-tokens.css).

### z-indices

For z-indices we recommend using [`postcss-easy-z`](https://github.com/CSSSR/postcss-easy-z) to manually declare relations between them.

## IDE snippets

IDE snippets are also generated from config file.

Some examples:
```
@mobile         -> @media (--mobile) {}
color-primary   -> color: var(--color-primary);
bgc-secondary   -> background-color: var(--color-bg-secondary);
fz-s            -> font-size: var(--font-size-s);
```

### WebStorm and other JetBrains IDEs

JetBrains IDEs don't support project snippets, so you'll need to add snippets globally. Place snippets file inside `jba_config/templates` in the [IDE configuration directory](https://www.jetbrains.com/help/webstorm/tuning-the-ide.html#config-directory).

E.g. on Mac OS: `~/Library/Application\ Support/JetBrains/WebStorm2021.1/jba_config/templates/`

Then restart IDE, and you'll see snippets group available in Preferences:
![](http://s.csssr.ru/U07B23NE8/2021-04-30-12-34-34-sce35.jpg)

You'll need to manually enable/disable snippets groups if you are working on multiple projects with different design system configs.

To make this process easier please vote for [per-project templates in JetBrains IDEs](https://youtrack.jetbrains.com/issue/IDEA-242159).

### Visual Studio Code

By default, VS Code snippets are placed inside `.vscode` folders. That way snippets will be available only for current project.

You'll need to update `.gitignore` to commit snippets without committing other workspace settings:

```ignore
.vscode/*
!.vscode/*.code-snippets
```

## Linting configuration

We use linting to enforce usage of CSS variables instead of absolute values. To achieve that we use [`stylelint-declaration-strict-value`](https://github.com/AndyOGo/stylelint-declaration-strict-value) plugin for [`stylelint`](https://stylelint.io).

### Configuring stylelint

```js
// stylelint.config.js
module.exports = {
  extends: ['dsgen/stylelint.config'],
}
```

### Auto fixing

Other benefit of using `stylelint-declaration-strict-value` is that it supports [auto fixing](https://github.com/AndyOGo/stylelint-declaration-strict-value). We use `dsgen` config file to determine which absolute values should be replaced with CSS variables.

E.g. with this config:

```js
// dsgen.config.js
module.exports = {
  fontSizes: {
    s: '12px',
    m: '16px',
    l: '24px',
  },
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
