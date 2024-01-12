import { isPackageExists } from 'local-pkg'
import type { FlatConfig, PrettierOptions, StyleOptions } from '../types'
import { GLOB_CSS, GLOB_GRAPHQL, GLOB_HTML, GLOB_LESS, GLOB_MARKDOWN, GLOB_MDX, GLOB_POSTCSS, GLOB_SCSS, GLOB_TOML, GLOB_YAML } from '../globs'
import { parserPlain, pluginFormat } from '../plugins'
import { ensurePackages, resolveOptions } from '../utils'

export interface FormatterParser {
    files: string[]
    parser: string
    prettierOptions?: PrettierOptions
    rules?: FlatConfig['rules']
}

export type FormatterParserObject = Record<string, [string[], PrettierOptions?, FlatConfig['rules']?]>

export type FormatterParsers = FormatterParserObject | FormatterParser[]

export const defaultFormatterParsers = {
    css: [[GLOB_CSS, GLOB_POSTCSS]],
    graphql: [[GLOB_GRAPHQL]],
    html: [[GLOB_HTML]],
    less: [[GLOB_LESS]],
    markdown: [[GLOB_MARKDOWN], { embeddedLanguageFormatting: 'off' }],
    mdx: [[GLOB_MDX]],
    scss: [[GLOB_SCSS]],
    toml: [[GLOB_TOML], { plugins: ['prettier-plugin-toml'] }],
    yaml: [[GLOB_YAML]],
} satisfies FormatterParserObject

export type DefaultFormatterParsers = keyof typeof defaultFormatterParsers

export type OptionsFormatters = { parsers?: FormatterParsers } & {
    [K in DefaultFormatterParsers]?: Partial<FormatterParser> | boolean
}

export function getPrintWidth({ printWidth }: StyleOptions) {
    return printWidth === false ? Number.POSITIVE_INFINITY : (printWidth === true ? undefined : printWidth)
}

export const toPrettierOptions = (options: StyleOptions = {}): PrettierOptions => ({
    arrowParens: options.arrowParens ? 'always' : 'avoid',
    bracketSameLine: options.bracketSameLine,
    bracketSpacing: options.blockSpacing,
    endOfLine: options.endOfLine === 'windows' ? 'crlf' : 'lf',
    htmlWhitespaceSensitivity: options.htmlWhitespaceSensitivity,
    jsxSingleQuote: options.jsxQuotes === 'single',
    printWidth: getPrintWidth(options),
    quoteProps: options.quoteProps,
    semi: options.semi,
    singleAttributePerLine: options.singleAttributePerLine,
    singleQuote: options.quotes === 'single',
    tabWidth: options.indent,
    trailingComma: options.commaDangle,
    useTabs: options.useTabs,
    vueIndentScriptAndStyle: options.vueIndentScriptAndStyle,
})

export const toFormatterParser = (parser: string, config: FormatterParserObject[string]): FormatterParser => ({
    parser,
    files: config[0],
    prettierOptions: config[1],
    rules: config[2],
})

export function resolveFormatterParsers(parsers: FormatterParsers): FormatterParser[] {
    if (Array.isArray(parsers)) {
        return parsers
    }

    return Object.entries(parsers).map(([parser, config]) => toFormatterParser(parser, config))
}

export function resolveDefaultFormatterParsers(options: OptionsFormatters) {
    const parsers: FormatterParser[] = []

    for (const [parser, config] of Object.entries(defaultFormatterParsers)) {
        const resolved = resolveOptions(options[parser as DefaultFormatterParsers])

        if (resolved !== false) {
            parsers.push({ ...toFormatterParser(parser, config), ...resolved })
        }
    }

    return parsers
}

export async function formatters(options: OptionsFormatters = {}, styleOptions: StyleOptions = {}) {
    const prettierOptions = toPrettierOptions(styleOptions)

    const createConfig = ({ files, parser, prettierOptions: opts, rules = {} }: FormatterParser): FlatConfig => ({
        files,
        languageOptions: { parser: parserPlain },
        rules: {
            'style/max-len': 'off',
            'format/prettier': ['error', { ...prettierOptions, ...opts, parser }],
            ...rules,
        },
    })

    const parsers: FormatterParser[] = [
        ...resolveDefaultFormatterParsers(options),
        ...resolveFormatterParsers(options.parsers ?? []),
    ]

    const configs: FlatConfig[] = []
    const requiredPackages = new Set<string>()

    for (const parser of parsers) {
        let uninstalledPackages: string[] = []

        if (parser.prettierOptions?.plugins?.length) {
            uninstalledPackages = parser.prettierOptions.plugins.filter((plugin: string) => !isPackageExists(plugin))
        }

        if (uninstalledPackages.length > 0) {
            if (parser.parser in defaultFormatterParsers && options[parser.parser] === undefined) {
                continue
            }

            for (const pkg of uninstalledPackages) {
                requiredPackages.add(pkg)
            }
        }

        configs.push(createConfig(parser))
    }

    if (requiredPackages.size > 0 && !(await ensurePackages([...requiredPackages], false))) {
        throw new Error('Install required plugins or remove them in the configuration')
    }

    return [{ plugins: { format: pluginFormat } }, ...Object.values(configs)]
}
