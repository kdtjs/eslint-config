import type { RuleConfig } from '../rule-config'

/**
 * Option.
 */
export type NoUnusedImportsOption =
  | ('all' | 'local')
  | {
      vars?: 'all' | 'local'
      varsIgnorePattern?: string
      args?: 'all' | 'after-used' | 'none'
      ignoreRestSiblings?: boolean
      argsIgnorePattern?: string
      caughtErrors?: 'all' | 'none'
      caughtErrorsIgnorePattern?: string
      destructuredArrayIgnorePattern?: string
  }

/**
 * Options.
 */
export type NoUnusedImportsOptions = [NoUnusedImportsOption?]

/**
 * Disallow unused variables.
 * @see [no-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports/blob/master/docs/rules/no-unused-imports.md)
 */
export type NoUnusedImportsRuleConfig = RuleConfig<NoUnusedImportsOptions>

/**
 * Disallow unused variables.
 * @see [no-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports/blob/master/docs/rules/no-unused-imports.md)
 */
export interface NoUnusedImportsRule {

    /**
     * Disallow unused variables.
     * @see [no-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports/blob/master/docs/rules/no-unused-imports.md)
     */
    'unused-imports/no-unused-imports': NoUnusedImportsRuleConfig
}
