import process from 'node:process'
import type { RuleLevel } from '@antfu/eslint-define-config'
import { isPackageExists } from 'local-pkg'
import type { AnyObject, Awaitable, FlatConfig, StyleOptions } from './types'
import { getStylisticRules } from './configs'

export async function combine(...configs: Array<Awaitable<FlatConfig[]>>) {
    return Promise.all(configs).then((configs) => configs.flat())
}

export function renameRule(key: string, from: string, to: string) {
    return key.startsWith(from) ? (to + key.slice(from.length)) : key
}

export function renameRules(rules: AnyObject, from: string, to: string) {
    return Object.fromEntries(Object.entries(rules).map(([key, value]) => [renameRule(key, from, to), value]))
}

export function toArray<T>(input: T | T[]) {
    return Array.isArray(input) ? input : [input]
}

export function resolveOptions<T>(options: T | true | undefined): T {
    return options === true || options === undefined ? {} as T : options
}

export function intersection(a: AnyObject, b: AnyObject, aPrefix: string, bPrefix: string) {
    const aKeys = Object.keys(a).map((i) => renameRule(i, aPrefix, ''))
    const bKeys = new Set(Object.keys(b).map((i) => renameRule(i, bPrefix, '')))

    return Object.fromEntries(
        aKeys.filter((x) => bKeys.has(x)).map((i) => [`${bPrefix}${i}`, a[`${aPrefix}${i}`]]),
    )
}

export function getStylisticOf(plugin: any, name: string, options?: StyleOptions) {
    if (!plugin.rules) {
        return {}
    }

    return intersection(getStylisticRules(options), plugin.rules, '@stylistic/', `${name}/`)
}

type RuleOptionsReplacer = (options: any[], level: RuleLevel) => unknown[] | undefined

export function overrideRuleOptions(rules: AnyObject, overrides: Record<string, RuleOptionsReplacer>) {
    const _rules = { ...rules }

    for (const [key, replacer] of Object.entries(overrides)) {
        const rule = toArray(rules[key])
        const level = rule[0]
        const options = rule.slice(1)

        _rules[key] = [level, ...(replacer(options, level) ?? [])].filter((i) => i !== undefined)
    }

    return _rules
}

export async function ensurePackages(packages: string[], checkExists = true) {
    if (process.env.CI ?? !process.stdout.isTTY) {
        return false
    }

    let nonExistingPackages: string[] = packages

    if (checkExists) {
        nonExistingPackages = packages.filter((i) => !isPackageExists(i))

        if (nonExistingPackages.length === 0) {
            return true
        }
    }

    const { default: prompts } = await import('prompts')

    const { result } = await prompts([
        {
            message: `${nonExistingPackages.length === 1 ? 'Package is' : 'Packages are'} required for this config: ${nonExistingPackages.join(', ')}. Do you want to install them?`,
            name: 'result',
            type: 'confirm',
            initial: true,
        },
    ])

    if (!result) {
        return false
    }

    return import('@antfu/install-pkg').then((i) => i.installPackage(nonExistingPackages, { dev: true })).then(() => true)
}
