import type { Options } from 'eslint-processor-vue-blocks'
import processor from 'eslint-processor-vue-blocks'
import type { Linter } from 'eslint'
import { getPackageInfo } from 'local-pkg'
import semver from 'semver'
import { mergeProcessors } from 'eslint-merge-processors'
import type { VueRules } from '@antfu/eslint-define-config'
import type { FlatConfig, StyleOptions, WrapRuleConfig } from '../types'
import { getStylisticOf, intersection, resolveOptions } from '../utils'
import { GLOB_VUE } from '../globs'
import { parserTypescript, parserVue, pluginVue } from '../plugins'
import { hasTypeScript } from '../env'
import { javascriptRules } from './javascript'

export interface VueOptions {
    version?: 2 | 3
    sfcBlocks?: boolean | Options
    typescript?: boolean
}

type Rules = WrapRuleConfig<VueRules>

async function getVueVersion() {
    return getPackageInfo('vue').then((info) => info?.version)
}

function isVersion3(version?: string) {
    return version && semver.gte(version, '3.0.0') && semver.lt(version, '4.0.0')
}

function getProcessor(options: Options | false): Linter.Processor {
    if (options === false) {
        return pluginVue.processors['.vue']
    }

    const { blocks = {}, ...rest } = options
    const { styles = true, ...blocksRest } = blocks

    return mergeProcessors([pluginVue.processors['.vue'], processor({ ...rest, blocks: { ...blocksRest, styles } })])
}

const vueMaxLenOptions = {
    ignoreHTMLAttributeValues: true,
    ignoreHTMLTextContents: true,
}

function getMaxAttributesPerLineOpts({ singleAttributePerLine }: StyleOptions): Rules['vue/max-attributes-per-line'] {
    if (!singleAttributePerLine) {
        return 'off'
    }

    return ['error', { multiline: { max: 1 }, singleline: { max: 1 } }]
}

const vue3Rules: FlatConfig['rules'] = {
    ...pluginVue.configs.base.rules,
    ...pluginVue.configs['vue3-essential'].rules,
    ...pluginVue.configs['vue3-strongly-recommended'].rules,
    ...pluginVue.configs['vue3-recommended'].rules,
}

const vue2Rules: FlatConfig['rules'] = {
    ...pluginVue.configs.base.rules,
    ...pluginVue.configs.essential.rules,
    ...pluginVue.configs['strongly-recommended'].rules,
    ...pluginVue.configs.recommended.rules,
}

export async function vue(options: VueOptions = {}, styleOptions: StyleOptions = {}): Promise<FlatConfig[]> {
    const { typescript = hasTypeScript } = options
    const sfcBlocks = resolveOptions(options.sfcBlocks ?? true)
    const typescriptParser = typescript ? parserTypescript as any : undefined
    const version = options.version ? undefined : await getVueVersion()
    const isVue3 = options.version ? options.version === 3 : isVersion3(version)
    const stylisticRules = getStylisticOf(pluginVue, 'vue', styleOptions)
    const jsRules = intersection(javascriptRules, pluginVue.rules, '', 'vue/')

    if (Array.isArray(stylisticRules['vue/max-len']) && typeof stylisticRules['vue/max-len'][1] === 'object') {
        stylisticRules['vue/max-len'][1] = { ...stylisticRules['vue/max-len'][1], ...vueMaxLenOptions }
    }

    const indent = styleOptions.useTabs ? 'tab' : styleOptions.indent
    const baseScriptIndent = styleOptions.vueIndentScriptAndStyle ? 1 : 0

    return [
        { plugins: { vue: pluginVue } },
        {
            files: [GLOB_VUE],
            languageOptions: {
                parser: parserVue,
                parserOptions: {
                    ecmaFeatures: {
                        jsx: true,
                    },
                    extraFileExtensions: ['.vue'],
                    parser: typescriptParser,
                    sourceType: 'module',
                },
            },
            processor: getProcessor(sfcBlocks),
            rules: {
                ...(isVue3 ? vue3Rules : vue2Rules),
                ...stylisticRules,
                ...jsRules,
                'style/indent': 'off',
                'style/max-len': 'off',

                'vue/block-lang': typescript ? ['error', { script: { lang: 'ts' } }] : 'off',
                'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
                'vue/block-tag-newline': ['error', { maxEmptyLines: 1, multiline: 'always', singleline: 'consistent' }],
                'vue/component-api-style': [
                    'error',
                    isVue3 ? ['script-setup', 'composition'] : ['options', 'composition-vue2'],
                ],
                'vue/component-name-in-template-casing': 'error',
                'vue/component-options-name-casing': 'error',
                'vue/custom-event-name-casing': ['error', 'kebab-case'],
                'vue/define-emits-declaration': 'error',
                'vue/define-macros-order': [
                    'error',
                    { order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'] },
                ],
                'vue/define-props-declaration': 'error',
                'vue/html-button-has-type': 'error',
                'vue/html-closing-bracket-newline': [
                    'error',
                    { multiline: styleOptions.bracketSameLine ? 'never' : 'always', singleline: 'never' },
                ],
                'vue/html-comment-content-newline': 'error',
                'vue/html-comment-content-spacing': 'error',
                'vue/html-comment-indent': ['error', indent],
                'vue/html-indent': ['error', indent],
                'vue/html-quotes': ['error', 'double'],
                'vue/match-component-file-name': ['error', { extensions: ['.jsx', '.tsx', '.vue'] }],
                'vue/match-component-import-name': 'error',
                'vue/max-attributes-per-line': getMaxAttributesPerLineOpts(styleOptions),
                'vue/multi-word-component-names': 'off',
                'vue/next-tick-style': 'error',
                'vue/no-deprecated-model-definition': ['error', { allowVue3Compat: true }],
                'vue/no-duplicate-attr-inheritance': 'off',
                'vue/no-empty-component-block': 'error',
                'vue/no-extra-parens': ['error', 'functions'],
                'vue/no-multiple-objects-in-class': 'error',
                'vue/no-potential-component-option-typo': ['error', { presets: ['all'] }],
                'vue/no-ref-object-reactivity-loss': 'error',
                'vue/no-required-prop-with-default': ['error', { autofix: true }],
                'vue/no-restricted-v-bind': ['error', '/^v-/'],
                'vue/no-setup-props-reactivity-loss': 'off',
                'vue/no-this-in-before-route-enter': 'error',
                'vue/no-unsupported-features': version ? ['error', { version }] : 'off',
                'vue/no-unused-refs': 'error',
                'vue/no-unused-vars': 'error',
                'vue/no-useless-mustaches': 'error',
                'vue/no-useless-v-bind': 'error',
                'vue/no-v-html': 'off',
                'vue/padding-line-between-blocks': 'error',
                'vue/padding-lines-in-component-definition': 'error',
                'vue/prefer-define-options': isVue3 ? 'error' : 'off',
                'vue/prefer-prop-type-boolean-first': 'error',
                'vue/prefer-separate-static-class': 'error',
                'vue/prefer-true-attribute-shorthand': 'error',
                'vue/require-default-prop': 'off',
                'vue/require-direct-export': 'error',
                'vue/require-emit-validator': 'error',
                'vue/require-macro-variable-name': 'error',
                'vue/require-name-property': 'error',
                'vue/require-typed-object-prop': 'error',
                'vue/require-typed-ref': 'error',
                'vue/script-indent': ['error', indent, { baseIndent: baseScriptIndent, switchCase: 1 }],
                'vue/singleline-html-element-content-newline': 'off',
                'vue/v-for-delimiter-style': 'error',
                'vue/valid-define-options': 'error',
            },
        },
    ]
}
