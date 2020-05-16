"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentMode = exports.setDocumentMode = exports.getDocumentTypeNodeSystemId = exports.getDocumentTypeNodePublicId = exports.getDocumentTypeNodeName = exports.getCommentNodeContent = exports.getTextNodeContent = exports.getNamespaceURI = exports.getTagName = void 0;
exports.getTagName = function (element) {
    return element.localName;
};
exports.getNamespaceURI = function (element) {
    return element.namespaceURI;
};
exports.getTextNodeContent = function (textNode) {
    return textNode.nodeValue;
};
exports.getCommentNodeContent = function (commentNode) {
    return commentNode.nodeValue;
};
exports.getDocumentTypeNodeName = function (doctypeNode) {
    return doctypeNode.name;
};
exports.getDocumentTypeNodePublicId = function (doctypeNode) {
    return doctypeNode.publicId;
};
exports.getDocumentTypeNodeSystemId = function (doctypeNode) {
    return doctypeNode.systemId;
};
exports.setDocumentMode = function (document, mode) {
    document.mode = mode;
};
exports.getDocumentMode = function (document) {
    return document.mode;
};
