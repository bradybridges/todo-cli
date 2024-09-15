#! /usr/bin/env node

/* external imports */
import Conf from 'conf'

/* local imports */
import { TodoManager } from './todo-helpers/TodoManager.js'
import { printBox, printTitle, printTodoList } from './display/print.js'
import { getMenuSelectionPrompt } from './display/prompts.js'
import { handleMenuSelection } from './selections/actions.js'

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

let runApplication = true
let menuSelection

while (runApplication) {
	try {
		if (todoManager.todos.length) printTitle(todoManager.todos)
		printTodoList(todoManager.todos)

		menuSelection = await getMenuSelectionPrompt()

		if (!menuSelection) {
			runApplication = false
		}

		await handleMenuSelection(menuSelection, todoManager)
	} catch (e) {
		printBox(e, {
			title: 'Exiting due to an error',
			titleAlignment: 'center',
			borderColor: 'red',
		})
		runApplication = false
	}
}
