// @ts-ignore
import { serializeContent } from "parse5/lib/common/doctype";
import { DocumentMode, NodeType } from "./contracts/type";
import { Node } from "./node";
import { Document } from "./document";
import { Element } from "./element";
import { isDocumentTypeNode } from "./node-types";
import { DocumentType } from "./documentType";
import { appendChild } from "./tree-mutation";
import { Attribute } from "parse5";

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
        mode: DocumentMode.NO_QUIRKS,
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

export const createElement = function (tagName: string, namespaceURI: string, attrs: Attribute[]) {
    const attribs = Object.create(null);

    for (let i = 0; i < attrs.length; i++) {
        const { name, value } = attrs[i];
        attribs[name] = value;
    }

    return new Element({
        type: tagName === 'script' || tagName === 'style' ? tagName : 'tag',
        nodeType: NodeType.ELEMENT_NODE,
        localName: tagName,
        namespaceURI,
        attribs,
        childNodes: [],
        children: [],
        parentNode: null,
        previousSibling: null,
        nextSibling: null,
    });
};

export const setDocumentType = function (document: Document, name: string, publicId: string, systemId: string) {
    const nodeValue = serializeContent(name, publicId, systemId);
    let doctypeNode: DocumentType = null;

    for (let i = 0; i < document.childNodes.length; i++) {
        const node = document.childNodes[i];
        if (isDocumentTypeNode(node)) {
            doctypeNode = node;
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

export const createCommentNode = function (data: string) {
    return new Node({
        type: 'comment',
        nodeType: NodeType.COMMENT_NODE,
        nodeValue: data,
        parentNode: null,
        previousSibling: null,
        nextSibling: null,
    });
};

export const createTextNode = function (data: string) {
    return new Node({
        type: 'text',
        nodeType: NodeType.TEXT_NODE,
        nodeValue: data,
        parentNode: null,
        previousSibling: null,
        nextSibling: null,
    });
};
