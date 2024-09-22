#! /usr/bin/env node

/* external imports */
import Conf from 'conf'

/* local imports */
import { initCLI } from './utils/cliUtils.js'
import { TodoManager } from './utils/TodoManager.js'
import { printBox, printTitle, printTodoList } from './utils/printUtils.js'
import { getMenuSelectionPrompt } from './utils/promptUtils.js'
import { handleMenuSelection } from './utils/actionUtils.js'

const store = new Conf({
	projectName: 'todo',
	schema: {
		todos: {
			type: 'string',
			default: '[]',
		},
	},
})
const todoManager = new TodoManager(store)

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
