import type { Options } from 'prettier'

export interface PrettierOptions extends Omit<Options, 'plugins'> {
    plugins?: string[]
}

export interface StyleOptions {
    printWidth?: boolean | number
    indent?: number
    useTabs?: boolean
    quotes?: 'single' | 'double'
    jsxQuotes?: 'single' | 'double'
    semi?: boolean
    arrowParens?: boolean
    braceStyle?: '1tbs' | 'stroustrup' | 'allman'
    blockSpacing?: boolean
    bracketSameLine?: boolean
    quoteProps?: 'as-needed' | 'consistent' | 'preserve'
    commaDangle?: 'all' | 'es5' | 'none'
    htmlWhitespaceSensitivity?: 'css' | 'strict' | 'ignore'
    vueIndentScriptAndStyle?: boolean
    endOfLine?: 'unix' | 'windows'
    singleAttributePerLine?: boolean
}
