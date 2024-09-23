
import Conf from 'conf'

const storeConfig = {
	projectName: 'todo',
	schema: {
		todos: {
			type: 'string',
			default: '[]',
		},
	},
}

export const getStore = () => new Conf(storeConfig)
