"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentMode = exports.setDocumentMode = exports.getDocumentTypeNodeSystemId = exports.getDocumentTypeNodePublicId = exports.getDocumentTypeNodeName = exports.getCommentNodeContent = exports.getTextNodeContent = exports.getNamespaceURI = exports.getTagName = void 0;
const getTagName = (element) => {
    return element.localName;
};
exports.getTagName = getTagName;
const getNamespaceURI = (element) => {
    return element.namespaceURI;
};
exports.getNamespaceURI = getNamespaceURI;
const getTextNodeContent = (textNode) => {
    return textNode.nodeValue;
};
exports.getTextNodeContent = getTextNodeContent;
const getCommentNodeContent = (commentNode) => {
    return commentNode.nodeValue;
};
exports.getCommentNodeContent = getCommentNodeContent;
const getDocumentTypeNodeName = (doctypeNode) => {
    return doctypeNode.name;
};
exports.getDocumentTypeNodeName = getDocumentTypeNodeName;
const getDocumentTypeNodePublicId = (doctypeNode) => {
    return doctypeNode.publicId;
};
exports.getDocumentTypeNodePublicId = getDocumentTypeNodePublicId;
const getDocumentTypeNodeSystemId = (doctypeNode) => {
    return doctypeNode.systemId;
};
exports.getDocumentTypeNodeSystemId = getDocumentTypeNodeSystemId;
const setDocumentMode = (document, mode) => {
    document.mode = mode;
};
exports.setDocumentMode = setDocumentMode;
const getDocumentMode = (document) => {
    return document.mode;
};
exports.getDocumentMode = getDocumentMode;
