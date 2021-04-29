#!/usr/bin/env node

import * as fs from 'fs'
import * as path from 'path'
import {
  getSnippetsList,
  getVariablesGroups,
  snippetsFormatters,
  styleFormatters,
} from './helpers'
import { Config, SnippetsTarget } from './types'

const config: Config = require(path.resolve('./designsystem.config.js'))

const main = async () => {
  await writeVariables()
  await writeSnippets('IntelliJ')
  await writeSnippets('VSCode')
}

const writeVariables = async () => {
  const variablesGroups = getVariablesGroups(config)
  const variablesText = styleFormatters.CSS(
    variablesGroups,
    config.mediaQueries || []
  )

  await fs.writeFile(
    config.output?.CSS || './design-system.css',
    variablesText,
    (err) => err && console.error(err)
  )
}

const writeSnippets = async (target: SnippetsTarget) => {
  const snippetsList = getSnippetsList(config)
  const snippetsText = snippetsFormatters[target](config.name, snippetsList)
  const fileDir = `./snippets/${target}`
  await fs.mkdir(fileDir, { recursive: true }, (err) => err && console.error)
  const fileName = `${fileDir}/${config.name}.${snippetFileExtensionByTarget[target]}`
  await fs.writeFile(fileName, snippetsText, (err) => err && console.error(err))
}

const snippetFileExtensionByTarget: Record<SnippetsTarget, string> = {
  IntelliJ: 'xml',
  VSCode: 'code-snippets',
}

void main()
