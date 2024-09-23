#! /usr/bin/env node

import { initCLI } from '../utils/cli.js'
import { TodoManager } from '../utils/TodoManager.js'
import { printBox, printTitle, printTodoList } from '../utils/print.js'
import { getMenuSelectionPrompt } from '../utils/prompts.js'
import { handleMenuSelection } from '../utils/actions.js'

const todoManager = new TodoManager()
const program = initCLI(todoManager)

if (process.argv.length > 2) {
	program.parse()
} else {
	let runApplication = true

	while (runApplication) {
		try {
			if (todoManager.todos.length) printTitle(todoManager.todos)
			printTodoList(todoManager.todos)

			const menuSelection = await getMenuSelectionPrompt()

			if (!menuSelection) {
				runApplication = false
			}

			await handleMenuSelection(menuSelection, todoManager)
		} catch (e) {
			printBox(
				e,
				{
					title: 'Exiting due to an error',
					titleAlignment: 'center',
					borderColor: 'red',
				},
				'error'
			)
			runApplication = false
		}
	}
}
