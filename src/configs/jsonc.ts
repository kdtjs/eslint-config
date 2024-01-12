import type { FlatConfig, StyleOptions } from '../types'
import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from '../globs'
import { parserJsonc, pluginJsonc } from '../plugins'
import { getStylisticOf } from '../utils'

export function jsonc(_: unknown, styleOptions: StyleOptions = {}): FlatConfig[] {
    const files = [GLOB_JSON, GLOB_JSONC, GLOB_JSON5]

    return [
        { plugins: { jsonc: pluginJsonc } },
        { files, languageOptions: { parser: parserJsonc }, rules: pluginJsonc.configs.base.overrides[0].rules as any },
        { files: [GLOB_JSON], rules: pluginJsonc.configs['recommended-with-json'].rules as any },
        { files: [GLOB_JSON5], rules: pluginJsonc.configs['recommended-with-json5'].rules as any },
        { files: [GLOB_JSONC], rules: pluginJsonc.configs['recommended-with-jsonc'].rules as any },
        {
            files,
            rules: {
                ...getStylisticOf(pluginJsonc, 'jsonc', styleOptions),
                'jsonc/comma-dangle': ['error', 'never'],
                'jsonc/quotes': ['error', 'double'],
            },
        },
    ]
}
