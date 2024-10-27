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
	getDeleteMenuSelection,
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
			await handleDeleteActions(storeManager)
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

const handleDeleteActions = async (storeManager) => {
	const todos = storeManager.todos
	const deleteAction = await getDeleteMenuSelection(todos)

	switch (deleteAction) {
		case 'pick-delete':
			await handleDeleteTodos(storeManager)
			break
		case 'delete-completed':
			await handleDeleteCompleted(storeManager)
			break
		case 'delete-all':
			await handleClearTodos(storeManager)
			break
		default:
			break
	}
}

const handleDeleteTodos = async (storeManager) => {
	const selectedTodos = await deleteTodosPrompt(storeManager)
	const updatedTodos = storeManager.todos.filter(
		(todo) => !selectedTodos.includes(todo.label)
	)

	storeManager.updateTodos(updatedTodos)
}

const handleDeleteCompleted = async (storeManager) => {
	const todos = storeManager.todos
	const incompleteTasks = todos.filter((todo) => !todo.complete)
	const confirmedDeleteCompleted = await confirmPrompt(
		'Are you sure you want to delete all completed tasks?'
	)

	if (confirmedDeleteCompleted) {
		storeManager.updateTodos(incompleteTasks)
	}
}

const handleClearTodos = async (storeManager) => {
	const confirmed = await confirmPrompt(
		'Are you sure you want to delete all tasks?'
	)

	if (confirmed) {
		storeManager.deleteTodos()
	} else {
		printErrorMessage('Aborted deleting todos')
	}
}

const handleTruncateText = (text, limit = 130, appendText = '...') => {
	return text.length > limit
		? text.substring(0, limit - appendText.length) + appendText
		: text
}

const handleAddTodo = async (storeManager) => {
	const newTodo = await getNewTodoPrompt()

	if (newTodo) {
		const truncatedTodo = handleTruncateText(newTodo)
		storeManager.addTodo(truncatedTodo)
	}
}

const handleUpdateSettings = async (storeManager) => {
	const updatedSettings = await getUpdatedSettingsPrompt(storeManager)
	const confirmUpdateSettings = await confirmPrompt(
		'Are you sure you want to update settings?'
	)

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
