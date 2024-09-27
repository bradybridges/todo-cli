import Conf from 'conf'

const defaultStoreSettings = {
	disableExitMessage: false,
	exitErrorMessage: 'Goodbye',
	exitMessage: 'Godspeed, friend',
	headerTitle: 'TODO LIST',
	noTasksMessage: 'No TODOs found. Take the day off.',
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
