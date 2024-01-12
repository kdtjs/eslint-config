import type { RuleConfig } from '../rule-config'

/**
 * Option.
 */
export interface NoContradictingClassnameOption {
    callees?: string[]
    ignoredKeys?: string[]
    config?:
        | string
        | Record<string, any>
    tags?: string[]

    [k: string]: any
}

/**
 * Options.
 */
export type NoContradictingClassnameOptions = [NoContradictingClassnameOption?]

/**
 * Avoid contradicting Tailwind CSS classnames (e.g. "w-3 w-5").
 * @see [no-contradicting-classname](https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master/docs/rules/no-contradicting-classname.md)
 */
export type NoContradictingClassnameRuleConfig =
    RuleConfig<NoContradictingClassnameOptions>

/**
 * Avoid contradicting Tailwind CSS classnames (e.g. "w-3 w-5").
 * @see [no-contradicting-classname](https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master/docs/rules/no-contradicting-classname.md)
 */
export interface NoContradictingClassnameRule {

    /**
     * Avoid contradicting Tailwind CSS classnames (e.g. "w-3 w-5").
     * @see [no-contradicting-classname](https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master/docs/rules/no-contradicting-classname.md)
     */
    'tailwindcss/no-contradicting-classname': NoContradictingClassnameRuleConfig
}
