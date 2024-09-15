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
