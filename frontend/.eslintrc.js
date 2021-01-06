module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['airbnb-typescript'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint'
	],
	ignorePatterns: ['.eslintrc.js']
};