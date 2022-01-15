import { createTextNode } from "./node-contruction";
import { Node } from "../node";
import { Element } from "../element";
import { isElementNode, isTextNode } from "./node-types";
import { Attribute } from "parse5";

function resetNode(node: Node) {
    node.previousSibling = null;
    node.nextSibling = null;
    node.previousElementSibling = null;
    node.nextElementSibling = null;
    node.parentNode = null;
}

export function appendChild(parentNode: Node, newNode: Node) {
    insertBefore(parentNode, newNode, null);
}

function updatePreviousElementFor(nextSibling: Node, oldRef: Element, newRef: Element) {
    while (nextSibling && nextSibling.previousElementSibling === oldRef) {
        nextSibling.previousElementSibling = newRef;
        nextSibling = nextSibling.nextSibling;
    }
}

function updateNextElementSiblingFor(prevSibling: Node, oldRef: Element, newRef: Element) {
    let firstElementOccurrenceFound = false;
    while (prevSibling && !firstElementOccurrenceFound) {
        prevSibling.nextElementSibling = newRef;
        firstElementOccurrenceFound = isElementNode(prevSibling);
        prevSibling = prevSibling.previousSibling;
    }
}

export function insertBefore(parentNode: Node, newNode: Node, next: Node | null) {
    detachNode(newNode);
    const prevSibling = next ? next.previousSibling : parentNode.lastChild;
    const prevElement = next ? next.previousElementSibling : parentNode.lastElementChild;

    // updating previous sibling
    if (prevSibling) {
        prevSibling.nextSibling = newNode;
    }

    // updating new node
    newNode.previousSibling = prevSibling;
    newNode.nextSibling = next;
    newNode.previousElementSibling = prevElement;
    newNode.nextElementSibling = isElementNode(next) ? next : next && next.nextElementSibling;

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
        next.previousSibling = newNode;
    }
    if (next && isElementNode(newNode)) {
        next.previousElementSibling = newNode;
    }

    const nextIdx = parentNode.childNodes.indexOf(newNode.nextSibling);
    const insertionIdx = nextIdx !== -1 ? nextIdx : parentNode.childNodes.length

    parentNode.childNodes.splice(insertionIdx, 0, newNode); // attaching newNode in children before next

    newNode.parentNode = parentNode;
    // todo: attach to parent element
    // newNode.parentElement = isElementNode(parentNode) || null;
    newNode.setOwnerDocument(parentNode.ownerDocument);
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
        prev.nextSibling = next;
    }

    if (next) {
        next.previousSibling = prev;
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

export function replaceChild(parentNode: Node, oldNode: Node, newNode: Node): Node | null {
    const childIndex = parentNode.childNodes.indexOf(oldNode);
    if (childIndex === -1) {
        throw new Error('replaceChild: node not found');
    }
    detachNode(newNode);
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
        if (nextElementSibling) {
            nextElementSibling.previousElementSibling = newNode;
        }
        if (isElementNode(oldNode)) {
            parentNode.children[parentNode.children.indexOf(oldNode)] = newNode;
        } else {
            const insertionIdx = parentNode.children.indexOf(newNode.nextElementSibling);
            if (insertionIdx !== -1) {
                parentNode.children.splice(insertionIdx, 0, newNode);
            } else {
                parentNode.children.push(newNode);
            }
        }
    }
    if (!isElementNode(newNode) && isElementNode(oldNode)) {
        if (previousElementSibling) {
            previousElementSibling.nextElementSibling = nextElementSibling;
        }
        if (nextElementSibling) {
            nextElementSibling.previousElementSibling = previousElementSibling;
        }
        oldNode.parentNode.children.splice(oldNode.parentNode.children.indexOf(oldNode), 1);
    }

    newNode.parentNode = oldNode.parentNode;
    newNode.setOwnerDocument(parentNode.ownerDocument);
    resetNode(oldNode);
    return oldNode;
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
