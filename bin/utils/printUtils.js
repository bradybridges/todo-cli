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

const printTitle = (todos) => {
	const completedTodosCount = todos.filter((todo) => todo.complete).length
	const incompleteTodosCount = todos.filter((todo) => !todo.complete).length

	const msg = greenBoldText('TODO LIST')
	let title

	if (completedTodosCount > 0 || incompleteTodosCount > 0) {
		title = `${completedTodosCount} completed | ${incompleteTodosCount} incomplete | ${todos.length} total`
	} else {
		title = 'No Todos Added'
	}

	const boxenTitleOptions = {
		borderColor: baseGreen,
		borderStyle: 'double',
		height: 1,
		margin: 0,
		padding: 1,
		title,
		titleAlignment: 'center',
		textAlignment: 'center',
		width: boxWidth,
	}

	console.log('\n')
	console.log(boxen(msg, { ...boxenTitleOptions, title }))
}

const printBox = (text, options = {}, type = 'default') => {
	const boxenOptions = {
		borderColor: baseGreen,
		borderStyle: 'double',
		height: 1,
		margin: 0,
		padding: 1,
		textAlignment: 'center',
		width: boxWidth,
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

const printTodoList = (todos) => {
	if (todos?.length) {
		todos.forEach((todo) => {
			const text = todo.complete
				? greenItalicText(todo.label)
				: redBoldText(todo.label)
			const todoBoxenConfig = {
				borderColor: todo.complete ? baseGreen : baseRed,
				borderStyle: 'round',
				padding: { top: 0, right: 1, bottom: 0, left: 1 },
				textAlignment: 'left',
				title: todo.complete ? 'Complete' : 'Incomplete',
				titleAlignment: 'right',
			}

			console.log(boxen(text, todoBoxenConfig))
		})
		console.log('\n')
	} else {
		printBox(
			'No TODOs found. Take the day off.',
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
