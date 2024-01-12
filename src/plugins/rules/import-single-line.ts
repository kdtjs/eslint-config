import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { createRule } from '../utils'

const LINE_BREAK_REGEX = /[\n\r]+/

export const importSingleLine = createRule({
    meta: {
        type: 'layout',
        fixable: 'code',
        schema: [],
        messages: { unexpectedLineBreak: 'Remove line break in the import statement' },
    },
    defaultOptions: [],
    create({ sourceCode, report }) {
        return {
            [AST_NODE_TYPES.ImportDeclaration](node) {
                const source = sourceCode.getText(node)

                if (!LINE_BREAK_REGEX.test(source)) {
                    return
                }

                report({ node, messageId: 'unexpectedLineBreak', fix: (fixer) => fixer.replaceText(node, source.replace(LINE_BREAK_REGEX, '')) })
            },
        }
    },
})
