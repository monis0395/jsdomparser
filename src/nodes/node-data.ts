import { Element } from "./element";
import { Node } from "./node";
import { DocumentType } from "./documentType";
import { Document } from "./document";
import { DocumentMode } from "./contracts/type";

export const getTagName = function (element: Element) {
    return element.localName;
};

export const getNamespaceURI = function (element: Element) {
    return element.namespaceURI;
};

export const getTextNodeContent = function (textNode: Node) {
    return textNode.nodeValue;
};

export const getCommentNodeContent = function (commentNode: Node) {
    return commentNode.nodeValue;
};

export const getDocumentTypeNodeName = function (doctypeNode: DocumentType) {
    return doctypeNode.name;
};

export const getDocumentTypeNodePublicId = function (doctypeNode: DocumentType) {
    return doctypeNode.publicId;
};

export const getDocumentTypeNodeSystemId = function (doctypeNode: DocumentType) {
    return doctypeNode.systemId;
};

export const setDocumentMode = function (document: Document, mode: DocumentMode) {
    document.mode = mode;
};

export const getDocumentMode = function (document: Document) {
    return document.mode;
};
