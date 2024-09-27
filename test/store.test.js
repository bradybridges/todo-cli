import { expect, assert } from 'chai'
import { getStore } from '../utils/store.js'

describe('Store', () => {
	it('getStore should return an object', () => {
		const store = getStore()

		assert.isNotNull(store, 'The store exists')
		assert.isObject(store, 'The store is an object')
	})

	it('The store should initialize with an empty todo list', () => {
		const store = getStore()
		const todos = store.get('todos')

		assert.isArray(todos, 'Todos list is an array')
		expect(todos).to.have.lengthOf(0, 'Todos list should be empty')
	})
})
