import type { RuleConfig } from '../rule-config'

/**
 * Option.
 */
export type SortImports = MaxLineLengthRequiresLineLengthType & {
    'custom-groups'?: {
        type?: Record<string, any>
        value?: Record<string, any>
    }
    type?: 'alphabetical' | 'natural' | 'line-length'
    order?: 'asc' | 'desc'
    'ignore-case'?: boolean
    groups?: any[]
    'internal-pattern'?: string[]
    'newlines-between'?: 'ignore' | 'always' | 'never'
    'max-line-length'?: number
}
export type MaxLineLengthRequiresLineLengthType =
    | Record<string, any>
    | IsLineLength

export interface IsLineLength {
    type: 'line-length'
    [k: string]: any
}

/**
 * Options.
 */
export type SortImportsOptions = [SortImportsOption?]

/**
 * Enforce sorted imports.
 * @see [sort-imports](https://eslint-plugin-perfectionist.azat.io/rules/sort-imports)
 */
export type SortImportsRuleConfig = RuleConfig<SortImportsOptions>

/**
 * Enforce sorted imports.
 * @see [sort-imports](https://eslint-plugin-perfectionist.azat.io/rules/sort-imports)
 */
export interface SortImportsRule {

    /**
     * Enforce sorted imports.
     * @see [sort-imports](https://eslint-plugin-perfectionist.azat.io/rules/sort-imports)
     */
    'perfectionist/sort-imports': SortImportsRuleConfig
}
