import type { DprintRule } from './dprint'
import type { PrettierRule } from './prettier'

/**
 * All Format rules.
 */
export type FormatRules = PrettierRule & DprintRule
