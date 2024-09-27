import { printErrorMessage } from './print.js'
import { getStore } from './store.js'
import { defaultStoreSettings } from './store.js'

export class StoreManager {
	constructor() {
		this.store = getStore()
		this.todos = []
		this.settings = defaultStoreSettings
		this.#initTodos()
		this.#initSettings()
	}

	#initTodos() {
		try {
			this.todos = this.store.get('todos')
		} catch {
			printErrorMessage('Failed to retrieve saved tasks...')
		}
	}

	#initSettings() {
		try {
			this.settings = this.store.get('settings')
		} catch {
			printErrorMessage('Failed to retrieve saved settings...')
		}
	}

	#saveTodos() {
		this.store.set('todos', this.todos)
	}

	addTodo(todo) {
		this.todos.unshift({ label: todo, complete: false })
		this.#saveTodos()
	}

	updateTodos(todos) {
		const sortedTodos = todos.sort(
			(a, b) => Number(a.complete) - Number(b.complete)
		)
		this.todos = sortedTodos
		this.#saveTodos()
	}

	deleteTodos() {
		this.todos = []
		this.#saveTodos()
	}

	updateSettings(updatedSettings) {
		this.settings = updatedSettings
		this.store.set('settings', updatedSettings)
	}

	restoreDefaultSettings() {
		this.store.reset('settings')
		this.settings = this.store.get('settings')
	}
}
