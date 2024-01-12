import type { FlatConfig } from '../types'
import { renameRules } from '../utils'
import { pluginNode } from '../plugins'

export function node(): FlatConfig[] {
    return [
        {
            plugins: { node: pluginNode },
            rules: {
                ...renameRules(pluginNode.configs['flat/recommended'].rules, 'n/', 'node/'),
                'node/handle-callback-err': ['error', '^(err|error)$'],
                'node/no-missing-import': 'off',
                'node/no-missing-require': 'off',
                'node/no-new-require': 'error',
                'node/no-path-concat': 'error',
                'node/no-process-exit': 'off',
                'node/no-unpublished-import': 'off',
                'node/no-unpublished-require': 'off',
                'node/shebang': 'off',
            },
        },
    ]
}
