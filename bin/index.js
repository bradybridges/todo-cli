#! /usr/bin/env node

import { initCLI } from '../utils/cli.js'
import { displayTUI } from '../utils/tui.js'

if (process.argv.length > 2) {
	initCLI()
} else {
	displayTUI()
}
