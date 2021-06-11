const variables = `
:root {
  /* Text colors */
  --color-text-primary: #111; /* Primary color */
  --color-text-secondary: #222;

  /* Font sizes */
  --font-size-s: 12px;
  --font-size-m: 16px;
  --font-size-l: 24px;

  --line-height-narrow: 1.1;
  --line-height-normal: 1.3;
  --line-height-wide: 1.5;
}

html.theme_dark {
  /* Text colors */
  --color-text-primary: #eee;
  --color-text-secondary: #ddd;
}
`.trimStart()

export const testOnlyVariablesCSS = `
/* This file is auto-generated by \`dsgen\`, don't change it manually */

${variables}`.trimStart()

export const testVariablesAndMediaQueriesCSS = `
/* This file is auto-generated by \`dsgen\`, don't change it manually */

@custom-media --mobile (max-width: 640px);
@custom-media --tablet (max-width: 1024px);
@custom-media --desktop (min-width: 1025px);

${variables}`.trimStart()
