import Conf from 'conf'

/** @type {import('./types.js').Settings} */
const defaultStoreSettings = {
	disableExitMessage: false,
	exitErrorMessage: 'Exiting due to an error',
	exitMessage: 'Godspeed, friend',
	headerTitle: 'TODO LIST',
	noTasksMessage: 'No TODOs found',
}

/** @type {import('conf').Options<import('./types.js').StoreSchema>} */
const storeConfig = {
	projectName: 'todo',
	schema: {
		todos: {
			type: 'array',
			default: [],
		},
		settings: {
			type: 'object',
			default: defaultStoreSettings,
		},
	},
}

/**
 * @param {Partial<import('conf').Options<import('./types.js').StoreSchema>>} [options]
 * @returns {import('conf').default<import('./types.js').StoreSchema>}
 */
const getStore = (options = {}) => new Conf({ ...storeConfig, ...options })

export { defaultStoreSettings, getStore }
