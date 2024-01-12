import type { FlatConfig } from '../types'
import { hasTypeScript } from '../env'
import { pluginJSDoc } from '../plugins'

export interface JSDocOptions {
    typescript?: boolean
}

export function jsdoc(options: JSDocOptions = {}): FlatConfig[] {
    const { typescript = hasTypeScript } = options

    return [
        {
            plugins: { jsdoc: pluginJSDoc },
            rules: {
                ...pluginJSDoc.configs[typescript ? 'flat/recommended-typescript' : 'flat/recommended'].rules,
                'jsdoc/require-jsdoc': 'off',
            },
        },
    ]
}
