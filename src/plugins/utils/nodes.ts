import type { TSESTree } from '@typescript-eslint/utils'
import { AST_NODE_TYPES } from '@typescript-eslint/utils'

export function isBlockStatement(node: TSESTree.Node | undefined): node is TSESTree.BlockStatement {
    return node?.type === AST_NODE_TYPES.BlockStatement
}
