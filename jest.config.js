module.exports = {
	collectCoverage: false,
	collectCoverageFrom: ['src/**/*.ts', '!src/index.ts', '!src/**/*.{contract,d}.ts'],
	coveragePathIgnorePatterns: ['/node_modules/', '/__tests__/', '/__mocks__/', '/__snapshots__/'],
	maxConcurrency: 1,
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/src/$1',
	},
	moduleFileExtensions: ['js', 'ts'],
	preset: 'ts-jest',
	roots: ['<rootDir>/src'],
	setupFilesAfterEnv: ['jest-extended/all'],
	testEnvironment: 'node',
	testMatch: ['<rootDir>/src/**/*.test.ts'],
	testPathIgnorePatterns: ['/node_modules/'],
}
