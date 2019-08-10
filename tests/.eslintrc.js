module.exports = {
	env: {
		jest: true
	},
	extends: [
		'plugin:react/recommended'
	],
	plugins: [
		'react',
		'babel'
	],
	rules: {
		'react/no-string-refs': 'off'
	},
	parser: 'babel-eslint',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		}
	},
	settings: {
		react: {
			version: 'detect'
		}
	},
}
