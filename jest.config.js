module.exports = {
	// An array of glob patterns indicating a set of files for which coverage information should be collected
	collectCoverageFrom: [
		'src/**/*.js?(x)'
	],

	coverageDirectory: 'coverage',

	// The paths to modules that run some code to configure or set up the testing environment before each test
	setupFiles: [
		'<rootDir>/tests/jest-setup.js'
	],

	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/__mocks__/fileMock.js',
		'\\.(css|less|sass|scss)$': '<rootDir>/tests/__mocks__/styleMock.js',
	},

	// The test environment that will be used for testing
	testEnvironment: 'node',

	// Options that will be passed to the testEnvironment
	testEnvironmentOptions: {},

	// The glob patterns Jest uses to detect test files
	testRegex: 'tests/.*.(spec|test).jsx?$',
	snapshotSerializers: [
		'enzyme-to-json/serializer'
	]
}
