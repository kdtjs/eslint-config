import type { FlatConfig } from '../types'
import { pluginPromise } from '../plugins'

export function promise(): FlatConfig[] {
    return [
        {
            plugins: { promise: pluginPromise },
            rules: {
                ...pluginPromise.configs.recommended.rules,
                'promise/always-return': 'off',
                'promise/catch-or-return': 'off',
                'promise/no-multiple-resolved': 'error',
            },
        },
    ]
}
