import {
	printBox,
	printErrorMessage,
	printSuccessMessage,
} from '../display/print.js'
import {
	confirmPrompt,
	deleteTodosPrompt,
	getNewTodoPrompt,
	updateTodosPrompt,
} from '../display/prompts.js'

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
		printSuccessMessage('Todos updated successfully')
	}
}
