import type { RuleOptions } from '@stylistic/eslint-plugin'
import type { FlatConfig, Rules, StyleOptions, WrapRuleConfig } from '../types'
import { pluginAntfu, pluginKDT, pluginStylistic } from '../plugins'
import { renameRules } from '../utils'

type StylisticRuleOptions = WrapRuleConfig<Partial<RuleOptions>>

const lineAroundCommentOptions: RuleOptions['@stylistic/lines-around-comment'][0] = {
    allowArrayStart: true,
    allowBlockStart: true,
    allowClassStart: true,
    allowObjectStart: true,
    beforeBlockComment: true,
    beforeLineComment: true,
}

const paddingLineBetweenStatements = [
    { blankLine: 'never', next: ['break', 'default'], prev: '*' },
    { blankLine: 'never', next: '*', prev: ['break', 'case', 'default'] },
    { blankLine: 'never', next: 'case', prev: 'switch' },
    { blankLine: 'always', next: 'interface', prev: '*' },
    { blankLine: 'always', next: '*', prev: 'interface' },
    { blankLine: 'always', next: 'class', prev: '*' },
    { blankLine: 'always', next: '*', prev: 'class' },
    { blankLine: 'always', next: '*', prev: 'directive' },
    { blankLine: 'always', next: '*', prev: ['do', 'for', 'while'] },
    { blankLine: 'always', next: ['do', 'for', 'while'], prev: '*' },
    { blankLine: 'always', next: '*', prev: 'function' },
    { blankLine: 'always', next: 'function', prev: 'directive' },
    { blankLine: 'always', next: '*', prev: 'if' },
    { blankLine: 'always', next: 'if', prev: '*' },
    { blankLine: 'always', next: '*', prev: ['multiline-block-like', 'multiline-expression'] },
    { blankLine: 'always', next: ['multiline-block-like', 'multiline-expression'], prev: '*' },
    { blankLine: 'always', next: '*', prev: ['multiline-const', 'multiline-let', 'multiline-var'] },
    { blankLine: 'always', next: ['multiline-const', 'multiline-let', 'multiline-var'], prev: '*' },
    { blankLine: 'always', next: 'return', prev: '*' },
    { blankLine: 'always', next: '*', prev: 'switch' },
    { blankLine: 'always', next: 'switch', prev: '*' },
    { blankLine: 'always', next: '*', prev: 'try' },
    { blankLine: 'always', next: 'try', prev: '*' },
    { blankLine: 'always', next: '*', prev: 'with' },
    { blankLine: 'always', next: 'with', prev: '*' },
] as Array<Rules['style/padding-line-between-statements'][0]>

export function getCommaDangleOptions({ commaDangle }: StyleOptions) {
    if (commaDangle === 'es5') {
        return <const>{
            arrays: 'always-multiline',
            exports: 'never',
            functions: 'always-multiline',
            imports: 'never',
            objects: 'always-multiline',
            enums: 'always-multiline',
            generics: 'never',
            tuples: 'never',
        }
    }

    return commaDangle === 'none' ? 'never' : 'always'
}

export function getMaxLenOptions({ printWidth }: StyleOptions): StylisticRuleOptions['@stylistic/max-len'] {
    if (typeof printWidth === 'number') {
        return [
            'error',
            {
                code: printWidth,
                ignoreComments: false,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreTrailingComments: true,
                ignoreUrls: true,
            },
        ]
    }

    return printWidth ? 'error' : 'off'
}

export function createStylisticRules(options: StyleOptions = {}): StylisticRuleOptions {
    const indent = options.useTabs ? 'tab' : options.indent

    const config = pluginStylistic.configs.customize({
        flat: true,
        indent,
        quotes: options.quotes,
        semi: options.semi,
        jsx: true,
        arrowParens: options.arrowParens,
        braceStyle: options.braceStyle,
        blockSpacing: options.blockSpacing,
    })

    return {
        ...config.rules,
        '@stylistic/array-bracket-newline': ['error', 'consistent'],
        '@stylistic/array-element-newline': ['error', 'consistent'],
        '@stylistic/comma-dangle': ['error', getCommaDangleOptions(options)],
        '@stylistic/func-call-spacing': 'error',
        '@stylistic/function-call-argument-newline': ['error', 'consistent'],
        '@stylistic/function-call-spacing': 'error',
        '@stylistic/function-paren-newline': ['error', 'multiline-arguments'],
        '@stylistic/generator-star-spacing': ['error', 'both'],
        '@stylistic/implicit-arrow-linebreak': 'error',
        '@stylistic/jsx-child-element-spacing': 'off',
        '@stylistic/jsx-newline': 'off',
        '@stylistic/jsx-props-no-multi-spaces': 'off',
        '@stylistic/jsx-quotes': ['error', options.jsxQuotes === 'single' ? 'prefer-single' : 'prefer-double'],
        '@stylistic/jsx-self-closing-comp': 'off',
        '@stylistic/jsx-sort-props': 'off',
        '@stylistic/linebreak-style': ['error', options.endOfLine],
        '@stylistic/lines-around-comment': ['error', lineAroundCommentOptions],
        '@stylistic/max-len': getMaxLenOptions(options),
        '@stylistic/multiline-ternary': ['error', 'never'],
        '@stylistic/newline-per-chained-call': 'off',
        '@stylistic/no-confusing-arrow': 'error',
        '@stylistic/no-extra-semi': 'error',
        '@stylistic/nonblock-statement-body-position': ['error', 'below'],
        '@stylistic/object-curly-newline': ['error', { consistent: true, multiline: true }],
        '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
        '@stylistic/one-var-declaration-per-line': 'off',
        '@stylistic/operator-linebreak': ['error', 'after'],
        '@stylistic/padding-line-between-statements': ['error', ...paddingLineBetweenStatements],
        '@stylistic/quote-props': options.quoteProps === 'preserve' ? 'off' : ['error', options.quoteProps],
        '@stylistic/semi-style': 'error',
        '@stylistic/spaced-comment': ['error', 'always', { line: { markers: ['/'] } }],
        '@stylistic/switch-colon-spacing': 'error',
        '@stylistic/wrap-regex': 'off',
    }
}

export function getStylisticRules(options?: StyleOptions, prefix?: string, includes: string[] = []) {
    const rules = renameRules(createStylisticRules(options), '@stylistic/', prefix ?? '@stylistic/')

    if (includes.length === 0) {
        return rules
    }

    return Object.fromEntries(includes.map((name) => [`${prefix}${name}`, rules[`${prefix}${name}`]]))
}

export function stylistic(_: unknown, options: StyleOptions = {}): FlatConfig[] {
    return [
        {
            plugins: { antfu: pluginAntfu, kdt: pluginKDT, style: pluginStylistic },
            rules: {
                ...renameRules(pluginStylistic.configs['disable-legacy'].rules!, '@typescript-eslint/', 'ts/'),
                ...getStylisticRules(options, 'style/'),

                'antfu/if-newline': 'error',

                'kdt/arrow-empty-body-newline': 'error',
                'kdt/import-single-line': 'error',
                'kdt/object-curly-newline': 'error',

                'style/object-curly-newline': 'off',
            },
        },
    ]
}
