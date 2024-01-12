import type { FlatConfig } from '../types'
import { pluginPerfectionist } from '../plugins'

export function perfectionist(): FlatConfig[] {
    return [
        { plugins: { perfectionist: pluginPerfectionist } },
    ]
}
