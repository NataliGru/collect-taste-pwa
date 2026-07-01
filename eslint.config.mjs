import js from '@eslint/js';
import nextVitals from 'eslint-config-next/core-web-vitals';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const eslintConfig = [
  // Ignore generated and build files
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'next-env.d.ts',
    ],
  },

  // Base JavaScript recommended rules
  js.configs.recommended,

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  // Next.js + Core Web Vitals rules
  ...nextVitals,

  {
    files: ['**/*.{ts,tsx,js,jsx}'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      // Add browser + Node.js globals
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      'unused-imports': unusedImports,
    },

    rules: {
      // Disable default unused vars rule
      // because TypeScript handles it better
      'no-unused-vars': 'off',

      // TypeScript-aware unused variables check
      // Allows variables prefixed with "_" to be ignored
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // Automatically remove unused imports
      'unused-imports/no-unused-imports': 'warn',

      // Sort imports into consistent groups
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // React / Next / third-party packages
            ['^react$', '^next', '^@?\\w'],

            // Internal aliases
            ['^@/'],

            // Parent imports
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],

            // Relative imports
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],

            // Styles
            ['^.+\\.css$'],
          ],
        },
      ],

      // Sort exports
      'simple-import-sort/exports': 'error',

      // Allow "any" when needed
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];

export default eslintConfig;
