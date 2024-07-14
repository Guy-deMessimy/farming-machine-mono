module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 6,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ['prettier', 'react', 'react-hooks', '@typescript-eslint'],
    extends: [
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'plugin:prettier/recommended',
    ],
    env: {
        browser: true,
        node: true,
        es6: true,
        jest: true,
    },
    ignorePatterns: ['node_modules', 'build', 'dist', 'public'],
    rules: {
        eqeqeq: 'error',
        'no-console': 'warn',
        'prettier/prettier': 'error',
        'react/display-name': 'off',
        'react/no-children-prop': 'off',
        'react/react-in-jsx-scope': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
      },
  };