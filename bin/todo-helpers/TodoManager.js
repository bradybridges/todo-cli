export class TodoManager {
	constructor(store) {
		this.store = store
		this.todos = []
		this.#initTodos()
	}

	#initTodos() {
		try {
			this.todos = JSON.parse(this.store.get('todos'))
		} catch {
			console.log('problem getting saved todos...')
		}
	}

	#saveTodos() {
		this.store.set('todos', JSON.stringify(this.todos))
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
