import type { RuleConfig } from '../rule-config'

/**
 * Option.
 */
export interface NoCustomClassnameOption {
    callees?: string[]
    ignoredKeys?: string[]
    config?:
        | string
        | Record<string, any>
    cssFiles?: string[]
    cssFilesRefreshRate?: number
    tags?: string[]
    whitelist?: string[]

    [k: string]: any
}

/**
 * Options.
 */
export type NoCustomClassnameOptions = [NoCustomClassnameOption?]

/**
 * Detect classnames which do not belong to Tailwind CSS.
 * @see [no-custom-classname](https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master/docs/rules/no-custom-classname.md)
 */
export type NoCustomClassnameRuleConfig = RuleConfig<NoCustomClassnameOptions>

/**
 * Detect classnames which do not belong to Tailwind CSS.
 * @see [no-custom-classname](https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master/docs/rules/no-custom-classname.md)
 */
export interface NoCustomClassnameRule {

    /**
     * Detect classnames which do not belong to Tailwind CSS.
     * @see [no-custom-classname](https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master/docs/rules/no-custom-classname.md)
     */
    'tailwindcss/no-custom-classname': NoCustomClassnameRuleConfig
}
