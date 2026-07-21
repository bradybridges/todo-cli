import { expect } from 'chai'
import {
	printTitle,
	printTodoList,
	printSuccessMessage,
	printErrorMessage,
	printExitMessage,
} from '../utils/print.js'
import { defaultStoreSettings } from '../utils/store.js'

const captureConsoleLog = (fn) => {
	const originalLog = console.log
	const lines = []
	console.log = (...args) => lines.push(args.join(' '))

	try {
		fn()
	} finally {
		console.log = originalLog
	}

	return lines.join('\n')
}

describe('printTodoList', () => {
	it('renders each todo label and its complete/incomplete status', () => {
		const storeManager = {
			todos: [
				{ label: 'buy milk', complete: false },
				{ label: 'walk the dog', complete: true },
			],
			settings: defaultStoreSettings,
		}

		const output = captureConsoleLog(() => printTodoList(storeManager))

		expect(output).to.include('buy milk')
		expect(output).to.include('walk the dog')
		expect(output).to.include('Incomplete')
		expect(output).to.include('Complete')
	})

	it('shows the configured no-tasks message when there are no todos', () => {
		const storeManager = {
			todos: [],
			settings: { ...defaultStoreSettings, noTasksMessage: 'Nothing to do' },
		}

		const output = captureConsoleLog(() => printTodoList(storeManager))

		expect(output).to.include('Nothing to do')
	})
})

describe('printTitle', () => {
	it('shows completed, incomplete, and total counts', () => {
		const storeManager = {
			todos: [
				{ label: 'one', complete: true },
				{ label: 'two', complete: false },
				{ label: 'three', complete: false },
			],
			settings: defaultStoreSettings,
		}

		const output = captureConsoleLog(() => printTitle(storeManager))

		expect(output).to.include('1 completed')
		expect(output).to.include('2 incomplete')
		expect(output).to.include('3 total')
	})
})

describe('printExitMessage', () => {
	it('prints the configured exit message when enabled', () => {
		const storeManager = {
			settings: {
				...defaultStoreSettings,
				disableExitMessage: false,
				exitMessage: 'See you later',
			},
		}

		const output = captureConsoleLog(() => printExitMessage(storeManager))

		expect(output).to.include('See you later')
	})

	it('prints nothing when the exit message is disabled', () => {
		const storeManager = {
			settings: { ...defaultStoreSettings, disableExitMessage: true },
		}

		const output = captureConsoleLog(() => printExitMessage(storeManager))

		expect(output).to.equal('')
	})
})

describe('printSuccessMessage and printErrorMessage', () => {
	it('prints the given success message', () => {
		const output = captureConsoleLog(() =>
			printSuccessMessage('Task added successfully')
		)

		expect(output).to.include('Task added successfully')
	})

	it('prints the given error message', () => {
		const output = captureConsoleLog(() =>
			printErrorMessage('Something went wrong')
		)

		expect(output).to.include('Something went wrong')
	})
})
