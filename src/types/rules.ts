import type { DeprecationRules, EslintCommentsRules, EslintRules, ImportRules, JSDocRules, JsoncRules, NodeRules, Prefix, PromiseRules, ReactHooksRules, ReactRules, RenamePrefix, SonarJSRules, TypeScriptRules, UnicornRules, VueRules } from '@antfu/eslint-define-config'
import type { RuleOptions } from '@stylistic/eslint-plugin'
import type { RuleOptions as AntfuRules } from 'eslint-plugin-antfu'
import type { KDTRuleOptions } from '../plugins/kdt'
import type { FormatRules } from './rules/format'
import type { UnusedImportsRules } from './rules/unused-imports'
import type { PerfectionistRules } from './rules/perfectionist'
import type { ReactRefreshRules } from './rules/react-refresh'
import type { TailwindCssRules } from './rules/tailwindcss'
import type { UnoCssRules } from './rules/unocss'

export type StylisticRules = RenamePrefix<RuleOptions, '@stylistic', 'style'>

export type TsRules = RenamePrefix<TypeScriptRules, '@typescript-eslint', 'ts'>

export type Rules =
    EslintRules &
    Prefix<AntfuRules, 'antfu/'> &
    EslintCommentsRules &
    DeprecationRules &
    FormatRules &
    ImportRules &
    JSDocRules &
    JsoncRules &
    Prefix<KDTRuleOptions, 'kdt/'> &
    NodeRules &
    PerfectionistRules &
    PromiseRules &
    ReactRules &
    ReactHooksRules &
    ReactRefreshRules &
    SonarJSRules &
    StylisticRules &
    TailwindCssRules &
    TsRules &
    UnicornRules &
    UnoCssRules &
    UnusedImportsRules &
    VueRules
