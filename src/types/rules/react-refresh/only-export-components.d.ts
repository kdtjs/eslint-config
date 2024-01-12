import type { RuleConfig } from '../rule-config'

/**
 * Option.
 */
export interface OnlyExportComponentsOption {
    allowConstantExport?: boolean
    checkJS?: boolean
    allowExportNames?: string[]
}

/**
 * Options.
 */
export type OnlyExportComponentsOptions = [OnlyExportComponentsOption?]

/**
 *
 */
export type OnlyExportComponentsRuleConfig =
  RuleConfig<OnlyExportComponentsOptions>

/**
 *
 */
export interface OnlyExportComponentsRule {

    /**
     *
     */
    'react-refresh/only-export-components': OnlyExportComponentsRuleConfig
}
