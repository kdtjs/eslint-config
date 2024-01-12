import type { RuleConfig } from '../rule-config'

/**
 * Option.
 */
export type NoUnusedImportsTsOption =
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
export type NoUnusedImportsTsOptions = [NoUnusedImportsTsOption?]

/**
 * Disallow unused variables.
 * @see [no-unused-imports-ts](https://github.com/sweepline/eslint-plugin-unused-imports/blob/master/docs/rules/no-unused-imports.md)
 */
export type NoUnusedImportsTsRuleConfig = RuleConfig<NoUnusedImportsTsOptions>

/**
 * Disallow unused variables.
 * @see [no-unused-imports-ts](https://github.com/sweepline/eslint-plugin-unused-imports/blob/master/docs/rules/no-unused-imports.md)
 */
export interface NoUnusedImportsTsRule {

    /**
     * Disallow unused variables.
     * @see [no-unused-imports-ts](https://github.com/sweepline/eslint-plugin-unused-imports/blob/master/docs/rules/no-unused-imports.md)
     */
    'unused-imports/no-unused-imports-ts': NoUnusedImportsTsRuleConfig
}
