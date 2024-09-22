/* external imports */
import * as commander from 'commander'

/* internal imports */
import { confirmPrompt } from './promptUtils.js'
import {
	printErrorMessage,
	printSuccessMessage,
	printTitle,
	printTodoList,
} from './printUtils.js'

const programInformation = {
	name: 'todo-cli',
	description: 'A command line tool to manage a simple todo list.',
	version: '1.0.0',
}

const initProgramInformation = (program, todoManager) => {
	program
		.name(programInformation.name)
		.description(programInformation.description)
		.version(
			programInformation.version,
			'-v, --version',
			'output the current version'
		)
}

const initAddTaskCommand = (program, todoManager) => {
	program
		.command('add')
		.description('Add a new task')
		.argument('<string>', 'New task')
		.action((newTodo) => {
			if (newTodo && typeof newTodo === 'string') {
				todoManager.addTodo(newTodo)
				printSuccessMessage(`"${newTodo}" added successfully`)
			} else {
				printErrorMessage('Invalid task. String expected')
			}
		})
}

const initClearTasksCommand = (program, todoManager) => {
	program
		.command('clear')
		.description('Clear all tasks')
		.action(async () => {
			const confirmed = await confirmPrompt(
				'Are you sure you want to clear all tasks?'
			)

			if (confirmed) {
				todoManager.deleteTodos()
				printSuccessMessage('Tasks cleared successfully')
			} else {
				printErrorMessage('Aborted clearing tasks')
			}
		})
}

const initListTasksCommand = (program, todoManager) => {
	program
		.command('list')
		.description('List tasks')
		.action(() => {
			if (todoManager.todos.length !== 0) printTitle(todoManager.todos)
			printTodoList(todoManager.todos)
		})
}

const initCLI = (todoManager) => {
	const program = new commander.Command()

	initProgramInformation(program, todoManager)
	initAddTaskCommand(program, todoManager)
	initClearTasksCommand(program, todoManager)
	initListTasksCommand(program, todoManager)

	return program
}

export { initCLI }
