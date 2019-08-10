module.exports = {
	root: true,
	env: {
		node: true
	},
	parser: 'babel-eslint',
	extends: ['standard'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-tabs': 'off',
		'max-len': ['error', 150],
		indent: ['error', 'tab', { SwitchCase: 1 }],
		semi: ['error', 'never'],
		quotes: ['error', 'single'],
		'comma-dangle': 'off',
		'object-curly-spacing': ['error', 'always'],
		'arrow-parens': ['error', 'as-needed'],
		'array-element-newline': ['error', 'consistent'],
		'space-before-function-paren': 'off',
		'no-trailing-spaces': ['error', { skipBlankLines: true }]
	}
}
