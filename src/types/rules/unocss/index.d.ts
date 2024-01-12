import type { ClassnamesOrderRule } from './classnames-order'
import type { NoDuplicatedClassnamesRule } from './no-duplicated-classnames'
import type { NoExcessiveWhitespacesRule } from './no-excessive-whitespaces'

/**
 * All UnoCss rules.
 */
export type UnoCssRules = ClassnamesOrderRule &
    NoDuplicatedClassnamesRule &
    NoExcessiveWhitespacesRule
