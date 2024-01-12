import type { RuleConfig } from '../rule-config'

/**
 * Option.
 */
export interface ClassnamesOrderOption {
    callees?: string[]
    ignoredKeys?: string[]
    config?:
        | string
        | Record<string, any>
    removeDuplicates?: boolean
    tags?: string[]

    [k: string]: any
}

/**
 * Options.
 */
export type ClassnamesOrderOptions = [ClassnamesOrderOption?]

/**
 * Enforce a consistent and logical order of the Tailwind CSS classnames.
 * @see [classnames-order](https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master/docs/rules/classnames-order.md)
 */
export type ClassnamesOrderRuleConfig = RuleConfig<ClassnamesOrderOptions>

/**
 * Enforce a consistent and logical order of the Tailwind CSS classnames.
 * @see [classnames-order](https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master/docs/rules/classnames-order.md)
 */
export interface ClassnamesOrderRule {

    /**
     * Enforce a consistent and logical order of the Tailwind CSS classnames.
     * @see [classnames-order](https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master/docs/rules/classnames-order.md)
     */
    'tailwindcss/classnames-order': ClassnamesOrderRuleConfig
}
