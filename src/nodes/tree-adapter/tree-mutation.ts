import { createTextNode } from "./node-contruction";
import { Node } from "../node";
import { Element } from "../element";
import { isElementNode, isTextNode } from "./node-types";
import { Attribute } from "parse5";

export function appendChild(parentNode: Node, newNode: Node) {
    insertBefore(parentNode, newNode, null);
}

export function detachNode(node: Node): Node | null {
    if (!node.parentNode) {
        // this can mean that node is not yet attached and is in detach state
        return null;
    }
    const idx = node.parentNode.childNodes.indexOf(node);
    if (idx === -1) {
        throw new Error('removeChild: node not found');
    }
    const prev = node.previousSibling;
    const next = node.nextSibling;
    const prevElement = node.previousElementSibling || null;
    const nextElement = node.nextElementSibling || null;

    if (prev) {
        prev._nextSibling = next;
    }

    if (next) {
        next._previousSibling = prev;
    }

    if (isElementNode(node)) {
        updatePreviousElementFor(next, node, prevElement)
        updateNextElementSiblingFor(prev, node, nextElement)
        node.parentNode.children.splice(node.parentNode.children.indexOf(node), 1);
    }

    node.parentNode.childNodes.splice(idx, 1);
    resetNode(node);
    return node;
}

export function insertBefore(parentNode: Node, newNode: Node, next: Node | null) {
    detachNode(newNode);
    const prevSibling = next ? next.previousSibling : parentNode.lastChild;
    const prevElement = next ? next.previousElementSibling : parentNode.lastElementChild;

    // updating previous sibling
    if (prevSibling) {
        prevSibling._nextSibling = newNode;
    }

    // updating new node
    newNode._previousSibling = prevSibling;
    newNode._nextSibling = next;
    newNode._previousElementSibling = prevElement;
    newNode._nextElementSibling = isElementNode(next) ? next : next && next.nextElementSibling;

    if (isElementNode(newNode)) {
        if (next) {
            updatePreviousElementFor(next.nextSibling, prevElement, newNode);
        }
        updateNextElementSiblingFor(prevSibling, prevElement, newNode);

        const nextElementIdx = parentNode.children.indexOf(newNode.nextElementSibling);
        const insertionElementIdx = nextElementIdx !== -1 ? nextElementIdx : parentNode.children.length

        parentNode.children.splice(insertionElementIdx, 0, newNode); // attaching newNode in children before next
    }

    // updating next's previous references
    if (next) {
        next._previousSibling = newNode;
    }
    if (next && isElementNode(newNode)) {
        next._previousElementSibling = newNode;
    }

    const nextIdx = parentNode.childNodes.indexOf(newNode.nextSibling);
    const insertionIdx = nextIdx !== -1 ? nextIdx : parentNode.childNodes.length

    parentNode.childNodes.splice(insertionIdx, 0, newNode); // attaching newNode in children before next

    newNode._parentNode = parentNode;
    newNode._parentElement = isElementNode(parentNode) ? parentNode : null;
    newNode.setOwnerDocument(parentNode.ownerDocument);
}

function resetNode(node: Node) {
    node._previousSibling = null;
    node._nextSibling = null;
    node._previousElementSibling = null;
    node._nextElementSibling = null;
    node._parentNode = null;
    node._parentElement = null;
}

function updatePreviousElementFor(nextSibling: Node, oldRef: Element, newRef: Element) {
    while (nextSibling && nextSibling.previousElementSibling === oldRef) {
        nextSibling._previousElementSibling = newRef;
        nextSibling = nextSibling.nextSibling;
    }
}

function updateNextElementSiblingFor(prevSibling: Node, oldRef: Element, newRef: Element) {
    let firstElementOccurrenceFound = false;
    while (prevSibling && !firstElementOccurrenceFound) {
        prevSibling._nextElementSibling = newRef;
        firstElementOccurrenceFound = isElementNode(prevSibling);
        prevSibling = prevSibling.previousSibling;
    }
}

export function replaceChild(parentNode: Node, oldNode: Node, newNode: Node): Node | null {
    const childIndex = parentNode.childNodes.indexOf(oldNode);
    if (childIndex === -1) {
        throw new Error('replaceChild: node not found');
    }
    insertBefore(parentNode, newNode, oldNode);
    return detachNode(oldNode);
}

export function insertText(parentNode: Node, text: string) {
    const lastChild = parentNode.lastChild;

    if (lastChild && isTextNode(lastChild)) {
        lastChild.nodeValue += text;
    } else {
        appendChild(parentNode, createTextNode(text));
    }
}

export function insertTextBefore(parentNode: Node, text: string, referenceNode: Node) {
    const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];

    if (prevNode && isTextNode(prevNode)) {
        prevNode.nodeValue += text;
    } else {
        insertBefore(parentNode, createTextNode(text), referenceNode);
    }
}

export function setTemplateContent(templateElement: Element, contentElement: Node) {
    appendChild(templateElement, contentElement);
}

export function getTemplateContent(templateElement: Element) {
    return templateElement.childNodes[0];
}

/**
 * Copies attributes to the given element. Only attributes that are not yet present in the element are copied.
 *
 * @param recipient - Element to copy attributes into.
 * @param attrs - Attributes to copy.
 */
export function adoptAttributes(recipient: Element, attrs: Attribute[]) {
    for (const { name, value } of attrs)
        if (typeof recipient.attribs[name] === 'undefined') {
            recipient.attribs[name] = value;
        }
}
