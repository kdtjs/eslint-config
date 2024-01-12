import { ASTUtils, AST_NODE_TYPES } from '@typescript-eslint/utils'
import { createRule, isBlockStatement } from '../utils'

export const arrowEmptyBodyNewline = createRule({
    meta: {
        type: 'layout',
        fixable: 'whitespace',
        schema: [],
        messages: {
            unexpectedNewLine: 'Unexpected newline between empty arrow function body',
        },
    },
    defaultOptions: [],
    create({ sourceCode, report }) {
        return {
            [AST_NODE_TYPES.ArrowFunctionExpression](node) {
                const inlineComments = sourceCode.getCommentsInside(node.body)

                if (inlineComments.length === 0 && isBlockStatement(node.body) && node.body.body.length === 0) {
                    const openBracket = sourceCode.getFirstToken(node.body)
                    const closeBracket = sourceCode.getLastToken(node.body)

                    if (openBracket && closeBracket && !ASTUtils.isTokenOnSameLine(openBracket, closeBracket)) {
                        report({ node, loc: node.body.loc, messageId: 'unexpectedNewLine', fix: (fixer) => fixer.replaceTextRange(node.body.range, '{}') })
                    }
                }
            },
        }
    },
})
