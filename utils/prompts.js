import { input, select, checkbox, confirm } from '@inquirer/prompts'

const getMenuSelectionPrompt = async (storeManager) => {
	const hasTodos = storeManager.todos.length ? true : false
	const choices = [
		{
			name: 'Add New',
			value: 'add',
		},
		{
			name: 'Settings',
			value: 'settings',
		},
		{
			name: 'Exit',
			value: '',
		},
	]

	if (hasTodos) {
		const updateChoice = {
			name: 'Mark Complete/Incomplete',
			value: 'update',
		}
		const deleteChoice = {
			name: 'Delete Options',
			value: 'delete',
		}

		choices.splice(1, 0, updateChoice, deleteChoice)
	}

	const selection = await select({
		message: 'What would you like to do?',
		choices,
	})

	return selection
}

const getNewTodoPrompt = async () => {
	return await input({ message: 'Enter new todo: ' })
}

const updateTodosPrompt = async (storeManager) => {
	return await checkbox({
		message: 'Update status of tasks: ',
		choices: storeManager.todos.map((todo) => {
			return {
				name: todo.label,
				value: todo.label,
				checked: todo.complete,
			}
		}),
	})
}

const deleteTodosPrompt = async (storeManager) => {
	return await checkbox({
		message: 'Select tasks to delete: ',
		choices: storeManager.todos.map((todo) => {
			return {
				name: `${todo.label} - ${todo.complete ? 'complete' : 'incomplete'}`,
				value: todo.label,
				checked: false,
			}
		}),
	})
}

const getUpdatedSettingsPrompt = async (storeManager) => {
	const updatedSettings = storeManager.settings
	const updatedHeaderTitle = await input({
		message: 'Enter the application title: ',
	})
	const updatedNoTasksMessage = await input({
		message:
			'Enter the message you would like to see when there are no tasks found: ',
	})
	const showExitMessage = await confirmPrompt(
		'Would you to see a message when exiting the GUI?'
	)
	updatedSettings.disableExitMessage = !showExitMessage

	if (updatedHeaderTitle) {
		updatedSettings.headerTitle = updatedHeaderTitle
	}

	if (updatedNoTasksMessage) {
		updatedSettings.noTasksMessage = updatedNoTasksMessage
	}

	if (showExitMessage) {
		const updatedExitMessage = await input({
			message: 'Enter exit message',
		})

		if (updatedExitMessage) updatedSettings.exitMessage = updatedExitMessage
	}

	return updatedSettings
}

const getSettingsSubMenuSelection = async () => {
	return await select({
		message: 'What would you like to do?',
		choices: [
			{
				name: 'Update Settings',
				value: 'update-settings',
			},
			{
				name: 'Restore Default Settings',
				value: 'restore-default-settings',
			},
			{
				name: 'Cancel',
				value: 'cancel',
			},
		],
	})
}

const getDeleteMenuSelection = async (todos) => {
	const hasCompletedTodos = todos.some((todo) => todo.complete)
	const todoCount = todos.length

	const choices = [
		{
			name: 'Choose Delete',
			value: 'pick-delete',
		},
		{
			name: `Delete All (${todoCount})`,
			value: 'delete-all',
		},
		{
			name: 'Cancel',
			value: 'cancel',
		},
	]

	if (hasCompletedTodos) {
		choices.splice(1, 0, {
			name: 'Delete Completed',
			value: 'delete-completed',
		})
	}

	return await select({
		message: 'What would you like to delete?',
		choices,
	})
}

const confirmPrompt = async (message) => {
	return await confirm({ message })
}

export {
	getMenuSelectionPrompt,
	getNewTodoPrompt,
	updateTodosPrompt,
	deleteTodosPrompt,
	getUpdatedSettingsPrompt,
	getSettingsSubMenuSelection,
	getDeleteMenuSelection,
	confirmPrompt,
}
