import type { RuleConfig } from '../rule-config'

/**
 * Option.
 */
export type NoUnusedVarsOption =
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
export type NoUnusedVarsOptions = [NoUnusedVarsOption?]

/**
 * Disallow unused variables.
 * @see [no-unused-vars](https://github.com/sweepline/eslint-plugin-unused-imports/blob/master/docs/rules/no-unused-imports.md)
 */
export type NoUnusedVarsRuleConfig = RuleConfig<NoUnusedVarsOptions>

/**
 * Disallow unused variables.
 * @see [no-unused-vars](https://github.com/sweepline/eslint-plugin-unused-imports/blob/master/docs/rules/no-unused-imports.md)
 */
export interface NoUnusedVarsRule {

    /**
     * Disallow unused variables.
     * @see [no-unused-vars](https://github.com/sweepline/eslint-plugin-unused-imports/blob/master/docs/rules/no-unused-imports.md)
     */
    'unused-imports/no-unused-vars': NoUnusedVarsRuleConfig
}
