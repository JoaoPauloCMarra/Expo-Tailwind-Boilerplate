module.exports = {
	root: true,
	env: {
		browser: true,
		'shared-node-browser': true,
		node: true,
		es6: true
	},
	extends: ['universe', 'universe/shared/typescript-analysis'],
	overrides: [
		{
			extends: [
				'plugin:@typescript-eslint/recommended',
				'plugin:@tanstack/eslint-plugin-query/recommended',
				'plugin:jsx-a11y/recommended',
				'plugin:react-hooks/recommended',
				'plugin:react-hook-form/recommended',
				'plugin:tailwindcss/recommended',
				'plugin:prettier/recommended'
			],
			files: ['*.ts', '*.tsx', '*.d.ts'],
			plugins: [
				'@typescript-eslint',
				'unused-imports',
				'import',
				'jsx-a11y',
				'react',
				'react-hooks',
				'tailwindcss',
				'prettier'
			],
			parserOptions: {
				parser: '@typescript-eslint/parser',
				project: './tsconfig.json'
			},
			rules: {
				'no-unused-vars': 'off',
				'@typescript-eslint/no-unused-vars': [
					'error',
					{
						argsIgnorePattern: '^_',
						varsIgnorePattern: '^_',
						caughtErrorsIgnorePattern: '^_'
					}
				],
				'@typescript-eslint/no-unnecessary-condition': 'error',
				'@typescript-eslint/no-var-requires': 'off',

				'@typescript-eslint/consistent-type-imports': [
					'error',
					{
						disallowTypeAnnotations: false
					}
				],

				'unused-imports/no-unused-imports': 'error',
				'unused-imports/no-unused-vars': [
					'warn',
					{
						vars: 'all',
						varsIgnorePattern: '^_',
						args: 'after-used',
						argsIgnorePattern: '^_'
					}
				],

				'import/order': [
					'error',
					{
						'newlines-between': 'never',
						groups: [
							'builtin',
							'external',
							'internal',
							'parent',
							'sibling',
							'index',
							'unknown',
							'object',
							'type'
						],
						pathGroups: [
							{
								pattern: 'react',
								group: 'external',
								position: 'before'
							},
							{
								pattern: 'next',
								group: 'external',
								position: 'before'
							},
							{
								pattern: '@/lib/**',
								group: 'internal',
								position: 'after'
							},
							{
								pattern: '@/pages/**',
								group: 'internal',
								position: 'after'
							},
							{
								pattern: '@/**',
								group: 'internal',
								position: 'after'
							},
							{
								pattern: './**',
								group: 'internal',
								position: 'after'
							}
						],
						pathGroupsExcludedImportTypes: ['react'],
						alphabetize: {
							order: 'asc',
							caseInsensitive: true
						}
					}
				],
				'import/first': 'error',
				'import/no-amd': 'error',
				'import/no-anonymous-default-export': 'warn',
				'import/no-webpack-loader-syntax': 'error',
				'import/no-named-as-default': 'error',
				'import/prefer-default-export': 'off'
			}
		}
	]
};
