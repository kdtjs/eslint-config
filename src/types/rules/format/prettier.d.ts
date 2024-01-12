import type { RuleConfig } from '../rule-config'

/**
 * Option.
 */
export interface PrettierOption {
    parser?: string
    [k: string]: any
}

/**
 * Options.
 */
export type PrettierOptions = [PrettierOption?]

/**
 * Use Prettier to format code.
 *
 */
export type PrettierRuleConfig = RuleConfig<PrettierOptions>

/**
 * Use Prettier to format code.
 *
 */
export interface PrettierRule {

    /**
     * Use Prettier to format code.
     *
     */
    'format/prettier': PrettierRuleConfig
}
