import { renameRules } from '../utils'
import type { FlatConfig } from '../types'
import { pluginComments } from '../plugins'

export function comments(): FlatConfig[] {
    return [
        {
            plugins: { comments: pluginComments },
            rules: renameRules(pluginComments.configs.recommended.rules, 'eslint-comments/', 'comments/'),
        },
    ]
}
