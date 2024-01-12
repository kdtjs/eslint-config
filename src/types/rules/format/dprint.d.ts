import type { RuleConfig } from '../rule-config'

/**
 * Option.
 */
export interface DprintOption {
    language?: string
    languageOptions?: Record<string, any>

    [k: string]: any
}

/**
 * Options.
 */
export type DprintOptions = [DprintOption?]

/**
 * Use dprint to format code.
 *
 */
export type DprintRuleConfig = RuleConfig<DprintOptions>

/**
 * Use dprint to format code.
 *
 */
export interface DprintRule {

    /**
     * Use dprint to format code.
     *
     */
    'format/dprint': DprintRuleConfig
}
