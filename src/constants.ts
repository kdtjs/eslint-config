import { comments, formatters, ignores, imports, javascript, jsdoc, jsonc, markdown, node, perfectionist, promise, react, sonarjs, sorts, stylistic, tailwindcss, typescript, unicorn, unocss, vue } from './configs'
import type { StyleOptions } from './types'

export const defaultStyle: StyleOptions = {
    printWidth: false,
    indent: 4,
    useTabs: false,
    quotes: 'single',
    jsxQuotes: 'double',
    semi: false,
    arrowParens: true,
    braceStyle: '1tbs',
    blockSpacing: true,
    bracketSameLine: false,
    quoteProps: 'consistent',
    commaDangle: 'es5',
    htmlWhitespaceSensitivity: 'ignore',
    vueIndentScriptAndStyle: true,
    endOfLine: 'unix',
    singleAttributePerLine: false,
}

export const availableConfigs = {
    javascript,
    typescript,
    stylistic,
    comments,
    ignores,
    imports,
    jsdoc,
    jsonc,
    markdown,
    node,
    perfectionist,
    promise,
    react,
    sonarjs,
    sorts,
    tailwindcss,
    unicorn,
    unocss,
    vue,
    formatters,
}
