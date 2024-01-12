import type { FlatESLintConfigItem, MergeIntersection, RuleConfig } from '@antfu/eslint-define-config'
import type { Rules } from './rules'

export type WrapRuleConfig<T extends Record<string, any>> = {
    [K in keyof T]: T[K] extends RuleConfig ? T[K] : RuleConfig<T[K]>
}

export type RulesConfig = WrapRuleConfig<MergeIntersection<Rules>>

export type FlatConfig = Omit<FlatESLintConfigItem<RulesConfig>, 'plugins'> & {
    plugins?: Record<string, any>
}
