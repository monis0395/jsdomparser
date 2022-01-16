// @ts-ignore
import { serializeContent } from "parse5/lib/common/doctype";
import { DocumentMode, NodeName, NodeType } from "../contracts/type";
import { Node } from "../node";
import { Document } from "../document";
import { Element } from "../element";
import { isDocumentTypeNode } from "./node-types";
import { DocumentType } from "../documentType";
import { appendChild } from "./tree-mutation";
import { Attribute } from "parse5";
import { GenericObjectType } from "../../types/types";

export const createDocument = () => {
    return new Document({
        nodeType: NodeType.DOCUMENT_NODE,
        nodeName: NodeName.DOCUMENT_NODE,
        mode: DocumentMode.NO_QUIRKS,
    });
};

export const createDocumentFragment = () => {
    return new Node({
        nodeType: NodeType.DOCUMENT_FRAGMENT_NODE,
        nodeName: NodeName.DOCUMENT_FRAGMENT_NODE,
    });
};

export const createElement = (tagName: string, namespaceURI: string, attrs: Attribute[] | GenericObjectType<string>) => {
    let attribs = Object.create(null);

    if (Array.isArray(attrs)) {
        for (const { name, value } of attrs) {
            // right now optional params are missing for attributes
            attribs[name] = value;
        }
    } else {
        attribs = attrs
    }

    return new Element({
        nodeType: NodeType.ELEMENT_NODE,
        _localName: tagName,
        nodeName: tagName?.toUpperCase(), // todo: add test cases
        namespaceURI,
        attribs,
    });
};

export const setDocumentType = (document: Document, name: string, publicId: string, systemId: string) => {
    const nodeValue = serializeContent(name, publicId, systemId);
    let doctypeNode: DocumentType = null;

    for (const node of document.childNodes) {
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
            createDirectiveNode(name, nodeValue, publicId, systemId),
        );
    }
};

export const createDirectiveNode = (name: string, nodeValue: string, publicId?: string, systemId?: string) => {
    return new DocumentType({
        nodeType: NodeType.DOCUMENT_TYPE_NODE,
        nodeName: name,
        nodeValue,
        name,
        publicId,
        systemId,
    });
};

export const createCommentNode = (data: string) => {
    return new Node({
        nodeType: NodeType.COMMENT_NODE,
        nodeName: NodeName.COMMENT_NODE,
        nodeValue: data,
    });
};

export const createTextNode = (data: string) => {
    return new Node({
        nodeType: NodeType.TEXT_NODE,
        nodeName: NodeName.TEXT_NODE,
        nodeValue: data,
    });
};
