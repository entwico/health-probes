import pluginJs from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default [
  // global ignores
  { ignores: ['node_modules/*', 'cache/*', 'src/_/*', 'dist/*'] },

  // standard js rules
  pluginJs.configs.recommended,

  // override js rules
  {
    rules: {
      semi: [2, 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'object-shorthand': 'error',
      quotes: ['error', 'single'],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      eqeqeq: ['error', 'always'],
      'no-useless-concat': 'error',
    },
  },

  // standard typescript rules
  ...tseslint.configs.recommended,

  // override typescript rules
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 0,
      '@typescript-eslint/explicit-module-boundary-types': 0,
      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/no-unused-expressions': 0,
      '@typescript-eslint/no-empty-interface': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },

  // prettier rules
  prettierRecommended,

  // import rules
  {
    ...importPlugin.flatConfigs.recommended,
    rules: {
      'import/no-duplicates': ['error', { 'prefer-inline': true }],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
          alphabetize: {
            order: 'asc',
          },
        },
      ],
    },
  },
];
