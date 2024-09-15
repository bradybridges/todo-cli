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

const updateTodosPrompt = async (todosManager) => {
	return await checkbox({
		message: 'Update status of tasks: ',
		choices: todosManager.todos.map((todo) => {
			return {
				name: todo.label,
				value: todo.label,
				checked: todo.complete,
			}
		}),
	})
}

const deleteTodosPrompt = async (todosManager) => {
	return await checkbox({
		message: 'Select tasks to delete: ',
		choices: todosManager.todos.map((todo) => {
			return {
				name: `${todo.label} - ${todo.complete ? 'complete' : 'incomplete'}`,
				value: todo.label,
				checked: false,
			}
		}),
	})
}
