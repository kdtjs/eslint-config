import type { FlatConfig } from '../types'
import { pluginAntfu, pluginImport } from '../plugins'

export function imports(): FlatConfig[] {
    return [
        {
            plugins: { antfu: pluginAntfu, import: pluginImport },
            settings: {
                'import/parsers': {
                    'espree': ['.js', '.cjs', '.mjs', '.jsx'],
                    '@typescript-eslint/parser': ['.ts', '.cts', '.mts', '.tsx'],
                },
            },
            rules: {
                ...pluginImport.configs.recommended.rules,

                'antfu/import-dedupe': 'error',
                'antfu/no-import-dist': 'error',
                'antfu/no-import-node-modules-by-path': 'error',

                'import/first': 'error',
                'import/newline-after-import': ['error', { considerComments: true, count: 1 }],
                'import/no-duplicates': 'error',
                'import/no-empty-named-blocks': 'error',
                'import/no-mutable-exports': 'error',
                'import/no-named-default': 'error',
                'import/no-self-import': 'error',
                'import/no-unresolved': 'off',
                'import/no-unused-modules': 'error',
                'import/no-useless-path-segments': 'error',
                'import/no-webpack-loader-syntax': 'error',
                'import/order': 'error',
            },
        },
        {
            files: ['**/bin/**/*'],
            rules: {
                'antfu/no-import-dist': 'off',
                'antfu/no-import-node-modules-by-path': 'off',
            },
        },
    ]
}
