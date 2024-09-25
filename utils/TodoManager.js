import { printErrorMessage } from './print.js'
import { getStore } from './store.js'

export class TodoManager {
	constructor() {
		this.store = getStore()
		this.todos
		this.#initTodos()
	}

	#initTodos() {
		try {
			this.todos = this.store.get('todos')
		} catch {
			printErrorMessage('Failed to retrieve saved tasks...')
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
}
