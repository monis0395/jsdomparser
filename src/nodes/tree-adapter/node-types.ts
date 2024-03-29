import { NodeType } from "../contracts/type";
import { Node } from "../node";
import { Element } from "../element";
import { Document } from "../document";
import { DocumentType } from "../documentType";

export function isTextNode(node: Node) {
    return node.nodeType === NodeType.TEXT_NODE;
}

export function isCommentNode(node: Node): node is Node {
    return node.nodeType === NodeType.COMMENT_NODE;
}

export function isDocumentTypeNode(node: Node): node is DocumentType {
    return node.nodeType === NodeType.DOCUMENT_TYPE_NODE;
}

export function isElementNode(node: Node | null): node is Element {
    return !!node && node.nodeType === NodeType.ELEMENT_NODE;
}

export function isDocument(node: Node | null): node is Document {
    if (node) {
        return node.nodeType === NodeType.DOCUMENT_NODE;
    }
    return false;
}
