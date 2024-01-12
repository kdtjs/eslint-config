import { RuleCreator, type RuleWithMeta } from '@typescript-eslint/utils/eslint-utils'
import type { Rule as ESLintRule } from 'eslint'

export type Rule<O extends readonly unknown[], M extends string> = Readonly<RuleWithMeta<O, M>>

export type RuleModule<O extends readonly unknown[]> = ESLintRule.RuleModule & {
    defaultOptions: O
}

export function createRule<O extends readonly unknown[], M extends string>(rule: Rule<O, M>) {
    return RuleCreator.withoutDocs(rule as any) as unknown as RuleModule<O>
}
