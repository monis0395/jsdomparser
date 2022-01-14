"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDocument = exports.isElementNode = exports.isDocumentTypeNode = exports.isCommentNode = exports.isTextNode = void 0;
const type_1 = require("../contracts/type");
function isTextNode(node) {
    return node.nodeType === type_1.NodeType.TEXT_NODE;
}
exports.isTextNode = isTextNode;
function isCommentNode(node) {
    return node.nodeType === type_1.NodeType.COMMENT_NODE;
}
exports.isCommentNode = isCommentNode;
function isDocumentTypeNode(node) {
    return node.nodeType === type_1.NodeType.DOCUMENT_TYPE_NODE;
}
exports.isDocumentTypeNode = isDocumentTypeNode;
function isElementNode(node) {
    return !!node && node.nodeType === type_1.NodeType.ELEMENT_NODE;
}
exports.isElementNode = isElementNode;
function isDocument(node) {
    if (node) {
        return node.nodeType === type_1.NodeType.DOCUMENT_NODE;
    }
    return false;
}
exports.isDocument = isDocument;
