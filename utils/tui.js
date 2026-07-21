import { StoreManager } from './StoreManager.js'
import {
	printBox,
	printExitMessage,
	printTitle,
	printTodoList,
} from './print.js'
import { getMenuSelectionPrompt } from './prompts.js'
import { handleMenuSelection } from './actions.js'

export const displayTUI = async () => {
	let displayGUI = true
	const storeManager = new StoreManager()

	while (displayGUI) {
		try {
			if (storeManager.todos.length) printTitle(storeManager)
			printTodoList(storeManager)

			const menuSelection = await getMenuSelectionPrompt(storeManager)

			if (!menuSelection) {
				displayGUI = false
			}

			await handleMenuSelection(menuSelection, storeManager)
		} catch (e) {
			displayGUI = false

			if (e instanceof Error && e.name === 'ExitPromptError') {
				printExitMessage(storeManager)
			} else {
				const settings = storeManager.settings

				printBox(
					settings.exitErrorMessage,
					{
						title: 'Error',
						titleAlignment: 'center',
						borderColor: 'red',
					},
					'error'
				)
			}
		}
	}
}
