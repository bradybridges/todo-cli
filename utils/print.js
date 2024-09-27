import boxen from 'boxen'
import chalk from 'chalk'

const baseRed = '#fc7060'
const baseYellow = '#ffe046'
const baseGreen = '#7dcc7f'
const whiteBoldText = chalk.white.bold
const greenText = chalk.hex(baseGreen)
const greenBoldText = chalk.hex(baseGreen).bold
const greenItalicText = chalk.hex(baseGreen).italic
const redBoldText = chalk.hex(baseRed).bold
const yellowBoldText = chalk.hex(baseYellow).bold

const boxWidth = 60
const boxenOptions = {
	borderColor: baseGreen,
	borderStyle: 'double',
	height: 1,
	margin: 0,
	padding: 1,
	titleAlignment: 'center',
	textAlignment: 'center',
	width: boxWidth,
}

const printTitle = (todoManager) => {
	const todos = todoManager.todos
	const completedTodosCount = todos.filter((todo) => todo.complete).length
	const incompleteTodosCount = todos.filter((todo) => !todo.complete).length

	const msg = greenBoldText(todoManager.settings.headerTitle)
	let title

	if (completedTodosCount > 0 || incompleteTodosCount > 0) {
		title = `${completedTodosCount} completed | ${incompleteTodosCount} incomplete | ${todos.length} total`
	} else {
		title = 'No Todos Added'
	}

	console.log('\n')
	console.log(boxen(msg, { ...boxenOptions, title }))
}

const printBox = (text, options = {}, type = 'default') => {
	const boxenOptions = {
		borderColor: baseGreen,
		borderStyle: 'double',
		height: 1,
		margin: 0,
		padding: 1,
		textAlignment: 'center',
		width: 60,
		...options,
	}
	const textTypes = {
		success: greenBoldText,
		warning: yellowBoldText,
		error: redBoldText,
	}

	let msg = whiteBoldText(text)

	if (textTypes[type]) msg = textTypes[type](text)

	const box = boxen(msg, boxenOptions)

	console.log('\n')
	console.log(box)
	console.log('\n')
}

const printTodoList = (todoManager) => {
	const todos = todoManager.todos

	if (todos?.length) {
		todos.forEach((todo, index) => {
			const text = `${index + 1}. ${todo.label}`
			const styledText = todo.complete
				? greenItalicText(text)
				: redBoldText(text)

			const boxenConfig = {
				borderColor: todo.complete ? baseGreen : baseRed,
				borderStyle: 'round',
				textAlignment: 'left',
				title: todo.complete ? 'Complete' : 'Incomplete',
				titleAlignment: 'right',
				width: 60,
			}

			console.log(boxen(styledText, boxenConfig))
		})
		console.log('\n')
	} else {
		const settings = todoManager.settings

		printBox(
			settings.noTasksMessage,
			{
				title: 'NO TODOS',
				titleAlignment: 'center',
				borderColor: baseYellow,
			},
			'warning'
		)
	}
}

const printSuccessMessage = (msg, disableSpacing = false) => {
	const successMsg = greenText(msg)
	if (!disableSpacing) console.log('\n')
	console.log(`${successMsg}`)
	console.log('\n')
}

const printErrorMessage = (msg, disableSpacing = false) => {
	const errorMsg = redBoldText(msg)
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
