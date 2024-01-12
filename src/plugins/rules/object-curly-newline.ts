import stylistic from '@stylistic/eslint-plugin'
import { ASTUtils } from '@typescript-eslint/utils'
import { type Rule, createRule } from '../utils'

type OptionValues = 'always' | 'never'

export interface OptionObject {
    multiline?: boolean
    minProperties?: number
    consistent?: boolean
}

type OptionObjectOrValues = OptionValues | OptionObject

export interface OptionLiterals {
    ObjectExpression?: OptionObjectOrValues
    ObjectPattern?: OptionObjectOrValues
    ImportDeclaration?: OptionObjectOrValues
    ExportDeclaration?: OptionObjectOrValues
}

type Options = OptionObjectOrValues | OptionLiterals
type RuleOptions = [Options?]

export type ObjectCurlyNewlineRuleOptions = RuleOptions

const baseRule = stylistic.rules['object-curly-newline'] as unknown as Rule<RuleOptions, string>

export const objectCurlyNewline = createRule<RuleOptions, string>({
    meta: baseRule.meta,
    defaultOptions: [
        {
            ObjectExpression: { multiline: true },
            ObjectPattern: { multiline: true, consistent: true },
            ImportDeclaration: 'never',
            ExportDeclaration: 'never',
        },
    ],
    create(context, [options]) {
        function getRules(opts?: Options) {
            const contextWithDefaults = Object.create(context, {
                options: { writable: false, configurable: false, value: [opts] },
            })

            return baseRule.create(contextWithDefaults, [opts])
        }

        function getMinProperties() {
            if (!options || typeof options === 'string') {
                return false
            }

            if ('multiline' in options && options.multiline) {
                return options.minProperties ?? Number.POSITIVE_INFINITY
            }

            if (!('ObjectExpression' in options) || typeof options.ObjectExpression === 'string') {
                return false
            }

            if (!options.ObjectExpression?.multiline) {
                return false
            }

            return options.ObjectExpression.minProperties ?? Number.POSITIVE_INFINITY
        }

        const rules = getRules(options)
        const minProperties = getMinProperties()

        return {
            ...rules,
            ObjectExpression(node) {
                if (minProperties === false || node.properties.length >= minProperties) {
                    return rules.ObjectExpression?.(node)
                }

                const source = context.sourceCode
                const openBrace = source.getFirstToken(node, (token) => token.value === '{')
                const closeBrace = source.getLastToken(node, (token) => token.value === '}')

                if (!openBrace || !closeBrace) {
                    return rules.ObjectExpression?.(node)
                }

                let first = source.getTokenAfter(openBrace, { includeComments: true })
                let last = source.getTokenBefore(closeBrace, { includeComments: true })

                if (!first || !last) {
                    return rules.ObjectExpression?.(node)
                }

                if (!(node.properties.length > 0 && first.loc.start.line !== last.loc.end.line)) {
                    first = source.getTokenAfter(openBrace)
                    last = source.getTokenBefore(closeBrace)

                    if (!first || !last) {
                        return rules.ObjectExpression?.(node)
                    }

                    const hasLineBreakBetweenOpenBraceAndFirst = !ASTUtils.isTokenOnSameLine(openBrace, first)
                    const hasLineBreakBetweenCloseBraceAndLast = !ASTUtils.isTokenOnSameLine(last, closeBrace)

                    if (hasLineBreakBetweenOpenBraceAndFirst || hasLineBreakBetweenCloseBraceAndLast) {
                        return getRules('always').ObjectExpression?.(node)
                    }
                }

                return rules.ObjectExpression?.(node)
            },
        }
    },
})
