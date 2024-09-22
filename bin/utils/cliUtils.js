/* external imports */
import * as commander from 'commander'

const programInformation = {
	name: 'todo-cli',
	description: 'A command line tool to manage a simple todo list.',
	version: '1.0.0',
}

const initProgramInformation = (program, todoManager) => {
	program
		.name(programInformation.name)
		.description(programInformation.description)
		.version(
			programInformation.version,
			'-v, --version',
			'output the current version'
		)
}

const initCLI = (todoManager) => {
	const program = new commander.Command()

	initProgramInformation(program, todoManager)
	return program
}

export { initCLI }
