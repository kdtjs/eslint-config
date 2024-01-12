import { combine, resolveOptions } from './utils'
import type { Awaitable, FlatConfig, StyleOptions } from './types'
import type { OptionsFormatters, TypescriptOptions, VueOptions } from './configs'
import { isInEditor as defaultIsInEditor, hasReact, hasTailwindCSS, hasTypeScript, hasUnocss, hasVue } from './env'
import { availableConfigs, defaultStyle } from './constants'

export interface DefineFlatConfigOptions {
    style?: StyleOptions
    isInEditor?: boolean
    componentExts?: string[]
    comments?: boolean
    formatters?: OptionsFormatters | boolean
    ignores?: boolean
    imports?: boolean
    javascript?: boolean
    jsdoc?: boolean
    jsonc?: boolean
    markdown?: boolean
    node?: boolean
    perfectionist?: boolean
    promise?: boolean
    react?: boolean
    sonarjs?: boolean
    sorts?: boolean
    stylistic?: boolean
    tailwindcss?: boolean
    typescript?: Omit<TypescriptOptions, 'componentExts'> | boolean
    unicorn?: boolean
    unocss?: boolean
    vue?: Omit<VueOptions, 'typescript'> | boolean
}

export async function defineFlatConfig<T extends FlatConfig>(options: DefineFlatConfigOptions = {}, ...userConfigs: T[]) {
    const { style = {}, componentExts = [] } = options
    const styleOptions = { ...defaultStyle, ...style }
    const configs: Array<Awaitable<FlatConfig[]>> = []

    const resolvedOptions = {
        react: resolveOptions(options.react ?? hasReact),
        tailwindcss: resolveOptions(options.tailwindcss ?? hasTailwindCSS),
        typescript: resolveOptions(options.typescript ?? hasTypeScript),
        unocss: resolveOptions(options.unocss ?? hasUnocss),
        vue: resolveOptions(options.vue ?? hasVue),
    }

    const isInEditor = options.isInEditor ?? defaultIsInEditor
    const typescript = Boolean(resolvedOptions.typescript)

    if (resolvedOptions.vue) {
        componentExts.push('vue')
    }

    for (const [key, config] of Object.entries(availableConfigs)) {
        const configOptions = key in resolvedOptions ? resolvedOptions[key] : resolveOptions(options[key])

        if (configOptions) {
            configs.push(config({ ...configOptions, componentExts, typescript, isInEditor }, styleOptions))
        }
    }

    return combine(...configs, userConfigs)
}
