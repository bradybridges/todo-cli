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
