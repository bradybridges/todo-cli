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

	console.log('\n')
	console.log(boxen(msg, { ...boxenOptions, title }))
}

const printBox = (text, options = {}) => {
	const boxenOptions = {
		borderColor: 'green',
		borderStyle: 'double',
		height: 1,
		margin: 0,
		padding: 1,
		textAlignment: 'center',
		width: 60,
		...options,
	}

	const msg = chalk.white.bold(text)
	const box = boxen(msg, boxenOptions)

	console.log('\n')
	console.log(box)
	console.log('\n')
}

const printTodoList = (todos) => {
	if (todos?.length) {
		todos.forEach((todo) => {
			const text = todo.complete
				? chalk.green.italic(todo.label)
				: chalk.red.bold(todo.label)
			const boxenConfig = {
				borderColor: todo.complete ? 'green' : 'red',
				borderStyle: 'round',
				textAlignment: 'left',
				title: todo.complete ? 'Complete' : 'Incomplete',
				titleAlignment: 'right',
				width: 60,
			}

			console.log(boxen(text, boxenConfig))
		})
		console.log('\n')
	} else {
		printBox('No TODOs found. Take the day off.', {
			title: 'NO TODOS',
			titleAlignment: 'center',
			borderColor: 'yellow',
		})
	}
}

const printSuccessMessage = (msg, disableSpacing = false) => {
	const successMsg = chalk.green(msg)
	if (!disableSpacing) console.log('\n')
	console.log(`${successMsg}`)
	console.log('\n')
}

const printErrorMessage = (msg, disableSpacing = false) => {
	const errorMsg = chalk.red.bold(msg)
	if (!disableSpacing) console.log('\n')
	console.log(`${errorMsg}`)
	console.log('\n')
}

export {
	printTitle,
	printBox,
	printTodoList,
	printSuccessMessage,
	printErrorMessage,
}
