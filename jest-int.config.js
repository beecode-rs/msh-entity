const sharedConfig = require('./jest.config.js')

module.exports = {
	...sharedConfig,
	testMatch: ['<rootDir>/src/**/__tests__/*.test.ts'],
}
