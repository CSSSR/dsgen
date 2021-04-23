export const testSnippetsIntelliJ = `
<templateSet group="MyConfig">
  <template name="colpr" value="color: var(--color-primary);" description="" toReformat="false" toShortenFQNames="true">
    <context>
      <option name="CSS_DECLARATION_BLOCK" value="true" />
    </context>
  </template>
  <template name="colsec" value="color: var(--color-secondary);" description="" toReformat="false" toShortenFQNames="true">
    <context>
      <option name="CSS_DECLARATION_BLOCK" value="true" />
    </context>
  </template>
  <template name="colv" value="color: var(--$END$);" description="" toReformat="false" toShortenFQNames="true">
    <context>
      <option name="CSS_DECLARATION_BLOCK" value="true" />
    </context>
  </template>
</templateSet>
`.trim()
