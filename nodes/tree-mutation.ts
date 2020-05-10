import { createTextNode } from "./node-contruction";
import { Node } from "./node";
import { Element } from "./element";
import { isElementNode, isTextNode } from "./node-types";
import { Attribute } from "parse5";

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

export const replaceChild = function (parentNode: Node, oldNode: Node, newNode: Node) {
    const childIndex = parentNode.childNodes.indexOf(oldNode);
    if (childIndex === -1) {
        console.warn('replaceChild: node not found');
    }
    parentNode.childNodes[childIndex] = newNode;

    const previousSibling = oldNode.previousSibling || null;
    const nextSibling = oldNode.nextSibling || null;

    newNode.previousSibling = previousSibling;
    newNode.nextSibling = nextSibling;

    if (previousSibling) {
        previousSibling.nextSibling = newNode;
    }
    if (nextSibling) {
        nextSibling.previousSibling = newNode;
    }

    const previousElementSibling = oldNode.previousElementSibling || null;
    const nextElementSibling = oldNode.nextElementSibling || null;

    newNode.previousElementSibling = previousElementSibling;
    newNode.nextElementSibling = nextElementSibling;
    if (isElementNode(newNode)) {
        if (previousSibling) {
            previousSibling.nextElementSibling = newNode;
        }
        if (nextSibling) {
            nextSibling.previousElementSibling = newNode;
        }
        if (previousElementSibling) {
            previousElementSibling.nextElementSibling = newNode;
        }
        if (nextSibling) {
            nextSibling.previousElementSibling = newNode;
        }
        if (isElementNode(oldNode)){
            const index = parentNode.children.indexOf(oldNode);
            if (index !== -1) {
                parentNode.children[index] = newNode;
            }
        } else {
            parentNode.children[parentNode.children.length] = newNode;
        }
    }
    newNode.parentNode = oldNode.parentNode;
    newNode.setOwnerDocument(parentNode.ownerDocument);
};

export const insertText = function (parentNode: Node, text: string) {
    const lastChild = parentNode.lastChild;

    if (lastChild && isTextNode(lastChild)) {
        lastChild.nodeValue += text;
    } else {
        appendChild(parentNode, createTextNode(text));
    }
};

export const insertTextBefore = function (parentNode: Node, text: string, referenceNode: Node) {
    const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];

    if (prevNode && isTextNode(prevNode)) {
        prevNode.nodeValue += text;
    } else {
        insertBefore(parentNode, createTextNode(text), referenceNode);
    }
};

export const setTemplateContent = function (templateElement: Element, contentElement: Node) {
    appendChild(templateElement, contentElement);
};

export const getTemplateContent = function (templateElement: Element) {
    return templateElement.childNodes[0];
};

/**
 * Copies attributes to the given element. Only attributes that are not yet present in the element are copied.
 *
 * @param recipient - Element to copy attributes into.
 * @param attrs - Attributes to copy.
 */
export const adoptAttributes = function (recipient: Element, attrs: Attribute[]) {
    for (let i = 0; i < attrs.length; i++) {
        const { name, value } = attrs[i];

        if (typeof recipient.attribs[name] === 'undefined') {
            recipient.attribs[name] = value;
        }
    }
};
