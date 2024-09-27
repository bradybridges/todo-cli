import { expect, assert } from 'chai'
import { StoreManager } from '../utils/StoreManager.js'
import { defaultStoreSettings } from '../utils/store.js'

describe('Store Manager', () => {
	const storeManager = new StoreManager()

	it('it should initialize with an empty todo list', () => {
		const todos = storeManager.todos

		assert.isArray(todos, 'todo list is an array')
		expect(todos).to.have.lengthOf(0)
	})

	it('it should initialize with default settings', () => {
		const settings = storeManager.settings
		assert.isObject(settings, 'settings is an object')
		expect(settings).to.eql(defaultStoreSettings)
	})

	it('it should be able to add a new task', () => {
		const todos = storeManager.todos
		const todoLabel = 'test'
		storeManager.addTodo(todoLabel)

		expect(todos).to.have.lengthOf(1)
		expect(todos[0].label).to.equal(todoLabel)
		expect(todos[0].complete).to.equal(false)
	})

	it('it should be able to update tasks', () => {
		const updatedTodos = [
			{ label: '1', complete: false },
			{ label: '2', complete: false },
			{ label: '3', complete: true },
		]

		storeManager.updateTodos(updatedTodos)
		const todos = storeManager.todos

		expect(todos).to.have.lengthOf(3)
		expect(todos[2].label).to.equal('3')
		expect(todos[2].complete).to.equal(true)
	})

	it('it should be able to delete all tasks', () => {
		const todos = storeManager.todos
		expect(todos).to.have.lengthOf(3)

		storeManager.deleteTodos()
		assert.isArray(storeManager.todos)
		expect(storeManager.todos).to.have.lengthOf(0)
	})

	it('should be able to update settings', () => {
		const disableExitMessage = true
		const exitErrorMessage = 'test exit error message'
		const exitMessage = 'test exit message'
		const headerTitle = 'test header title'
		const noTasksMessage = 'test no tasks message'

		const testSettings = {
			disableExitMessage,
			exitErrorMessage,
			exitMessage,
			headerTitle,
			noTasksMessage,
		}

		storeManager.updateSettings(testSettings)
		expect(storeManager.settings).to.eql(testSettings)
	})

	it('should be able to restore default settings', () => {
		storeManager.restoreDefaultSettings()
		expect(storeManager.settings).to.eql(defaultStoreSettings)
	})
})
