import { createTextNode } from "./node-contruction";
import { Node } from "./node";
import { Element } from "./element";
import { isElementNode, isTextNode } from "./node-types";

export const appendChild = function (parentNode: Node, newNode: Node | Element) {
    detachNode(newNode);
    const lastChild = parentNode.lastChild;

    if (lastChild) {
        lastChild.nextSibling = newNode;
        newNode.previousSibling = lastChild;
    }

    const lastElement = parentNode.lastElementChild;
    newNode.previousElementSibling = lastElement;

    if (isElementNode(newNode)) {
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
    newNode.setOwnerDocument(parentNode.ownerDocument);
};

export const insertBefore = function (parentNode: Node, newNode: Node, referenceNode: Node) {
    detachNode(newNode);
    const insertionIdx = parentNode.childNodes.indexOf(referenceNode);
    const prev = referenceNode.previousSibling;
    const prevElement = referenceNode.previousElementSibling || null;

    if (prev) {
        prev.nextSibling = newNode;
        newNode.previousSibling = prev;
    }

    if (isElementNode(newNode)) {
        if (prevElement) {
            prevElement.nextElementSibling = newNode;
            newNode.previousElementSibling = prevElement;
        }
        referenceNode.previousElementSibling = newNode;

        if (isElementNode(referenceNode)) {
            newNode.nextElementSibling = referenceNode;
            const insertionIdx = parentNode.children.indexOf(referenceNode);
            parentNode.children.splice(insertionIdx, 0, newNode);
        }
    }

    referenceNode.previousSibling = newNode;
    newNode.nextSibling = referenceNode;

    parentNode.childNodes.splice(insertionIdx, 0, newNode);
    newNode.parentNode = parentNode;
    newNode.setOwnerDocument(parentNode.ownerDocument);
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

    if (isElementNode(node)) {
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

    if (lastChild && isTextNode(lastChild)) {
        lastChild.nodeValue += text;
    } else {
        appendChild(parentNode, createTextNode(text));
    }
};

export const insertTextBefore = function (parentNode, text, referenceNode) {
    const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];

    if (prevNode && isTextNode(prevNode)) {
        prevNode.nodeValue += text;
    } else {
        insertBefore(parentNode, createTextNode(text), referenceNode);
    }
};

export const setTemplateContent = function (templateElement, contentElement) {
    appendChild(templateElement, contentElement);
};

export const getTemplateContent = function (templateElement) {
    return templateElement.childNodes[0];
};

export const adoptAttributes = function (recipient, attrs) {
    for (let i = 0; i < attrs.length; i++) {
        const { name, value } = attrs[i];

        if (typeof recipient.attribs[name] === 'undefined') {
            recipient.attribs[name] = value;
        }
    }
};
