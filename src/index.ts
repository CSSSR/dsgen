#!/usr/bin/env node

import * as fs from 'fs'
import * as path from 'path'
import {
  getSnippetsList,
  getThemes,
  snippetsFormatters,
  styleFormatters,
} from './helpers'
import { Config, SnippetsTarget } from './types'

const config: Config = require(path.resolve('./designsystem.config.js'))
const projectName = require(path.resolve('./package.json')).name

const main = async () => {
  await writeVariables()
  await writeSnippets('IntelliJ')
  await writeSnippets('VSCode')
}

const writeVariables = async () => {
  const themes = getThemes(config)
  const variablesText = styleFormatters.CSS(themes, config.mediaQueries || [])

  await fs.writeFile(
    config.output?.CSS || './design-system.css',
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
  const fileName = `${fileDir}/${projectName}.${snippetFileExtensionByTarget[target]}`
  await fs.writeFile(fileName, snippetsText, (err) => err && console.error(err))
}

const snippetFileExtensionByTarget: Record<SnippetsTarget, string> = {
  IntelliJ: 'xml',
  VSCode: 'code-snippets',
}

const defaultSnippetFolderByTarget: Record<SnippetsTarget, string> = {
  IntelliJ: 'snippets/IntelliJ',
  VSCode: '.vscode',
}

void main()
