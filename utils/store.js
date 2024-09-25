import Conf from 'conf'

const storeConfig = {
	projectName: 'todo',
	schema: {
		todos: {
			type: 'array',
			default: [],
		},
		settings: {
			type: 'object',
			default: {
				disableExitMessage: false,
				exitErrorMessage: 'Goodbye',
				exitMessage: 'Godspeed, friend',
				headerTitle: 'TODO LIST',
				noTasksMessage: 'No TODOs found. Take the day off.',
			},
		},
	},
}

export const getStore = () => new Conf(storeConfig)
