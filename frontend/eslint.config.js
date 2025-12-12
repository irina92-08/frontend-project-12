import js from '@eslint/js'
import globals from 'globals'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import stylistic from '@stylistic/eslint-plugin'

export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    plugins: {
      'react': reactPlugin,
      'react-hooks': reactHooks,
      '@stylistic': stylistic,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/arrow-parens': ['error', 'as-needed', {
        requireForBlockBody: false
      }],

      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1 }],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/spaced-comment': ['error', 'always'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/quote-props': ['error', 'consistent-as-needed'],

      '@stylistic/jsx-one-expression-per-line': 'off',
      '@stylistic/jsx-closing-tag-location': 'off',
      '@stylistic/multiline-ternary': 'off',
      '@stylistic/operator-linebreak': 'off',

      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'no-console': 'off',
      'no-underscore-dangle': [
        'error',
        {
          allow: ['__filename', '__dirname'],
        },
      ],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
        },
      ],
      'react/jsx-filename-extension': [
        'warn',
        {
          extensions: ['.js', '.jsx'],
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**'],
  },
]
