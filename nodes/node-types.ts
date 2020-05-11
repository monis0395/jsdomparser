import { NodeType } from "./contracts/type";
import { Node } from "./node";
import { Element } from "./element";
import { Document } from "./document";
import { DocumentType } from "./documentType";

export const isTextNode = function (node: Node) {
    return node.nodeType === NodeType.TEXT_NODE;
};

export const isCommentNode = function (node: Node) {
    return node.nodeType === NodeType.COMMENT_NODE;
};

export const isDocumentTypeNode = function (node: Node): node is DocumentType {
    return node.nodeType === NodeType.DOCUMENT_TYPE_NODE;
};

export function isElementNode(node: Node): node is Element {
    return node.nodeType === NodeType.ELEMENT_NODE;
}

export const isDocument = function (node: Node): node is Document {
    return node.nodeType === NodeType.DOCUMENT_NODE;
};
