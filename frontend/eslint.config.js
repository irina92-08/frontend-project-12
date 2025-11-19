// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import functionalPlugin from "eslint-plugin-functional";

export default [
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
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
  },
  js.configs.recommended,
  {
    files: ["**/*.jsx", "**/*.js"],
    plugins: {
      react: reactPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
        },
      ],
      "react/jsx-filename-extension": [
        "warn",
        {
          extensions: [".js", ".jsx"],
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.jsx", "**/*.js"],
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    plugins: {
      functional: functionalPlugin,
    },
    rules: {
      "functional/functional-parameters": "off",
      "functional/immutable-data": "off",
      "functional/no-conditional-statements": "off",
      "functional/no-expression-statements": "off",
      "functional/no-promise-reject": "error",
      "functional/no-return-void": "off",
      "functional/no-throw-statements": "off",
      "functional/no-try-statements": "off",
      "functional/no-mixed-types": "off",
      "functional/prefer-immutable-types": "off",
      "functional/prefer-readonly-type": "off",
      "functional/prefer-tacit": "off",
      "functional/no-class": "off",
    },
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    rules: {
      "import/extensions": "off",
      "import/no-unresolved": "off",
      "no-console": "off",
      "no-underscore-dangle": [
        "error",
        {
          allow: ["__filename", "__dirname"],
        },
      ],
    },
  },
  {
    ignores: [
      "dist/**",
      "build/**",
      "node_modules/**",
      "coverage/**",
      "*.min.js",
      "*.bundle.js",
    ],
  },
];
