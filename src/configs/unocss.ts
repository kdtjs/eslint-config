import type { FlatConfig } from '../types'
import { pluginUnoCSS } from '../plugins'

export function unocss(): FlatConfig[] {
    return [pluginUnoCSS.configs.flat]
}
