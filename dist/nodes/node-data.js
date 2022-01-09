"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentMode = exports.setDocumentMode = exports.getDocumentTypeNodeSystemId = exports.getDocumentTypeNodePublicId = exports.getDocumentTypeNodeName = exports.getCommentNodeContent = exports.getTextNodeContent = exports.getNamespaceURI = exports.getTagName = void 0;
exports.getTagName = (element) => {
    return element.localName;
};
exports.getNamespaceURI = (element) => {
    return element.namespaceURI;
};
exports.getTextNodeContent = (textNode) => {
    return textNode.nodeValue;
};
exports.getCommentNodeContent = (commentNode) => {
    return commentNode.nodeValue;
};
exports.getDocumentTypeNodeName = (doctypeNode) => {
    return doctypeNode.name;
};
exports.getDocumentTypeNodePublicId = (doctypeNode) => {
    return doctypeNode.publicId;
};
exports.getDocumentTypeNodeSystemId = (doctypeNode) => {
    return doctypeNode.systemId;
};
exports.setDocumentMode = (document, mode) => {
    document.mode = mode;
};
exports.getDocumentMode = (document) => {
    return document.mode;
};
