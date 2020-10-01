module.exports = {
	root: true,
	env: {
		node: true,
		browser: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		extraFileExtensions: ['.json'],
		project: './tsconfig.eslint.json',
		tsconfigRootDir: __dirname,
		ecmaFeatures: {
			jsx: true,
			modules: true,
		},
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	extends: [
		'plugin:react/recommended',
		'react-app',
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		'@typescript-eslint/no-use-before-define': 0,
		'@typescript-eslint/explicit-function-return-type': 0,
		'@typescript-eslint/ban-ts-comment': 2,
		'@typescript-eslint/await-thenable': 2,
		'@typescript-eslint/ban-types': 0,
		'@typescript-eslint/class-literal-property-style': 2,
		'@typescript-eslint/naming-convention': 0,
		'@typescript-eslint/no-unused-vars': 2,
		'@typescript-eslint/no-empty-interface': 0,
		'@typescript-eslint/no-unsafe-member-access': 0,
		'@typescript-eslint/no-unsafe-assignment': 0,
		'@typescript-eslint/no-unsafe-call': 0,
		'@typescript-eslint/no-unsafe-return': 0,
		'@typescript-eslint/restrict-template-expressions': 0,
		'no-redeclare': 0,
		'react/display-name': 0,
		'react-hooks/rules-of-hooks': 2,
		'react-hooks/exhaustive-deps': 2,
		'react/prop-types': 0,
		'no-mixed-spaces-and-tabs': 0,
		'no-restricted-syntax': [
			// casts are NOT ALLOWED!
			'error',
			"TSAsExpression[typeAnnotation.typeName.name!='const']",
		],
	},
	overrides: [
		{
			files: '**/*.json',
			rules: {
				'no-unused-expressions': 0,
			},
		},
	],
};
