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

const initProgramInformation = (program) => {
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

const initClearCompletedTasksCommand = (program, todoManager) => {
	program
		.command('clear-completed')
		.description('Clear all completed tasks')
		.action(() => {
			const incompleteTodos = todoManager.todos.filter(
				(todo) => !todo.complete
			)
			todoManager.updateTodos(incompleteTodos)
			printSuccessMessage('Completed tasks cleared successfully')
		})
}

const initChooseDeleteTasksCommand = (program, todoManager) => {
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

				const updatedTodos = todoManager.todos.filter(
					(todo, index) => !tasks.includes(String(index + 1))
				)
				todoManager.updateTodos(updatedTodos)

				printSuccessMessage('Tasks deleted successfully')
			} catch {
				printErrorMessage(
					'Failed to delete tasks. Invalid format. $ todo mark-complete -t 1 2 3'
				)
			}
		})
}

const initMarkCompleteCommand = (program, todoManager) => {
	program
		.command('mark-complete')
		.description(
			'Choose tasks to mark as complete. Expects task IDs separated by space.'
		)
		.option('-t --tasks <tasks...>', 'Tasks to mark as complete')
		.action(({ tasks }) => {
			console.log('tasks: ', tasks)
			try {
				const updatedTodos = todoManager.todos.map((todo, index) => {
					if (tasks.includes(String(index + 1))) {
						todo.complete = true
					}

					return todo
				})

				todoManager.updateTodos(updatedTodos)
				printSuccessMessage(
					'Successfully marked tasks as complete. Expects task IDs separated by space.'
				)
			} catch {
				printErrorMessage(
					'Failed to mark tasks as complete. Invalid format. Expecting format "1 2 3"'
				)
			}
		})
}

const initMarkIncompleteCommand = (program, todoManager) => {
	program
		.command('mark-incomplete')
		.description('Choose tasks to mark as incomplete')
		.option('-t --tasks <tasks...>', 'Tasks to mark as incomplete')
		.action(({ tasks }) => {
			try {
				const updatedTodos = todoManager.todos.map((todo, index) => {
					if (tasks.includes(String(index + 1))) {
						todo.complete = false
					}

					return todo
				})

				todoManager.updateTodos(updatedTodos)
				printSuccessMessage('Successfully marked tasks as incomplete')
			} catch {
				printErrorMessage(
					'Failed to mark tasks as incomplete. Invalid format. Expecting format "1 2 3"'
				)
			}
		})
}

const initCLI = (todoManager) => {
	const program = new commander.Command()

	initProgramInformation(program, todoManager)
	initAddTaskCommand(program, todoManager)
	initClearTasksCommand(program, todoManager)
	initListTasksCommand(program, todoManager)
	initClearCompletedTasksCommand(program, todoManager)
	initChooseDeleteTasksCommand(program, todoManager)
	initMarkCompleteCommand(program, todoManager)
	initMarkIncompleteCommand(program, todoManager)

	return program
}

export { initCLI }
