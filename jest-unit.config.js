const sharedConfig = require('./jest.config.js')

module.exports = {
	...sharedConfig,
	testPathIgnorePatterns: [...sharedConfig.testPathIgnorePatterns, '/__tests__/'],
}
