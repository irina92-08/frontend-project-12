import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  // Базовые настройки
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
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
    },
    rules: {
      // Базовые правила
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // Кастомные правила
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "import/extensions": "off",
      "import/no-unresolved": "off",
      "no-console": "off",
      "no-underscore-dangle": [
        "error",
        {
          allow: ["__filename", "__dirname"],
        },
      ],
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
    ignores: ["node_modules/**", "dist/**", "build/**"],
  },
];
