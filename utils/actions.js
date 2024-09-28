import {
	printErrorMessage,
	printSuccessMessage,
	printExitMessage,
} from './print.js'
import {
	confirmPrompt,
	deleteTodosPrompt,
	getNewTodoPrompt,
	updateTodosPrompt,
	getUpdatedSettingsPrompt,
	getSettingsSubMenuSelection,
} from './prompts.js'

const handleMenuSelection = async (selection, storeManager) => {
	switch (selection) {
		case 'add':
			await handleAddTodo(storeManager)
			break
		case 'update':
			await handleUpdateTodos(storeManager)
			break
		case 'delete':
			await handleDeleteTodos(storeManager)
			break
		case 'clear':
			await handleClearTodos(storeManager)
			break
		case 'settings':
			await handleSettingsActions(storeManager)
			break
		default:
			printExitMessage(storeManager)
			break
	}
}

const handleUpdateTodos = async (storeManager) => {
	if (storeManager.todos.length === 0) {
		printErrorMessage('There are no tasks to update')
	} else {
		const selectedTodos = await updateTodosPrompt(storeManager)

		const updatedTodos = storeManager.todos.map((todo) => {
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

		storeManager.updateTodos(updatedTodos)
	}
}

const handleDeleteTodos = async (storeManager) => {
	if (storeManager.todos.length === 0) {
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
		const selectedTodos = await deleteTodosPrompt(storeManager)
		const updatedTodos = storeManager.todos.filter(
			(todo) => !selectedTodos.includes(todo.label)
		)

		storeManager.updateTodos(updatedTodos)
	}
}

const handleClearTodos = async (storeManager) => {
	const confirmed = await confirmPrompt(
		'Are you sure you want to delete all todo items?'
	)

	if (confirmed) {
		storeManager.deleteTodos()
	} else {
		printErrorMessage('Aborted deleting todos')
	}
}

const handleAddTodo = async (storeManager) => {
	const newTodo = await getNewTodoPrompt()

	if (newTodo) {
		storeManager.addTodo(newTodo)
	}
}

const handleUpdateSettings = async (storeManager) => {
	const updatedSettings = await getUpdatedSettingsPrompt(storeManager)
	const confirmUpdateSettings = await confirmPrompt('Update settings?')

	if (confirmUpdateSettings) {
		storeManager.updateSettings(updatedSettings)
	}
}

const handleRestoreDefaultSettings = async (storeManager) => {
	const confirmRestoreDefaultSettings = await confirmPrompt(
		'Are you sure you want to restore default settings?'
	)

	if (confirmRestoreDefaultSettings) {
		storeManager.restoreDefaultSettings()
		printSuccessMessage('Default settings restored successfully')
	} else {
		printErrorMessage('Aborted restoring default settings')
	}
}

const handleSettingsActions = async (storeManager) => {
	const settingsAction = await getSettingsSubMenuSelection()

	switch (settingsAction) {
		case 'update-settings':
			await handleUpdateSettings(storeManager)
			break
		case 'restore-default-settings':
			await handleRestoreDefaultSettings(storeManager)
			break
		default:
			break
	}
}

export { handleMenuSelection, handleAddTodo, handleSettingsActions }
