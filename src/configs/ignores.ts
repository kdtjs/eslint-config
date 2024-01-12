import { GLOB_EXCLUDE } from '../globs'
import type { FlatConfig } from '../types'

export function ignores(): FlatConfig[] {
    return [{ ignores: GLOB_EXCLUDE }]
}
