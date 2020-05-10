import doctype from "parse5/lib/common/doctype";
import { DocumentType } from "./documentType";
import { createTextNode } from "./node-contruction";
import { NodeType } from "./contracts/type";

export const appendChild = function (parentNode, newNode) {
    const lastChild = parentNode.lastChild;

    if (lastChild) {
        lastChild.nextSibling = newNode;
        newNode.previousSibling = lastChild;
    }

    parentNode.childNodes.push(newNode);
    newNode.parentNode = parentNode;
};

export const insertBefore = function (parentNode, newNode, referenceNode) {
    const insertionIdx = parentNode.childNodes.indexOf(referenceNode);
    const previousSibling = referenceNode.previousSibling;

    if (previousSibling) {
        previousSibling.nextSibling = newNode;
        newNode.previousSibling = previousSibling;
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
    const nodeValue = doctype.serializeContent(name, publicId, systemId);
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

export const setDocumentMode = function (document, mode) {
    document.mode = mode;
};

export const getDocumentMode = function (document) {
    return document.mode;
};

export const detachNode = function (node) {
    if (!node.parentNode) {
        return;
    }
    const idx = node.parentNode.childNodes.indexOf(node);
    const prev = node.previousSibling;
    const next = node.nextSibling;

    node.previousSibling = null;
    node.nextSibling = null;

    if (prev) {
        prev.nextSibling = next;
    }

    if (next) {
        next.previousSibling = prev;
    }

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
