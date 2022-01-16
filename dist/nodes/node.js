"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const type_1 = require("./contracts/type");
const node_types_1 = require("./tree-adapter/node-types");
const tree_mutation_1 = require("./tree-adapter/tree-mutation");
// @ts-ignore
const html_escaper_1 = require("html-escaper");
const url_1 = require("url");
class Node {
    constructor(props) {
        this.nodeName = '';
        this.nodeValue = '';
        this.children = [];
        for (const key of Object.keys(props)) {
            // @ts-ignore
            this[key] = props[key];
        }
        this.childNodes = this.childNodes || [];
        this.children = this.childNodes.filter(node_types_1.isElementNode);
        this._parentNode = this._parentNode || null;
        this._parentElement = this._parentElement || null;
        this._previousSibling = this._previousSibling || null;
        this._nextSibling = this._nextSibling || null;
        this._previousElementSibling = this._previousElementSibling || null;
        this._nextElementSibling = this._nextElementSibling || null;
    }
    get baseURI() {
        const document = node_types_1.isDocument(this) ? this : this.ownerDocument;
        let _baseURI = document.documentURI;
        try {
            const baseElements = document.getElementsByTagName('base');
            const href = baseElements[0].getAttribute('href');
            if (href) {
                _baseURI = (new url_1.URL(href, _baseURI)).href;
            }
        }
        catch (ex) { /* Just fall back to documentURI */
        }
        return _baseURI;
    }
    get firstChild() {
        return this.childNodes[0] || null;
    }
    get firstElementChild() {
        return this.children[0] || null;
    }
    get lastChild() {
        const children = this.childNodes;
        return children[children.length - 1] || null;
    }
    get lastElementChild() {
        const children = this.children;
        return children[children.length - 1] || null;
    }
    get nextElementSibling() {
        return this._nextElementSibling;
    }
    get nextSibling() {
        return this._nextSibling;
    }
    get parentElement() {
        return this._parentElement;
    }
    get parentNode() {
        return this._parentNode;
    }
    get previousElementSibling() {
        return this._previousElementSibling;
    }
    get previousSibling() {
        return this._previousSibling;
    }
    get textContent() {
        if (node_types_1.isTextNode(this) || node_types_1.isCommentNode(this)) {
            return this.nodeValue;
        }
        function getText(node) {
            node.childNodes.forEach((child) => {
                if (node_types_1.isTextNode(child) || node_types_1.isCommentNode(child)) {
                    text.push(html_escaper_1.unescape(child.nodeValue));
                }
                else {
                    getText(child);
                }
            });
        }
        const text = [];
        getText(this);
        return text.join("");
    }
    set textContent(data) {
        if (node_types_1.isTextNode(this)) {
            this.nodeValue = data;
            return;
        }
        // clear parentNodes for existing children
        for (let i = this.childNodes.length - 1; i >= 0; i--) {
            this.removeChild(this.childNodes[i]);
        }
        const node = this.ownerDocument.createTextNode(data);
        this.appendChild(node);
    }
    get ownerDocument() {
        if (this._ownerDocument) {
            return this._ownerDocument;
        }
        if (node_types_1.isDocument(this)) {
            this._ownerDocument = null;
            return this._ownerDocument;
        }
        if (node_types_1.isDocument(this.parentNode)) {
            this._ownerDocument = this.parentNode;
            return this._ownerDocument;
        }
        return null;
    }
    setOwnerDocument(node) {
        this._ownerDocument = node;
    }
    appendChild(newChild) {
        tree_mutation_1.appendChild(this, newChild);
    }
    insertBefore(newNode, referenceNode) {
        tree_mutation_1.insertBefore(this, newNode, referenceNode);
        return newNode;
    }
    removeChild(child) {
        return tree_mutation_1.detachNode(child);
    }
    replaceChild(newChild, oldChild) {
        return tree_mutation_1.replaceChild(this, oldChild, newChild);
    }
}
exports.Node = Node;
for (const nodeType in type_1.NodeType) {
    // @ts-ignore
    Node[nodeType] = Node.prototype[nodeType] = type_1.NodeType[nodeType];
}
