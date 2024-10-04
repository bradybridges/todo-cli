import Conf from 'conf'

const defaultStoreSettings = {
	disableExitMessage: false,
	exitErrorMessage: 'Exiting due to an error',
	exitMessage: 'Godspeed, friend',
	headerTitle: 'TODO LIST',
	noTasksMessage: 'No TODOs found',
}

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

const getStore = () => new Conf(storeConfig)

export { defaultStoreSettings, getStore }
