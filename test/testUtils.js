import fs from 'fs'
import os from 'os'
import path from 'path'

const createTempStoreOptions = () => ({
	cwd: fs.mkdtempSync(path.join(os.tmpdir(), 'todo-cli-test-')),
})

export { createTempStoreOptions }
