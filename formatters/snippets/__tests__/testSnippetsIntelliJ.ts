export const testSnippetsIntelliJ = `
<templateSet group="MyConfig">
  <template name="@mob" value="@media (--mobile) {&#10;$END$&#10;}" description="" toReformat="true" toShortenFQNames="true">
    <context>
      <option name="CSS" value="true" />
      <option name="CSS_DECLARATION_BLOCK" value="false" />
      <option name="CSS_PROPERTY_VALUE" value="false" />
    </context>
  </template>
  <template name="@tab" value="@media (--tablet) {&#10;$END$&#10;}" description="" toReformat="true" toShortenFQNames="true">
    <context>
      <option name="CSS" value="true" />
      <option name="CSS_DECLARATION_BLOCK" value="false" />
      <option name="CSS_PROPERTY_VALUE" value="false" />
    </context>
  </template>
  <template name="colpr" value="color: var(--color-primary);" description="#111" toReformat="true" toShortenFQNames="true">
    <context>
      <option name="CSS_DECLARATION_BLOCK" value="true" />
    </context>
  </template>
  <template name="colsec" value="color: var(--color-secondary);" description="#222" toReformat="true" toShortenFQNames="true">
    <context>
      <option name="CSS_DECLARATION_BLOCK" value="true" />
    </context>
  </template>
  <template name="colv" value="color: var(--$END$);" description="" toReformat="true" toShortenFQNames="true">
    <context>
      <option name="CSS_DECLARATION_BLOCK" value="true" />
    </context>
  </template>
</templateSet>
`.trim()
