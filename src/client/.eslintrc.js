module.exports = {
	env: {
		node: true,
		browser: true,
	},
	extends: [
		'plugin:react/recommended'
	],
	plugins: [
		'react',
		'babel',
		'react-hooks'
	],
	rules: {
		'react-hooks/exhaustive-deps': 'error',
		'react/jsx-curly-brace-presence': ['error', 'never'],
		'jsx-quotes': ['error', 'prefer-double']
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
