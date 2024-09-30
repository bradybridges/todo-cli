import { StoreManager } from '../utils/StoreManager.js'
import { printBox, printTitle, printTodoList } from '../utils/print.js'
import { getMenuSelectionPrompt } from '../utils/prompts.js'
import { handleMenuSelection } from '../utils/actions.js'

export const displayGUI = async () => {
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
