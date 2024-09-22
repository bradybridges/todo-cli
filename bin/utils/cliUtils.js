/* external imports */
import * as commander from 'commander'

import {
	printErrorMessage,
	printSuccessMessage,
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

const initCLI = (todoManager) => {
	const program = new commander.Command()

	initProgramInformation(program, todoManager)
	initAddTaskCommand(program, todoManager)
	return program
}

export { initCLI }
