// eslint.config.js

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescriptEslint from '@typescript-eslint/eslint-plugin';

export default {
  extends: [
    js.configs.recommended, 
    ...typescriptEslint.configs.recommended,
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    es2020: true,
    browser: true,
    node: true,
  },
  globals: globals.browser,
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Adicione suas regras personalizadas aqui
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      rules: {
        // Regras específicas para arquivos TypeScript
      },
    },
  ],
};
