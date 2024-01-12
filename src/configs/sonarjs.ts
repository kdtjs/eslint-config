import type { FlatConfig } from '../types'
import { pluginSonarJs } from '../plugins'

export function sonarjs(): FlatConfig[] {
    return [
        {
            plugins: { sonarjs: pluginSonarJs },
            rules: {
                ...pluginSonarJs.configs.recommended.rules,
                'sonarjs/cognitive-complexity': 'off',
                'sonarjs/no-duplicate-string': 'off',
            },
        },
    ]
}
