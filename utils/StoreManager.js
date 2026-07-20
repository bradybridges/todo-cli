import { printErrorMessage } from './print.js'
import { getStore } from './store.js'
import { defaultStoreSettings } from './store.js'

export class StoreManager {
	/**
	 * @param {Partial<import('conf').Options<import('./types.js').StoreSchema>>} [options]
	 */
	constructor(options = {}) {
		this.store = getStore(options)
		/** @type {import('./types.js').Todo[]} */
		this.todos = []
		/** @type {import('./types.js').Settings} */
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

	/** @param {string} todo */
	addTodo(todo) {
		this.todos.unshift({ label: todo, complete: false })
		this.#saveTodos()
	}

	/** @param {import('./types.js').Todo[]} todos */
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

	/** @param {import('./types.js').Settings} updatedSettings */
	updateSettings(updatedSettings) {
		this.settings = updatedSettings
		this.store.set('settings', updatedSettings)
	}

	restoreDefaultSettings() {
		this.store.reset('settings')
		this.settings = this.store.get('settings')
	}
}
