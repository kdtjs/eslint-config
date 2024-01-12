import type { RuleConfig } from '../rule-config'

/**
 * Option.
 */
export interface MigrationFromTailwind_2Option {
    callees?: string[]
    ignoredKeys?: string[]
    config?:
        | string
        | Record<string, any>
    tags?: string[]

    [k: string]: any
}

/**
 * Options.
 */
export type MigrationFromTailwind_2Options = [MigrationFromTailwind_2Option?]

/**
 * Detect obsolete classnames when upgrading to Tailwind CSS v3.
 * @see [migration-from-tailwind-2](https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master/docs/rules/migration-from-tailwind-2.md)
 */
export type MigrationFromTailwind_2RuleConfig =
    RuleConfig<MigrationFromTailwind_2Options>

/**
 * Detect obsolete classnames when upgrading to Tailwind CSS v3.
 * @see [migration-from-tailwind-2](https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master/docs/rules/migration-from-tailwind-2.md)
 */
export interface MigrationFromTailwind_2Rule {

    /**
     * Detect obsolete classnames when upgrading to Tailwind CSS v3.
     * @see [migration-from-tailwind-2](https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master/docs/rules/migration-from-tailwind-2.md)
     */
    'tailwindcss/migration-from-tailwind-2': MigrationFromTailwind_2RuleConfig
}
