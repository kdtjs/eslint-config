import type { RuleConfig } from '../rule-config'

/**
 * Find duplicated classnames.
 * @see [no-duplicated-classnames](no-duplicated-classnames)
 */
export type NoDuplicatedClassnamesRuleConfig = RuleConfig<[]>

/**
 * Find duplicated classnames.
 * @see [no-duplicated-classnames](no-duplicated-classnames)
 */
export interface NoDuplicatedClassnamesRule {

    /**
     * Find duplicated classnames.
     * @see [no-duplicated-classnames](no-duplicated-classnames)
     */
    'unocss/no-duplicated-classnames': NoDuplicatedClassnamesRuleConfig
}
