import type { NoUnusedImportsRule } from './no-unused-imports'
import type { NoUnusedImportsTsRule } from './no-unused-imports-ts'
import type { NoUnusedVarsRule } from './no-unused-vars'
import type { NoUnusedVarsTsRule } from './no-unused-vars-ts'

/**
 * All UnusedImports rules.
 */
export type UnusedImportsRules = NoUnusedVarsRule & NoUnusedImportsRule & NoUnusedVarsTsRule & NoUnusedImportsTsRule
