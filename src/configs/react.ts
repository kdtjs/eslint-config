import { isPackageExists } from 'local-pkg'
import type { FlatConfig } from '../types'
import { GLOB_JSX, GLOB_TSX } from '../globs'
import { hasTypeScript } from '../env'
import { pluginReact, pluginReactHooks, pluginReactRefresh } from '../plugins'

export interface ReactOptions {
    typescript?: boolean
}

const ReactRefreshAllowConstantExportPackages = [
    'vite',
]

export function react(options: ReactOptions = {}): FlatConfig[] {
    const { typescript = hasTypeScript } = options
    const isAllowConstantExport = ReactRefreshAllowConstantExportPackages.some((i) => isPackageExists(i))

    return [
        {
            plugins: { 'react': pluginReact, 'react-hooks': pluginReactHooks, 'react-refresh': pluginReactRefresh },
            settings: { react: { version: 'detect' } },
        },
        {
            files: [GLOB_JSX, GLOB_TSX],
            languageOptions: {
                parserOptions: {
                    ecmaFeatures: { jsx: true },
                },
            },
            rules: {
                ...pluginReact.configs.recommended.rules,
                ...pluginReactHooks.configs.recommended.rules,
                'react-refresh/only-export-components': ['warn', { allowConstantExport: isAllowConstantExport }],
                ...typescript ? { 'react/jsx-no-undef': 'off', 'react/prop-type': 'off' } : {},
            },
        },
    ]
}
