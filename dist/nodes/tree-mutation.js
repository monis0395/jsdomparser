"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adoptAttributes = exports.getTemplateContent = exports.setTemplateContent = exports.insertTextBefore = exports.insertText = exports.replaceChild = exports.detachNode = exports.insertBefore = exports.appendChild = void 0;
const node_contruction_1 = require("./node-contruction");
const node_types_1 = require("./node-types");
function resetNode(node) {
    node.previousSibling = null;
    node.nextSibling = null;
    node.previousElementSibling = null;
    node.nextElementSibling = null;
    node.parentNode = null;
}
function appendChild(parentNode, newNode) {
    detachNode(newNode);
    const lastChild = parentNode.lastChild;
    if (lastChild) {
        lastChild.nextSibling = newNode;
        newNode.previousSibling = lastChild;
    }
    const lastElement = parentNode.lastElementChild;
    newNode.previousElementSibling = lastElement;
    if ((0, node_types_1.isElementNode)(newNode)) {
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
}
exports.appendChild = appendChild;
function insertBefore(parentNode, newNode, referenceNode) {
    detachNode(newNode);
    const insertionIdx = parentNode.childNodes.indexOf(referenceNode);
    const prev = referenceNode.previousSibling;
    const prevElement = referenceNode.previousElementSibling || null;
    if (prev) {
        prev.nextSibling = newNode;
        newNode.previousSibling = prev;
    }
    if ((0, node_types_1.isElementNode)(newNode)) {
        if (prevElement) {
            prevElement.nextElementSibling = newNode;
            newNode.previousElementSibling = prevElement;
        }
        referenceNode.previousElementSibling = newNode;
        if ((0, node_types_1.isElementNode)(referenceNode)) {
            newNode.nextElementSibling = referenceNode;
            const index = parentNode.children.indexOf(referenceNode);
            parentNode.children.splice(index, 0, newNode);
        }
    }
    referenceNode.previousSibling = newNode;
    newNode.nextSibling = referenceNode;
    parentNode.childNodes.splice(insertionIdx, 0, newNode);
    newNode.parentNode = parentNode;
    newNode.setOwnerDocument(parentNode.ownerDocument);
}
exports.insertBefore = insertBefore;
function detachNode(node) {
    if (!node.parentNode) {
        return null;
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
    if ((0, node_types_1.isElementNode)(node)) {
        if (prevElement) {
            prevElement.nextElementSibling = nextElement;
        }
        if (nextElement) {
            nextElement.previousElementSibling = prevElement;
        }
        node.parentNode.children.splice(node.parentNode.children.indexOf(node), 1);
    }
    node.parentNode.childNodes.splice(idx, 1);
    resetNode(node);
    return node;
}
exports.detachNode = detachNode;
function replaceChild(parentNode, oldNode, newNode) {
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
    if ((0, node_types_1.isElementNode)(newNode)) {
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
        if ((0, node_types_1.isElementNode)(oldNode)) {
            parentNode.children[parentNode.children.indexOf(oldNode)] = newNode;
        }
        else {
            const insertionIdx = parentNode.children.indexOf(newNode.nextElementSibling);
            if (insertionIdx !== -1) {
                parentNode.children.splice(insertionIdx, 0, newNode);
            }
            else {
                parentNode.children.push(newNode);
            }
        }
    }
    if (!(0, node_types_1.isElementNode)(newNode) && (0, node_types_1.isElementNode)(oldNode)) {
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
exports.replaceChild = replaceChild;
function insertText(parentNode, text) {
    const lastChild = parentNode.lastChild;
    if (lastChild && (0, node_types_1.isTextNode)(lastChild)) {
        lastChild.nodeValue += text;
    }
    else {
        appendChild(parentNode, (0, node_contruction_1.createTextNode)(text));
    }
}
exports.insertText = insertText;
function insertTextBefore(parentNode, text, referenceNode) {
    const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
    if (prevNode && (0, node_types_1.isTextNode)(prevNode)) {
        prevNode.nodeValue += text;
    }
    else {
        insertBefore(parentNode, (0, node_contruction_1.createTextNode)(text), referenceNode);
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
