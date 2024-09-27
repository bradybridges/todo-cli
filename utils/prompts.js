import { input, select, checkbox, confirm } from '@inquirer/prompts'

const getMenuSelectionPrompt = async () => {
	const selection = await select({
		message: 'What would you like to do?',
		choices: [
			{
				name: 'Add New',
				value: 'add',
			},
			{
				name: 'Choose Update',
				value: 'update',
			},
			{
				name: 'Choose Delete',
				value: 'delete',
			},
			{
				name: 'Clear All',
				value: 'clear',
			},
			{
				name: 'Settings',
				value: 'settings',
			},
			{
				name: 'Exit',
				value: '',
			},
		],
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
	updatedSettings.disableExitMessage = await confirmPrompt(
		'Would you to see a message when exiting the GUI?'
	)

	if (updatedHeaderTitle) {
		updatedSettings.headerTitle = updatedHeaderTitle
	}

	if (updatedNoTasksMessage) {
		updatedSettings.noTasksMessage = updatedNoTasksMessage
	}

	if (updatedSettings.disableExitMessage) {
		const updatedExitMessage = await input({
			message: 'Enter exit message',
		})

		if (updatedExitMessage) updatedSettings.exitMessage = updatedExitMessage
	}

	return updatedSettings
}

const getSettingsSubMenuSelection = async () => {
	const selection = await select({
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
				name: 'Go Back',
				value: 'back',
			},
		],
	})

	return selection
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
	confirmPrompt,
}
