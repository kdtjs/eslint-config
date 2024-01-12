import type { RuleConfig } from '../rule-config'

/**
 * Option.
 */
export interface SortInterfacesOption {
    'custom-groups'?: Record<string, any>
    type?: 'alphabetical' | 'natural' | 'line-length'
    order?: 'asc' | 'desc'
    'ignore-case'?: boolean
    'ignore-pattern'?: string[]
    groups?: any[]
    'partition-by-new-line'?: boolean
}

/**
 * Options.
 */
export type SortInterfacesOptions = [SortInterfacesOption?]

/**
 * Enforce sorted interface properties.
 * @see [sort-interfaces](https://eslint-plugin-perfectionist.azat.io/rules/sort-interfaces)
 */
export type SortInterfacesRuleConfig = RuleConfig<SortInterfacesOptions>

/**
 * Enforce sorted interface properties.
 * @see [sort-interfaces](https://eslint-plugin-perfectionist.azat.io/rules/sort-interfaces)
 */
export interface SortInterfacesRule {

    /**
     * Enforce sorted interface properties.
     * @see [sort-interfaces](https://eslint-plugin-perfectionist.azat.io/rules/sort-interfaces)
     */
    'perfectionist/sort-interfaces': SortInterfacesRuleConfig
}
