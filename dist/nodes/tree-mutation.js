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
exports.appendChild = function (parentNode, newNode) {
    exports.detachNode(newNode);
    const lastChild = parentNode.lastChild;
    if (lastChild) {
        lastChild.nextSibling = newNode;
        newNode.previousSibling = lastChild;
    }
    const lastElement = parentNode.lastElementChild;
    newNode.previousElementSibling = lastElement;
    if (node_types_1.isElementNode(newNode)) {
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
exports.insertBefore = function (parentNode, newNode, referenceNode) {
    exports.detachNode(newNode);
    const insertionIdx = parentNode.childNodes.indexOf(referenceNode);
    const prev = referenceNode.previousSibling;
    const prevElement = referenceNode.previousElementSibling || null;
    if (prev) {
        prev.nextSibling = newNode;
        newNode.previousSibling = prev;
    }
    if (node_types_1.isElementNode(newNode)) {
        if (prevElement) {
            prevElement.nextElementSibling = newNode;
            newNode.previousElementSibling = prevElement;
        }
        referenceNode.previousElementSibling = newNode;
        if (node_types_1.isElementNode(referenceNode)) {
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
exports.detachNode = function (node) {
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
    if (node_types_1.isElementNode(node)) {
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
};
exports.replaceChild = function (parentNode, oldNode, newNode) {
    const childIndex = parentNode.childNodes.indexOf(oldNode);
    if (childIndex === -1) {
        console.warn('replaceChild: node not found');
    }
    exports.detachNode(newNode);
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
    if (node_types_1.isElementNode(newNode)) {
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
        if (node_types_1.isElementNode(oldNode)) {
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
    if (!node_types_1.isElementNode(newNode) && node_types_1.isElementNode(oldNode)) {
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
};
exports.insertText = function (parentNode, text) {
    const lastChild = parentNode.lastChild;
    if (lastChild && node_types_1.isTextNode(lastChild)) {
        lastChild.nodeValue += text;
    }
    else {
        exports.appendChild(parentNode, node_contruction_1.createTextNode(text));
    }
};
exports.insertTextBefore = function (parentNode, text, referenceNode) {
    const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
    if (prevNode && node_types_1.isTextNode(prevNode)) {
        prevNode.nodeValue += text;
    }
    else {
        exports.insertBefore(parentNode, node_contruction_1.createTextNode(text), referenceNode);
    }
};
exports.setTemplateContent = function (templateElement, contentElement) {
    exports.appendChild(templateElement, contentElement);
};
exports.getTemplateContent = function (templateElement) {
    return templateElement.childNodes[0];
};
/**
 * Copies attributes to the given element. Only attributes that are not yet present in the element are copied.
 *
 * @param recipient - Element to copy attributes into.
 * @param attrs - Attributes to copy.
 */
exports.adoptAttributes = function (recipient, attrs) {
    for (let i = 0; i < attrs.length; i++) {
        const { name, value } = attrs[i];
        if (typeof recipient.attribs[name] === 'undefined') {
            recipient.attribs[name] = value;
        }
    }
};
