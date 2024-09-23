#! /usr/bin/env node

import { initCLI } from '../utils/cli.js'
import { displayGUI } from '../utils/gui.js'

if (process.argv.length > 2) {
	initCLI()
} else {
	displayGUI()
}
