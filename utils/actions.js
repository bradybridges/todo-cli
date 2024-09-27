import { printBox, printErrorMessage, printSuccessMessage } from './print.js'
import {
	confirmPrompt,
	deleteTodosPrompt,
	getNewTodoPrompt,
	updateTodosPrompt,
	getUpdatedSettingsPrompt,
	getSettingsSubMenuSelection,
} from './prompts.js'

const handleMenuSelection = async (selection, todosManager) => {
	switch (selection) {
		case 'add':
			await handleAddTodo(todosManager)
			break
		case 'update':
			await handleUpdateTodos(todosManager)
			break
		case 'delete':
			await handleDeleteTodos(todosManager)
			break
		case 'clear':
			await handleClearTodos(todosManager)
			break
		case 'settings':
			await handleSettingsActions(todosManager)
			break
		default:
			printBox(
				todosManager.settings.exitMessage,
				{
					title: 'Exiting',
					titleAlignment: 'center',
				},
				'success'
			)
	}
}

const handleUpdateTodos = async (todosManager) => {
	if (todosManager.todos.length === 0) {
		printErrorMessage('There are no tasks to update')
	} else {
		const selectedTodos = await updateTodosPrompt(todosManager)

		const updatedTodos = todosManager.todos.map((todo) => {
			let isComplete = todo.complete

			if (!isComplete && selectedTodos.includes(todo.label)) {
				isComplete = true
			} else if (isComplete && !selectedTodos.includes(todo.label)) {
				isComplete = false
			}

			return {
				label: todo.label,
				complete: isComplete,
			}
		})

		todosManager.updateTodos(updatedTodos)
	}
}

const handleDeleteTodos = async (todosManager) => {
	if (todosManager.todos.length === 0) {
		printErrorMessage(
			`Successfully deleted ${(Math.random() * 1000).toFixed()} tasks!`
		)

		await new Promise((resolve) => {
			setTimeout(() => {
				printSuccessMessage(
					'Just kidding, there were no tasks to delete',
					true
				)
				resolve(true)
			}, 1250)
		})
	} else {
		const selectedTodos = await deleteTodosPrompt(todosManager)
		const updatedTodos = todosManager.todos.filter(
			(todo) => !selectedTodos.includes(todo.label)
		)

		todosManager.updateTodos(updatedTodos)
	}
}

const handleClearTodos = async (todosManager) => {
	const confirmed = await confirmPrompt(
		'Are you sure you want to delete all todo items?'
	)

	if (confirmed) {
		todosManager.deleteTodos()
	} else {
		printErrorMessage('Aborted deleting todos')
	}
}

const handleAddTodo = async (todosManager) => {
	const newTodo = await getNewTodoPrompt()

	if (newTodo) {
		todosManager.addTodo(newTodo)
	}
}

const handleUpdateSettings = async (todosManager) => {
	const updatedSettings = await getUpdatedSettingsPrompt(todosManager)
	const confirmUpdateSettings = await confirmPrompt('Update settings?')

	if (confirmUpdateSettings) {
		todosManager.updateSettings(updatedSettings)
	}
}

const handleRestoreDefaultSettings = async (todosManager) => {
	const confirmRestoreDefaultSettings = await confirmPrompt(
		'Are you sure you want to restore default settings?'
	)

	if (confirmRestoreDefaultSettings) {
		todosManager.restoreDefaultSettings()
		printSuccessMessage('Default settings restored successfully')
	} else {
		printErrorMessage('Aborted restoring default settings')
	}
}

const handleSettingsActions = async (todosManager) => {
	const settingsAction = await getSettingsSubMenuSelection()

	switch (settingsAction) {
		case 'update-settings':
			await handleUpdateSettings(todosManager)
			break
		case 'restore-default-settings':
			await handleRestoreDefaultSettings(todosManager)
			break
		default:
			break
	}
}

export { handleMenuSelection, handleAddTodo, handleUpdateSettings }
