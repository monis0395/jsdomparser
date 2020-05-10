// @ts-ignore
import { serializeContent } from "parse5/lib/common/doctype";
import { DocumentType } from "./documentType";
import { createTextNode } from "./node-contruction";
import { DocumentProps, NodeType } from "./contracts/type";
import { Node } from "./node";
import { Element } from "./element";

export const appendChild = function (parentNode: Node, newNode: Node | Element) {
    const lastChild = parentNode.lastChild;

    if (lastChild) {
        lastChild.nextSibling = newNode;
        newNode.previousSibling = lastChild;
    }

    const lastElement = parentNode.lastElementChild;
    newNode.previousElementSibling = lastElement;

    if (newNode instanceof Element) {
        parentNode.children.push(newNode);
        if (lastElement) {
            lastElement.nextElementSibling = newNode;
        }
        if (lastChild) {
            lastChild.nextElementSibling = newNode;
        }
    }

    parentNode.childNodes.push(newNode);
    newNode.parentNode = parentNode;
};

export const insertBefore = function (parentNode: Node, newNode: Node, referenceNode: Node) {
    const insertionIdx = parentNode.childNodes.indexOf(referenceNode);
    const prev = referenceNode.previousSibling;
    const prevElement = referenceNode.previousElementSibling || null;

    if (prev) {
        prev.nextSibling = newNode;
        newNode.previousSibling = prev;
    }

    if (newNode instanceof Element && referenceNode instanceof Element) {
        const insertionIdx = parentNode.children.indexOf(referenceNode);
        if (prevElement) {
            prevElement.nextElementSibling = newNode;
            newNode.previousElementSibling = prevElement;
        }

        referenceNode.previousElementSibling = newNode;
        if (referenceNode.nodeType === NodeType.ELEMENT_NODE) {
            newNode.nextElementSibling = referenceNode;
        }
        // @ts-ignore
        parentNode.children.splice(insertionIdx, 0, newNode);
    }

    referenceNode.previousSibling = newNode;
    newNode.nextSibling = referenceNode;

    parentNode.childNodes.splice(insertionIdx, 0, newNode);
    newNode.parentNode = parentNode;
};

export const setTemplateContent = function (templateElement, contentElement) {
    appendChild(templateElement, contentElement);
};

export const getTemplateContent = function (templateElement) {
    return templateElement.childNodes[0];
};

export const setDocumentType = function (document, name, publicId, systemId) {
    const nodeValue = serializeContent(name, publicId, systemId);
    let doctypeNode = null;

    for (let i = 0; i < document.childNodes.length; i++) {
        if (document.childNodes[i].type === 'directive' && document.childNodes[i].localName === '!doctype') {
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

export const setDocumentMode = function (document: DocumentProps, mode: string) {
    document.mode = mode;
};

export const getDocumentMode = function (document: DocumentProps) {
    return document.mode;
};

export const detachNode = function (node: Node) {
    if (!node.parentNode) {
        return;
    }
    const idx = node.parentNode.childNodes.indexOf(node);
    const prev = node.previousSibling;
    const next = node.nextSibling;
    const prevElement = node.previousElementSibling || null;
    const nextElement = node.nextElementSibling || null;

    if (prev) {
        prev.nextSibling = next;
    }

    if (next) {
        next.previousSibling = prev;
    }

    if (node instanceof Element) {
        if (prevElement) {
            prevElement.nextElementSibling = nextElement;
        }
        if (nextElement) {
            nextElement.previousElementSibling = prevElement;
        }
        node.parentNode.children.splice(node.parentNode.children.indexOf(node), 1);
    }

    node.previousSibling = null;
    node.nextSibling = null;
    node.previousElementSibling = null;
    node.nextElementSibling = null;

    node.parentNode.childNodes.splice(idx, 1);
    node.parentNode = null;
};

export const insertText = function (parentNode, text) {
    const lastChild = parentNode.lastChild;

    if (lastChild && lastChild.type === 'text') {
        lastChild.nodeValue += text;
    } else {
        appendChild(parentNode, createTextNode(text));
    }
};

export const insertTextBefore = function (parentNode, text, referenceNode) {
    const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];

    if (prevNode && prevNode.type === 'text') {
        prevNode.nodeValue += text;
    } else {
        insertBefore(parentNode, createTextNode(text), referenceNode);
    }
};

export const adoptAttributes = function (recipient, attrs) {
    for (let i = 0; i < attrs.length; i++) {
        const attrName = attrs[i].name;

        if (typeof recipient.attribs[attrName] === 'undefined') {
            recipient.attribs[attrName] = attrs[i].value;
        }
    }
};
