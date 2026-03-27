import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import storybook from 'eslint-plugin-storybook';
import biome from 'eslint-config-biome';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Accessibility rules via jsx-a11y (plugin already registered by eslint-config-next)
  {
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
    },
  },

  // Custom rules (adapted from a11y-road)
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      'id-length': [
        'error',
        {
          min: 2,
          exceptions: ['_'],
          exceptionPatterns: ['^_'],
          properties: 'never',
        },
      ],
      'func-style': ['error', 'expression', { allowArrowFunctions: true }],
    },
  },

  // Storybook rules
  ...storybook.configs['flat/recommended'],

  // Ignores
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'storybook-static/**',
    'coverage/**',
  ]),

  // MUST be last: disables ESLint rules that Biome already handles
  biome,
]);

export default eslintConfig;
