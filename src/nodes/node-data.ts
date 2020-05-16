import { Element } from "./element";
import { Node } from "./node";
import { DocumentType } from "./documentType";
import { Document } from "./document";
import { DocumentMode } from "./contracts/type";

export const getTagName = (element: Element) => {
    return element.localName;
};

export const getNamespaceURI = (element: Element) => {
    return element.namespaceURI;
};

export const getTextNodeContent = (textNode: Node) => {
    return textNode.nodeValue;
};

export const getCommentNodeContent = (commentNode: Node) => {
    return commentNode.nodeValue;
};

export const getDocumentTypeNodeName = (doctypeNode: DocumentType) => {
    return doctypeNode.name;
};

export const getDocumentTypeNodePublicId = (doctypeNode: DocumentType) => {
    return doctypeNode.publicId;
};

export const getDocumentTypeNodeSystemId = (doctypeNode: DocumentType) => {
    return doctypeNode.systemId;
};

export const setDocumentMode = (document: Document, mode: DocumentMode) => {
    document.mode = mode;
};

export const getDocumentMode = (document: Document) => {
    return document.mode;
};
