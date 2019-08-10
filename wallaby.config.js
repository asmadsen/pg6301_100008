module.exports = function (wallaby) {
	return {
		files: ['src/**/*.js?(x)', 'jest.config.js', 'tests/**/*.js?(x)', '!tests/**/?(*.)+(spec|test).js?(x)'],

		tests: ['tests/**/?(*.)+(spec|test).js?(x)'],

		env: {
			type: 'node',
			runner: 'node',
			params: {
				env: 'ENVIRONMENT=development'
			}
		},

		testFramework: 'jest',

		filesWithNoCoverageCalculated: [
			'jest.config.js',
			'tests/**/*.js',
			'tests/**/*.jsx',
			'src/server/index.js',
			'src/client/index.jsx',
			'**/.eslintrc.js'
		],

		compilers: {
			'**/*.js?(x)': wallaby.compilers.babel()
		}
	}
}
