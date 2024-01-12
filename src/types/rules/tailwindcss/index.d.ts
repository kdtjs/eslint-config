import type { ClassnamesOrderRule } from './classnames-order'
import type { EnforcesNegativeArbitraryValuesRule } from './enforces-negative-arbitrary-values'
import type { EnforcesShorthandRule } from './enforces-shorthand'
import type { MigrationFromTailwind_2Rule } from './migration-from-tailwind-2'
import type { NoArbitraryValueRule } from './no-arbitrary-value'
import type { NoContradictingClassnameRule } from './no-contradicting-classname'
import type { NoCustomClassnameRule } from './no-custom-classname'

/**
 * All TailwindCss rules.
 */
export type TailwindCssRules = ClassnamesOrderRule &
    EnforcesNegativeArbitraryValuesRule &
    EnforcesShorthandRule &
    MigrationFromTailwind_2Rule &
    NoArbitraryValueRule &
    NoContradictingClassnameRule &
    NoCustomClassnameRule
