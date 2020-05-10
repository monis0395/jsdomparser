import doctype from "parse5/lib/common/doctype";
import { Node } from "./node";
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
    const data = doctype.serializeContent(name, publicId, systemId);
    let doctypeNode = null;

    for (let i = 0; i < document.childNodes.length; i++) {
        if (document.childNodes[i].type === 'directive' && document.childNodes[i].localName === '!doctype') {
            doctypeNode = document.childNodes[i];
            break;
        }
    }

    if (doctypeNode) {
        doctypeNode.nodeValue = data;
        doctypeNode['x-name'] = name;
        doctypeNode['x-publicId'] = publicId;
        doctypeNode['x-systemId'] = systemId;
    } else {
        appendChild(
            document,
            new Node({
                type: 'directive',
                nodeTye: NodeType.DOCUMENT_TYPE_NODE,
                localName: '!doctype',
                nodeValue: data,
                'x-name': name,
                'x-publicId': publicId,
                'x-systemId': systemId,
            }),
        );
    }
};

export const setDocumentMode = function (document, mode) {
    document['x-mode'] = mode;
};

export const getDocumentMode = function (document) {
    return document['x-mode'];
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
