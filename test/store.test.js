import { expect, assert } from 'chai'
import { getStore } from '../utils/store.js'
import { defaultStoreSettings } from '../utils/store.js'

describe('Store', () => {
	it('calling the function getStore should return an object', () => {
		const store = getStore()

		assert.isNotNull(store, 'The store exists')
		assert.isObject(store, 'The store is an object')
	})

	it('the store should initialize an empty todo list that is an array', () => {
		const store = getStore()
		const todos = store.get('todos')

		assert.isArray(todos, 'Todos list is an array')
		expect(todos).to.have.lengthOf(0, 'Todos list should be empty')
	})

	it('it should initialize with default settings', () => {
		const store = getStore()
		const settings = store.get('settings')

		assert.isObject(settings, 'Settings is an object')
		expect(settings).to.eql(defaultStoreSettings)
	})
})
