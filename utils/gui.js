import { TodoManager } from '../utils/TodoManager.js'
import { printBox, printTitle, printTodoList } from '../utils/print.js'
import { getMenuSelectionPrompt } from '../utils/prompts.js'
import { handleMenuSelection } from '../utils/actions.js'

export const displayGUI = async () => {
	let displayGUI = true
	const todoManager = new TodoManager()

	while (displayGUI) {
		try {
			if (todoManager.todos.length) printTitle(todoManager)
			printTodoList(todoManager.todos)

			const menuSelection = await getMenuSelectionPrompt()

			if (!menuSelection) {
				displayGUI = false
			}

			await handleMenuSelection(menuSelection, todoManager)
		} catch (e) {
			printBox(
				e,
				{
					title: 'Exiting due to an error',
					titleAlignment: 'center',
					borderColor: 'red',
				},
				'error'
			)
			displayGUI = false
		}
	}
}
