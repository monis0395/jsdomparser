"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adoptAttributes = exports.getTemplateContent = exports.setTemplateContent = exports.insertTextBefore = exports.insertText = exports.replaceChild = exports.insertBefore = exports.detachNode = exports.appendChild = void 0;
const node_contruction_1 = require("./node-contruction");
const node_types_1 = require("./node-types");
function appendChild(parentNode, newNode) {
    insertBefore(parentNode, newNode, null);
}
exports.appendChild = appendChild;
function detachNode(node) {
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
    if (node_types_1.isElementNode(node)) {
        updatePreviousElementFor(next, node, prevElement);
        updateNextElementSiblingFor(prev, node, nextElement);
        node.parentNode.children.splice(node.parentNode.children.indexOf(node), 1);
    }
    node.parentNode.childNodes.splice(idx, 1);
    resetNode(node);
    return node;
}
exports.detachNode = detachNode;
function insertBefore(parentNode, newNode, next) {
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
    newNode._nextElementSibling = node_types_1.isElementNode(next) ? next : next && next.nextElementSibling;
    if (node_types_1.isElementNode(newNode)) {
        if (next) {
            updatePreviousElementFor(next.nextSibling, prevElement, newNode);
        }
        updateNextElementSiblingFor(prevSibling, prevElement, newNode);
        const nextElementIdx = parentNode.children.indexOf(newNode.nextElementSibling);
        const insertionElementIdx = nextElementIdx !== -1 ? nextElementIdx : parentNode.children.length;
        parentNode.children.splice(insertionElementIdx, 0, newNode); // attaching newNode in children before next
    }
    // updating next's previous references
    if (next) {
        next._previousSibling = newNode;
    }
    if (next && node_types_1.isElementNode(newNode)) {
        next._previousElementSibling = newNode;
    }
    const nextIdx = parentNode.childNodes.indexOf(newNode.nextSibling);
    const insertionIdx = nextIdx !== -1 ? nextIdx : parentNode.childNodes.length;
    parentNode.childNodes.splice(insertionIdx, 0, newNode); // attaching newNode in children before next
    newNode._parentNode = parentNode;
    newNode._parentElement = node_types_1.isElementNode(parentNode) ? parentNode : null;
    newNode.setOwnerDocument(parentNode.ownerDocument);
}
exports.insertBefore = insertBefore;
function resetNode(node) {
    node._previousSibling = null;
    node._nextSibling = null;
    node._previousElementSibling = null;
    node._nextElementSibling = null;
    node._parentNode = null;
    node._parentElement = null;
}
function updatePreviousElementFor(nextSibling, oldRef, newRef) {
    while (nextSibling && nextSibling.previousElementSibling === oldRef) {
        nextSibling._previousElementSibling = newRef;
        nextSibling = nextSibling.nextSibling;
    }
}
function updateNextElementSiblingFor(prevSibling, oldRef, newRef) {
    let firstElementOccurrenceFound = false;
    while (prevSibling && !firstElementOccurrenceFound) {
        prevSibling._nextElementSibling = newRef;
        firstElementOccurrenceFound = node_types_1.isElementNode(prevSibling);
        prevSibling = prevSibling.previousSibling;
    }
}
function replaceChild(parentNode, oldNode, newNode) {
    const childIndex = parentNode.childNodes.indexOf(oldNode);
    if (childIndex === -1) {
        throw new Error('replaceChild: node not found');
    }
    insertBefore(parentNode, newNode, oldNode);
    return detachNode(oldNode);
}
exports.replaceChild = replaceChild;
function insertText(parentNode, text) {
    const lastChild = parentNode.lastChild;
    if (lastChild && node_types_1.isTextNode(lastChild)) {
        lastChild.nodeValue += text;
    }
    else {
        appendChild(parentNode, node_contruction_1.createTextNode(text));
    }
}
exports.insertText = insertText;
function insertTextBefore(parentNode, text, referenceNode) {
    const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
    if (prevNode && node_types_1.isTextNode(prevNode)) {
        prevNode.nodeValue += text;
    }
    else {
        insertBefore(parentNode, node_contruction_1.createTextNode(text), referenceNode);
    }
}
exports.insertTextBefore = insertTextBefore;
function setTemplateContent(templateElement, contentElement) {
    appendChild(templateElement, contentElement);
}
exports.setTemplateContent = setTemplateContent;
function getTemplateContent(templateElement) {
    return templateElement.childNodes[0];
}
exports.getTemplateContent = getTemplateContent;
/**
 * Copies attributes to the given element. Only attributes that are not yet present in the element are copied.
 *
 * @param recipient - Element to copy attributes into.
 * @param attrs - Attributes to copy.
 */
function adoptAttributes(recipient, attrs) {
    for (const { name, value } of attrs)
        if (typeof recipient.attribs[name] === 'undefined') {
            recipient.attribs[name] = value;
        }
}
exports.adoptAttributes = adoptAttributes;
