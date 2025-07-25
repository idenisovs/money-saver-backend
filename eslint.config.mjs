// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ignores: ['target/', '*.js', 'scripts/*.js'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
        },
    }
);