
import Conf from 'conf'

const storeConfig = {
	projectName: 'todo',
	schema: {
		todos: {
			type: 'array',
			default: [],
		},
	},
}

export const getStore = () => new Conf(storeConfig)
