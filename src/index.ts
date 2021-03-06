#!/usr/bin/env node

import * as fs from 'fs'
import * as path from 'path'
import { formatStorybookMDX } from './formatters/storybook'
import {
  getSnippetsList,
  getThemes,
  snippetsFormatters,
  styleFormatters,
} from './helpers'
import { Config, SnippetsTarget } from './types'

const config: Config = require(path.resolve('./dsgen.config.js'))
const projectName = require(path.resolve('./package.json')).name

const main = async () => {
  await writeVariables()
  await writeSnippets('JetBrains')
  await writeSnippets('VSCode')
  await writeStorybookMDX()
}

const writeVariables = async () => {
  const themes = getThemes(config)
  const variablesText = styleFormatters.CSS(themes, config.mediaQueries)

  await fs.writeFile(
    config.output?.CSS || './design-tokens.css',
    variablesText,
    (err) => err && console.error(err)
  )
}

const writeSnippets = async (target: SnippetsTarget) => {
  const snippetsList = getSnippetsList(config)
  const snippetsText = snippetsFormatters[target](projectName, snippetsList)
  const fileDir =
    config.output?.snippets?.[target] || defaultSnippetFolderByTarget[target]
  await fs.mkdir(fileDir, { recursive: true }, (err) => err && console.error)
  const fileName = `${fileDir}/${projectName.replace('/', '.')}.${
    snippetFileExtensionByTarget[target]
  }`
  await fs.writeFile(fileName, snippetsText, (err) => err && console.error(err))
}

const writeStorybookMDX = async () => {
  const mdxContent = formatStorybookMDX(config)
  const { storybookMDX } = config.output || {}
  if (storybookMDX) {
    await fs.writeFile(
      typeof storybookMDX === 'string'
        ? storybookMDX
        : './design-tokens.stories.mdx',
      mdxContent,
      (err) => err && console.error(err)
    )
  }
}

const snippetFileExtensionByTarget: Record<SnippetsTarget, string> = {
  JetBrains: 'xml',
  VSCode: 'code-snippets',
}

const defaultSnippetFolderByTarget: Record<SnippetsTarget, string> = {
  JetBrains: 'snippets/JetBrains',
  VSCode: '.vscode',
}

void main()
