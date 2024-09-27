/* external imports */
import * as commander from 'commander'

/* internal imports */
import { confirmPrompt } from './prompts.js'
import {
	printErrorMessage,
	printSuccessMessage,
	printTitle,
	printTodoList,
} from './print.js'
import { handleSettingsActions } from './actions.js'
import { StoreManager } from './StoreManager.js'

const programInformation = {
	name: 'todo-cli',
	description: 'A command line tool to manage a simple todo list.',
	version: '1.0.0',
}

const setProgramInformation = (program) => {
	program
		.name(programInformation.name)
		.description(programInformation.description)
		.version(
			programInformation.version,
			'-v, --version',
			'output the current version'
		)
}

const initAddTaskCommand = (program, storeManager) => {
	program
		.command('add')
		.description('Add a new task')
		.argument('<string>', 'New task')
		.action((newTodo) => {
			if (newTodo && typeof newTodo === 'string') {
				storeManager.addTodo(newTodo)
				printSuccessMessage(`"${newTodo}" added successfully`)
			} else {
				printErrorMessage('Invalid task. String expected')
			}
		})
}

const initClearTasksCommand = (program, storeManager) => {
	program
		.command('clear')
		.description('Clear all tasks')
		.action(async () => {
			const confirmed = await confirmPrompt(
				'Are you sure you want to clear all tasks?'
			)

			if (confirmed) {
				storeManager.deleteTodos()
				printSuccessMessage('Tasks cleared successfully')
			} else {
				printErrorMessage('Aborted clearing tasks')
			}
		})
}

const initListTasksCommand = (program, storeManager) => {
	program
		.command('list')
		.description('List tasks')
		.action(() => {
			if (storeManager.todos.length !== 0) printTitle(storeManager)
			printTodoList(storeManager)
		})
}

const initClearCompletedTasksCommand = (program, storeManager) => {
	program
		.command('clear-completed')
		.description('Clear all completed tasks')
		.action(() => {
			const incompleteTodos = storeManager.todos.filter(
				(todo) => !todo.complete
			)
			storeManager.updateTodos(incompleteTodos)
			printSuccessMessage('Completed tasks cleared successfully')
		})
}

const initChooseDeleteTasksCommand = (program, storeManager) => {
	program
		.command('delete')
		.description('Choose tasks to delete')
		.option(
			'-t --tasks <tasks...>',
			'Tasks to delete. Expects task IDs separated by space.'
		)
		.action(({ tasks }) => {
			try {
				if (!tasks) throw new Error()

				const updatedTodos = storeManager.todos.filter(
					(todo, index) => !tasks.includes(String(index + 1))
				)
				storeManager.updateTodos(updatedTodos)

				printSuccessMessage('Tasks deleted successfully')
			} catch {
				printErrorMessage(
					'Failed to delete tasks. Invalid format. $ todo mark-complete -t 1 2 3'
				)
			}
		})
}

const initMarkCompleteCommand = (program, storeManager) => {
	program
		.command('mark-complete')
		.description('Choose tasks to mark as complete')
		.option(
			'-t --tasks <tasks...>',
			'Tasks to mark as complete. Expects task IDs separated by space.'
		)
		.action(({ tasks }) => {
			try {
				if (!tasks) throw new Error()

				const updatedTodos = storeManager.todos.map((todo, index) => {
					if (tasks.includes(String(index + 1))) {
						todo.complete = true
					}

					return todo
				})

				storeManager.updateTodos(updatedTodos)
				printSuccessMessage('Successfully marked tasks as complete')
			} catch {
				printErrorMessage(
					'Failed to mark tasks as complete. Invalid format. $ todo mark-complete -t 1 2 3'
				)
			}
		})
}

const initMarkIncompleteCommand = (program, storeManager) => {
	program
		.command('mark-incomplete')
		.description('Choose tasks to mark as incomplete')
		.option(
			'-t --tasks <tasks...>',
			'Tasks to mark as incomplete. Expects task IDs separated by space.'
		)
		.action(({ tasks }) => {
			try {
				if (!tasks) throw new Error()

				const updatedTodos = storeManager.todos.map((todo, index) => {
					if (tasks.includes(String(index + 1))) {
						todo.complete = false
					}

					return todo
				})

				storeManager.updateTodos(updatedTodos)
				printSuccessMessage('Successfully marked tasks as incomplete')
			} catch {
				printErrorMessage(
					'Failed to mark tasks as incomplete. Ex: $ todo mark-incomplete -t 1 2 3'
				)
			}
		})
}

const initSettingsCommand = (program, storeManager) => {
	program
		.command('settings')
		.description('Update or reset gui settings')
		.action(async () => {
			await handleSettingsActions(storeManager)
		})
}

const initCLI = () => {
	const program = new commander.Command()
	const storeManager = new StoreManager()

	setProgramInformation(program)
	initAddTaskCommand(program, storeManager)
	initClearTasksCommand(program, storeManager)
	initListTasksCommand(program, storeManager)
	initClearCompletedTasksCommand(program, storeManager)
	initChooseDeleteTasksCommand(program, storeManager)
	initMarkCompleteCommand(program, storeManager)
	initMarkIncompleteCommand(program, storeManager)
	initSettingsCommand(program, storeManager)

	program.parse()
}

export { initCLI }
