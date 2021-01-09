module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['airbnb-typescript/base'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint/eslint-plugin'
	],
	ignorePatterns: ['.eslintrc.js']
};