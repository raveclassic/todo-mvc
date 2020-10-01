module.exports = {
	preset: 'ts-jest',
	timers: 'fake',
	testEnvironment: 'jsdom',
	collectCoverage: false,
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},
	collectCoverageFrom: ['src/**/*.ts', '!src/**/*.(container|styled|mock).ts'],
	testRegex: '.*\\.spec\\.ts$',
};
