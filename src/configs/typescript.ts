import process from 'node:process'
import { existsSync } from 'node:fs'
import { join } from 'node:path/posix'
import type { FlatConfig } from '../types'
import { renameRules, toArray } from '../utils'
import { GLOB_SRC, GLOB_TS, GLOB_TSX } from '../globs'
import { parserTypescript, pluginDeprecation, pluginImport, pluginTypescript } from '../plugins'

export interface TypescriptOptions {
    componentExts?: string[]
    tsconfigPath?: string | string[]
    tsconfigRootDir?: string
}

const typeAwareRules: FlatConfig['rules'] = {
    'ts/consistent-type-assertions': 'off',
    'ts/consistent-type-definitions': 'off',
    'ts/consistent-type-exports': 'error',
    'ts/restrict-template-expressions': [
        'error',
        { allowNumber: true, allowBoolean: true, allowAny: true, allowNullish: true, allowRegExp: true, allowNever: true },
    ],
    'ts/explicit-member-accessibility': 'error',
    'ts/no-confusing-void-expression': 'off',
    'ts/no-dynamic-delete': 'off',
    'ts/no-explicit-any': 'off',
    'ts/no-floating-promises': 'off',
    'ts/no-invalid-void-type': 'off',
    'ts/no-misused-promises': 'off',
    'ts/no-non-null-assertion': 'off',
    'ts/no-redundant-type-constituents': 'off',
    'ts/no-unnecessary-qualifier': 'error',
    'ts/no-unsafe-argument': 'off',
    'ts/no-unsafe-assignment': 'off',
    'ts/no-unsafe-call': 'off',
    'ts/no-unsafe-member-access': 'off',
    'ts/no-unsafe-return': 'off',
    'ts/prefer-readonly': 'error',
    'ts/prefer-regexp-exec': 'error',
    'ts/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
}

const baseRules: FlatConfig['rules'] = {
    'no-use-before-define': 'off',

    'ts/array-type': ['error', { default: 'array-simple' }],
    'ts/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
    'ts/ban-types': ['error', { types: { Function: false } }],
    'ts/consistent-type-assertions': 'off',
    'ts/consistent-type-definitions': 'off',
    'ts/consistent-type-imports': [
        'error',
        { disallowTypeAnnotations: false, prefer: 'type-imports', fixStyle: 'inline-type-imports' },
    ],
    'ts/dot-notation': 'off',
    'ts/no-confusing-void-expression': 'off',
    'ts/no-dynamic-delete': 'off',
    'ts/no-empty-function': 'off',
    'ts/no-explicit-any': 'off',
    'ts/no-extraneous-class': 'off',
    'ts/no-import-type-side-effects': 'error',
    'ts/no-invalid-void-type': 'off',
    'ts/no-misused-promises': 'off',
    'ts/no-non-null-assertion': 'off',
    'ts/no-redundant-type-constituents': 'off',
    'ts/no-require-imports': 'error',
    'ts/no-unnecessary-condition': 'off',
    'ts/no-unused-expressions': 'error',
    'ts/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
    'ts/no-useless-constructor': 'off',
    'ts/no-useless-empty-export': 'error',
    'ts/no-var-requires': 'off',
    'ts/triple-slash-reference': 'off',
    'ts/unified-signatures': 'off',
}

export function typescript(options: TypescriptOptions = {}): FlatConfig[] {
    const { componentExts = [], tsconfigRootDir = process.cwd() } = options
    const files = [GLOB_SRC, ...componentExts.map((ext) => `**/*.${ext}`)]
    const tsconfigPath = options.tsconfigPath ? toArray(options.tsconfigPath) : ['tsconfig.json']
    const fullTsConfigPaths = tsconfigPath.map((path) => join(tsconfigRootDir, path))
    const isTsConfigExists = fullTsConfigPaths.every((path) => existsSync(path))

    return [
        { plugins: { import: pluginImport, ts: pluginTypescript } },
        {
            files,
            languageOptions: {
                parser: parserTypescript,
                parserOptions: {
                    extraFileExtensions: componentExts.map((ext) => `.${ext}`),
                    sourceType: 'module',
                    warnOnUnsupportedTypeScriptVersion: false,
                },
            },
            rules: {
                ...pluginImport.configs.typescript.rules,
                ...renameRules(pluginTypescript.configs['eslint-recommended'].overrides?.[0].rules as any, '@typescript-eslint/', 'ts/'),
                ...renameRules(pluginTypescript.configs.strict.rules!, '@typescript-eslint/', 'ts/'),
                ...renameRules(pluginTypescript.configs.stylistic.rules!, '@typescript-eslint/', 'ts/'),
                ...baseRules,
            },
            settings: {
                ...pluginImport.configs.typescript.settings,
                'import/resolver': {
                    ...pluginImport.configs.typescript.settings['import/resolver'],
                    typescript: isTsConfigExists ? { project: fullTsConfigPaths } : true,
                },
            },
        },
        {
            files: [GLOB_TS, GLOB_TSX],
            languageOptions: {
                parserOptions: {
                    ...(isTsConfigExists ? { project: tsconfigPath, tsconfigRootDir } : {}),
                },
            },
            plugins: { deprecation: pluginDeprecation },
            rules: isTsConfigExists ? {
                ...renameRules(pluginTypescript.configs['strict-type-checked'].rules!, '@typescript-eslint/', 'ts/'),
                ...renameRules(pluginTypescript.configs['stylistic-type-checked'].rules!, '@typescript-eslint/', 'ts/'),
                ...baseRules,
                ...typeAwareRules,
                'deprecation/deprecation': 'error',
            } : {},
        },
        {
            files: ['**/*.d.ts'],
            rules: {
                'eslint-comments/no-unlimited-disable': 'off',
                'import/no-duplicates': 'off',
                'no-restricted-syntax': 'off',
                'unused-imports/no-unused-vars': 'off',
            },
        },
        {
            files: ['**/*.js', '**/*.cjs'],
            rules: {
                'ts/no-require-imports': 'off',
                'ts/no-var-requires': 'off',
            },
        },
    ]
}
