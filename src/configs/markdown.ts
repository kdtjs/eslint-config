import { mergeProcessors, processorPassThrough } from 'eslint-merge-processors'
import type { FlatConfig } from '../types'
import { GLOB_MARKDOWN, GLOB_MARKDOWN_CODE, GLOB_MARKDOWN_IN_MARKDOWN } from '../globs'
import { parserPlain, pluginMarkdown } from '../plugins'

export interface MarkdownOptions {
    componentExts?: string[]
}

export function markdown(options: MarkdownOptions = {}): FlatConfig[] {
    const { componentExts = [] } = options
    const processor = mergeProcessors([pluginMarkdown.processors.markdown, processorPassThrough])

    return [
        { plugins: { markdown: pluginMarkdown } },
        { files: [GLOB_MARKDOWN], ignores: [GLOB_MARKDOWN_IN_MARKDOWN], processor },
        { files: [GLOB_MARKDOWN], languageOptions: { parser: parserPlain } },
        {
            files: [GLOB_MARKDOWN_CODE, ...componentExts.map((ext) => `${GLOB_MARKDOWN}/**/*.${ext}`)],
            languageOptions: {
                parserOptions: {
                    ecmaFeatures: { impliedStrict: true },
                },
            },
            rules: {
                ...pluginMarkdown.configs.recommended.overrides[1].rules,

                'no-alert': 'off',
                'no-console': 'off',
                'no-labels': 'off',
                'no-lone-blocks': 'off',
                'no-restricted-imports': 'off',
                'no-restricted-syntax': 'off',
                'no-undef': 'off',
                'no-unused-expressions': 'off',
                'no-unused-labels': 'off',
                'no-unused-vars': 'off',

                'style/comma-dangle': 'off',
                'style/eol-last': 'off',

                'ts/await-thenable': 'off',
                'ts/consistent-type-imports': 'off',
                'ts/dot-notation': 'off',
                'ts/no-extraneous-class': 'off',
                'ts/no-floating-promises': 'off',
                'ts/no-for-in-array': 'off',
                'ts/no-implied-eval': 'off',
                'ts/no-misused-promises': 'off',
                'ts/no-namespace': 'off',
                'ts/no-redeclare': 'off',
                'ts/no-require-imports': 'off',
                'ts/no-throw-literal': 'off',
                'ts/no-unnecessary-type-assertion': 'off',
                'ts/no-unsafe-argument': 'off',
                'ts/no-unsafe-assignment': 'off',
                'ts/no-unsafe-call': 'off',
                'ts/no-unsafe-member-access': 'off',
                'ts/no-unsafe-return': 'off',
                'ts/no-unused-vars': 'off',
                'ts/no-use-before-define': 'off',
                'ts/no-var-requires': 'off',
                'ts/restrict-plus-operands': 'off',
                'ts/restrict-template-expressions': 'off',
                'ts/unbound-method': 'off',

                'unused-imports/no-unused-imports': 'off',
                'unused-imports/no-unused-vars': 'off',
            },
        },
    ]
}
