import type { RuleConfig } from '../rule-config'

/**
 * Find excessive whitespaces in classnames.
 * @see [no-excessive-whitespaces](no-excessive-whitespaces)
 */
export type NoExcessiveWhitespacesRuleConfig = RuleConfig<[]>

/**
 * Find excessive whitespaces in classnames.
 * @see [no-excessive-whitespaces](no-excessive-whitespaces)
 */
export interface NoExcessiveWhitespacesRule {

    /**
     * Find excessive whitespaces in classnames.
     * @see [no-excessive-whitespaces](no-excessive-whitespaces)
     */
    'unocss/no-excessive-whitespaces': NoExcessiveWhitespacesRuleConfig
}
