// @ts-ignore
import { serializeContent } from "parse5/lib/common/doctype";
// @ts-ignore
import { DOCUMENT_MODE } from 'parse5/lib/common/html';
import { NodeType } from "./contracts/type";
import { Node } from "./node";
import { Document } from "./document";
import { Element } from "./element";
import { isDocumentTypeNode } from "./node-types";
import { DocumentType } from "./documentType";
import { appendChild } from "./tree-mutation";

export const createDocument = function () {
    return new Document({
        type: 'root',
        nodeType: NodeType.DOCUMENT_NODE,
        localName: 'root',
        parentNode: null,
        previousSibling: null,
        nextSibling: null,
        childNodes: [],
        children: [],
        mode: DOCUMENT_MODE.NO_QUIRKS,
    });
};

export const createDocumentFragment = function () {
    return new Node({
        type: 'root',
        nodeType: NodeType.DOCUMENT_FRAGMENT_NODE,
        localName: 'root',
        childNodes: [],
        children: [],
        parentNode: null,
        previousSibling: null,
        nextSibling: null,
    });
};

export const createElement = function (tagName: string, namespaceURI: string, attrs) {
    const attribs = Object.create(null);

    for (let i = 0; i < attrs.length; i++) {
        const { name, value } = attrs[i];
        attribs[name] = value;
    }

    return new Element({
        type: tagName === 'script' || tagName === 'style' ? tagName : 'tag',
        nodeType: NodeType.ELEMENT_NODE,
        localName: tagName,
        namespace: namespaceURI,
        attribs,
        childNodes: [],
        children: [],
        parentNode: null,
        previousSibling: null,
        nextSibling: null,
    });
};

export const setDocumentType = function (document, name, publicId, systemId) {
    const nodeValue = serializeContent(name, publicId, systemId);
    let doctypeNode = null;

    for (let i = 0; i < document.childNodes.length; i++) {
        if (isDocumentTypeNode(document.childNodes[i])) {
            doctypeNode = document.childNodes[i];
            break;
        }
    }

    if (doctypeNode) {
        doctypeNode.nodeValue = nodeValue;
        doctypeNode.name = name;
        doctypeNode.publicId = publicId;
        doctypeNode.systemId = systemId;
    } else {
        appendChild(
            document,
            new DocumentType({
                type: 'directive',
                nodeType: NodeType.DOCUMENT_TYPE_NODE,
                localName: '!doctype',
                parentNode: null,
                previousSibling: null,
                nextSibling: null,
                nodeValue,
                name,
                publicId,
                systemId,
            }),
        );
    }
};

export const createCommentNode = function (data) {
    return new Node({
        type: 'comment',
        nodeType: NodeType.COMMENT_NODE,
        nodeValue: data,
        parentNode: null,
        previousSibling: null,
        nextSibling: null,
    });
};

export const createTextNode = function (data) {
    return new Node({
        type: 'text',
        nodeType: NodeType.TEXT_NODE,
        nodeValue: data,
        parentNode: null,
        previousSibling: null,
        nextSibling: null,
    });
};
