import type { RuleConfig } from '../rule-config'

/**
 * Option.
 */
export interface SortObjectsOption {
    'custom-groups'?: Record<string, any>
    'partition-by-comment'?: boolean | string | any[]
    'partition-by-new-line'?: boolean
    'styled-components'?: boolean
    type?: 'alphabetical' | 'natural' | 'line-length'
    order?: 'asc' | 'desc'
    'ignore-case'?: boolean
    'ignore-pattern'?: string[]
    groups?: any[]
}

/**
 * Options.
 */
export type SortObjectsOptions = [SortObjectsOption?]

/**
 * Enforce sorted objects.
 * @see [sort-objects](https://eslint-plugin-perfectionist.azat.io/rules/sort-objects)
 */
export type SortObjectsRuleConfig = RuleConfig<SortObjectsOptions>

/**
 * Enforce sorted objects.
 * @see [sort-objects](https://eslint-plugin-perfectionist.azat.io/rules/sort-objects)
 */
export interface SortObjectsRule {

    /**
     * Enforce sorted objects.
     * @see [sort-objects](https://eslint-plugin-perfectionist.azat.io/rules/sort-objects)
     */
    'perfectionist/sort-objects': SortObjectsRuleConfig
}
