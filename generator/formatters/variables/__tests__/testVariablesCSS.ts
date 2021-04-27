export const testOnlyVariablesCSS = `
:root {
  /* Text colors */
  --color-text-primary: #111;
  --color-text-secondary: #222;

  /* Font sizes */
  --font-size-s: 12px;
  --font-size-m: 16px;
  --font-size-l: 24px;

  --line-height-narrow: 1.1;
  --line-height-normal: 1.3;
  --line-height-wide: 1.5;
}
`.trimStart()

export const testVariablesCSS = `
@custom-media --mobile (max-width: 640px);
@custom-media --tablet (max-width: 1024px);
@custom-media --desktop (min-width: 1025px);

${testOnlyVariablesCSS}`.trimStart()
