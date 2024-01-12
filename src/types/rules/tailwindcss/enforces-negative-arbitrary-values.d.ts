import type { RuleConfig } from '../rule-config'

/**
 * Option.
 */
export interface EnforcesNegativeArbitraryValuesOption {
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
export type EnforcesNegativeArbitraryValuesOptions = [
    EnforcesNegativeArbitraryValuesOption?
]

/**
 * Warns about dash prefixed classnames using arbitrary values.
 * @see [enforces-negative-arbitrary-values](https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master/docs/rules/enforces-negative-arbitrary-values.md)
 */
export type EnforcesNegativeArbitraryValuesRuleConfig =
    RuleConfig<EnforcesNegativeArbitraryValuesOptions>

/**
 * Warns about dash prefixed classnames using arbitrary values.
 * @see [enforces-negative-arbitrary-values](https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master/docs/rules/enforces-negative-arbitrary-values.md)
 */
export interface EnforcesNegativeArbitraryValuesRule {

    /**
     * Warns about dash prefixed classnames using arbitrary values.
     * @see [enforces-negative-arbitrary-values](https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master/docs/rules/enforces-negative-arbitrary-values.md)
     */
    'tailwindcss/enforces-negative-arbitrary-values': EnforcesNegativeArbitraryValuesRuleConfig
}
