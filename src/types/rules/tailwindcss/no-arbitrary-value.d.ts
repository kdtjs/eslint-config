import type { RuleConfig } from '../rule-config'

/**
 * Option.
 */
export interface NoArbitraryValueOption {
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
export type NoArbitraryValueOptions = [NoArbitraryValueOption?]

/**
 * Forbid using arbitrary values in classnames.
 * @see [no-arbitrary-value](https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master/docs/rules/no-arbitrary-value.md)
 */
export type NoArbitraryValueRuleConfig = RuleConfig<NoArbitraryValueOptions>

/**
 * Forbid using arbitrary values in classnames.
 * @see [no-arbitrary-value](https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master/docs/rules/no-arbitrary-value.md)
 */
export interface NoArbitraryValueRule {

    /**
     * Forbid using arbitrary values in classnames.
     * @see [no-arbitrary-value](https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master/docs/rules/no-arbitrary-value.md)
     */
    'tailwindcss/no-arbitrary-value': NoArbitraryValueRuleConfig
}
