import type { RuleConfig } from '../rule-config'

/**
 * Option.
 */
export type NoUnusedVarsTsOption =
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
export type NoUnusedVarsTsOptions = [NoUnusedVarsTsOption?]

/**
 * Disallow unused variables.
 * @see [no-unused-vars-ts](https://github.com/sweepline/eslint-plugin-unused-imports/blob/master/docs/rules/no-unused-imports.md)
 */
export type NoUnusedVarsTsRuleConfig = RuleConfig<NoUnusedVarsTsOptions>

/**
 * Disallow unused variables.
 * @see [no-unused-vars-ts](https://github.com/sweepline/eslint-plugin-unused-imports/blob/master/docs/rules/no-unused-imports.md)
 */
export interface NoUnusedVarsTsRule {

    /**
     * Disallow unused variables.
     * @see [no-unused-vars-ts](https://github.com/sweepline/eslint-plugin-unused-imports/blob/master/docs/rules/no-unused-imports.md)
     */
    'unused-imports/no-unused-vars-ts': NoUnusedVarsTsRuleConfig
}
