import {
	printBox,
	printErrorMessage,
	printSuccessMessage,
} from '../utils/printUtils.js'
import {
	confirmPrompt,
	deleteTodosPrompt,
	getNewTodoPrompt,
	updateTodosPrompt,
} from '../utils/promptUtils.js'

const handleMenuSelection = async (selection, todosManager) => {
	switch (selection) {
		case 'add':
			await handleAddTodo(todosManager)
			break
		case 'update':
			await handleUpdateTodos(todosManager)
			break
		case 'delete':
			await handleDeleteTodos(todosManager)
			break
		case 'clear':
			await handleClearTodos(todosManager)
			break
		default:
			printBox('Godspeed, friend', {
				title: 'Exiting',
				titleAlignment: 'center',
			}, 'success')
	}
}

const handleUpdateTodos = async (todosManager) => {
	if (todosManager.todos.length === 0) {
		printErrorMessage('There are no tasks to update')
	} else {
		const selectedTodos = await updateTodosPrompt(todosManager)

		const updatedTodos = todosManager.todos.map((todo) => {
			let isComplete = todo.complete

			if (!isComplete && selectedTodos.includes(todo.label)) {
				isComplete = true
			} else if (isComplete && !selectedTodos.includes(todo.label)) {
				isComplete = false
			}

			return {
				label: todo.label,
				complete: isComplete,
			}
		})

		todosManager.updateTodos(updatedTodos)
	}
}

const handleDeleteTodos = async (todosManager) => {
	if (todosManager.todos.length === 0) {
		printErrorMessage(
			`Successfully deleted ${(Math.random() * 1000).toFixed()} tasks!`
		)

		await new Promise((resolve) => {
			setTimeout(() => {
				printSuccessMessage(
					'Just kidding, there were no tasks to delete',
					true
				)
				resolve(true)
			}, 1250)
		})
	} else {
		const selectedTodos = await deleteTodosPrompt(todosManager)
		const updatedTodos = todosManager.todos.filter(
			(todo) => !selectedTodos.includes(todo.label)
		)

		todosManager.updateTodos(updatedTodos)
	}
}

const handleClearTodos = async (todosManager) => {
	const confirmed = await confirmPrompt(
		'Are you sure you want to delete all todo items?'
	)

	if (confirmed) {
		todosManager.deleteTodos()
	} else {
		printErrorMessage('Aborted deleting todos')
	}
}

const handleAddTodo = async (todosManager) => {
	const newTodo = await getNewTodoPrompt()
	todosManager.addTodo(newTodo)
}

export { handleMenuSelection }
