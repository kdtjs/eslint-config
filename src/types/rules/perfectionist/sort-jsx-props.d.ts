import type { RuleConfig } from '../rule-config'

/**
 * Option.
 */
export interface SortJsxPropsOption {
    'custom-groups'?: Record<string, any>
    type?: 'alphabetical' | 'natural' | 'line-length'
    order?: 'asc' | 'desc'
    groups?: any[]
    'ignore-case'?: boolean
}

/**
 * Options.
 */
export type SortJsxPropsOptions = [SortJsxPropsOption?]

/**
 * Enforce sorted JSX props.
 * @see [sort-jsx-props](https://eslint-plugin-perfectionist.azat.io/rules/sort-jsx-props)
 */
export type SortJsxPropsRuleConfig = RuleConfig<SortJsxPropsOptions>

/**
 * Enforce sorted JSX props.
 * @see [sort-jsx-props](https://eslint-plugin-perfectionist.azat.io/rules/sort-jsx-props)
 */
export interface SortJsxPropsRule {

    /**
     * Enforce sorted JSX props.
     * @see [sort-jsx-props](https://eslint-plugin-perfectionist.azat.io/rules/sort-jsx-props)
     */
    'perfectionist/sort-jsx-props': SortJsxPropsRuleConfig
}
