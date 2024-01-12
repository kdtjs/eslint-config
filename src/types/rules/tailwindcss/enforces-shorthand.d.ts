import type { RuleConfig } from '../rule-config'

/**
 * Option.
 */
export interface EnforcesShorthandOption {
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
export type EnforcesShorthandOptions = [EnforcesShorthandOption?]

/**
 * Enforces the usage of shorthand Tailwind CSS classnames.
 * @see [enforces-shorthand](https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master/docs/rules/enforces-shorthand.md)
 */
export type EnforcesShorthandRuleConfig = RuleConfig<EnforcesShorthandOptions>

/**
 * Enforces the usage of shorthand Tailwind CSS classnames.
 * @see [enforces-shorthand](https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master/docs/rules/enforces-shorthand.md)
 */
export interface EnforcesShorthandRule {

    /**
     * Enforces the usage of shorthand Tailwind CSS classnames.
     * @see [enforces-shorthand](https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master/docs/rules/enforces-shorthand.md)
     */
    'tailwindcss/enforces-shorthand': EnforcesShorthandRuleConfig
}
