import { expect } from 'chai'
import {
	applySelectedCompletion,
	excludeSelectedIndices,
	handleTruncateText,
} from '../utils/actions.js'

describe('applySelectedCompletion', () => {
	it('marks only the selected indices as complete', () => {
		const todos = [
			{ label: 'one', complete: false },
			{ label: 'two', complete: true },
			{ label: 'three', complete: false },
		]

		const updated = applySelectedCompletion(todos, [0, 2])

		expect(updated.map((todo) => todo.complete)).to.eql([true, false, true])
	})

	it('treats duplicate labels independently by position, not by text', () => {
		const todos = [
			{ label: 'same', complete: false },
			{ label: 'same', complete: false },
		]

		const updated = applySelectedCompletion(todos, [0])

		expect(updated[0].complete).to.equal(true)
		expect(updated[1].complete).to.equal(false)
	})
})

describe('excludeSelectedIndices', () => {
	it('removes only the todos at the selected indices', () => {
		const todos = [
			{ label: 'one', complete: false },
			{ label: 'two', complete: false },
			{ label: 'three', complete: false },
		]

		const remaining = excludeSelectedIndices(todos, [1])

		expect(remaining.map((todo) => todo.label)).to.eql(['one', 'three'])
	})

	it('keeps duplicate-labeled todos apart, deleting only the selected one', () => {
		const todos = [
			{ label: 'same', complete: false },
			{ label: 'same', complete: true },
		]

		const remaining = excludeSelectedIndices(todos, [0])

		expect(remaining).to.have.lengthOf(1)
		expect(remaining[0].complete).to.equal(true)
	})
})

describe('handleTruncateText', () => {
	it('leaves short text untouched', () => {
		expect(handleTruncateText('short task')).to.equal('short task')
	})

	it('truncates text past the limit and appends the marker', () => {
		const longText = 'a'.repeat(140)

		const result = handleTruncateText(longText, 130, '...')

		expect(result).to.have.lengthOf(130)
		expect(result.endsWith('...')).to.equal(true)
	})
})
