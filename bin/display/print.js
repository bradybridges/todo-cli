import boxen from 'boxen'
import chalk from 'chalk'

const boxWidth = 60
const boxenOptions = {
	borderColor: 'green',
	borderStyle: 'double',
	height: 1,
	margin: 0,
	padding: 1,
	titleAlignment: 'center',
	textAlignment: 'center',
	width: boxWidth,
}

const printTitle = (todos) => {
	const completedTodosCount = todos.filter((todo) => todo.complete).length
	const incompleteTodosCount = todos.filter((todo) => !todo.complete).length

	const msg = chalk.green.bold('TODO LIST')
	let title

	if (completedTodosCount > 0 || incompleteTodosCount > 0) {
		title = `${completedTodosCount} completed | ${incompleteTodosCount} incomplete | ${todos.length} total`
	} else {
		title = 'No Todos Added'
	}
	console.log(boxen(msg, { ...boxenOptions, title }))
}
