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

/**
 * @param {string} selection
 * @param {import('./StoreManager.js').StoreManager} storeManager
 */
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

/**
 * @param {import('./types.js').Todo[]} todos
 * @param {number[]} selectedIndices
 */
const applySelectedCompletion = (todos, selectedIndices) =>
	todos.map((todo, index) => ({
		label: todo.label,
		complete: selectedIndices.includes(index),
	}))

/**
 * @param {import('./types.js').Todo[]} todos
 * @param {number[]} selectedIndices
 */
const excludeSelectedIndices = (todos, selectedIndices) =>
	todos.filter((todo, index) => !selectedIndices.includes(index))

/** @param {import('./StoreManager.js').StoreManager} storeManager */
const handleUpdateTodos = async (storeManager) => {
	if (storeManager.todos.length === 0) {
		printErrorMessage('There are no tasks to update')
	} else {
		const selectedIndices = await updateTodosPrompt(storeManager)
		const updatedTodos = applySelectedCompletion(
			storeManager.todos,
			selectedIndices
		)

		storeManager.updateTodos(updatedTodos)
	}
}

/** @param {import('./StoreManager.js').StoreManager} storeManager */
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

/** @param {import('./StoreManager.js').StoreManager} storeManager */
const handleDeleteTodos = async (storeManager) => {
	const selectedIndices = await deleteTodosPrompt(storeManager)
	const updatedTodos = excludeSelectedIndices(
		storeManager.todos,
		selectedIndices
	)

	storeManager.updateTodos(updatedTodos)
}

/** @param {import('./StoreManager.js').StoreManager} storeManager */
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

/** @param {import('./StoreManager.js').StoreManager} storeManager */
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

/**
 * @param {string} text
 * @param {number} [limit]
 * @param {string} [appendText]
 */
const handleTruncateText = (text, limit = 130, appendText = '...') => {
	return text.length > limit
		? text.substring(0, limit - appendText.length) + appendText
		: text
}

/** @param {import('./StoreManager.js').StoreManager} storeManager */
const handleAddTodo = async (storeManager) => {
	const newTodo = await getNewTodoPrompt()

	if (newTodo) {
		const truncatedTodo = handleTruncateText(newTodo)
		storeManager.addTodo(truncatedTodo)
	}
}

/** @param {import('./StoreManager.js').StoreManager} storeManager */
const handleUpdateSettings = async (storeManager) => {
	const updatedSettings = await getUpdatedSettingsPrompt(storeManager)
	const confirmUpdateSettings = await confirmPrompt(
		'Are you sure you want to update settings?'
	)

	if (confirmUpdateSettings) {
		storeManager.updateSettings(updatedSettings)
	}
}

/** @param {import('./StoreManager.js').StoreManager} storeManager */
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

/** @param {import('./StoreManager.js').StoreManager} storeManager */
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

export {
	handleMenuSelection,
	handleAddTodo,
	handleSettingsActions,
	applySelectedCompletion,
	excludeSelectedIndices,
	handleTruncateText,
}
