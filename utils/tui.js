import { StoreManager } from './StoreManager.js'
import { printBox, printTitle, printTodoList } from './print.js'
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
			const settings = storeManager.settings

			printBox(
				{
					title: settings.exitErrorMessage,
					titleAlignment: 'center',
					borderColor: 'red',
				},
				'error'
			)
			displayGUI = false
		}
	}
}
