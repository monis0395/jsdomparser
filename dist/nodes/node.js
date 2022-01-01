"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const type_1 = require("./contracts/type");
const node_types_1 = require("./node-types");
const tree_mutation_1 = require("./tree-mutation");
// @ts-ignore
const html_escaper_1 = require("html-escaper");
class Node {
    constructor(props) {
        this.localName = '';
        this.children = [];
        this.parentNode = null;
        this.previousSibling = null;
        this.nextSibling = null;
        this.previousElementSibling = null;
        this.nextElementSibling = null;
        for (const key of Object.keys(props)) {
            // @ts-ignore
            this[key] = props[key];
        }
        this.localName = (this.localName || "").toLowerCase();
        this.childNodes = this.childNodes || [];
        this.children = this.childNodes.filter(node_types_1.isElementNode);
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
    get tagName() {
        if (this._tagName) {
            return this._tagName;
        }
        this._tagName = this.localName.toUpperCase();
        return this._tagName;
    }
    get textContent() {
        if (this.nodeType === type_1.NodeType.TEXT_NODE) {
            return this.nodeValue;
        }
        function getText(node) {
            node.childNodes.forEach((child) => {
                if (node_types_1.isTextNode(child)) {
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
        for (let i = this.childNodes.length; --i >= 0;) {
            this.childNodes[i].parentNode = null;
        }
        const node = this.ownerDocument.createTextNode(data);
        this.childNodes = [node];
        this.children = [];
        node.parentNode = this;
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
    appendChild(newNode) {
        tree_mutation_1.appendChild(this, newNode);
    }
    removeChild(node) {
        return tree_mutation_1.detachNode(node);
    }
    replaceChild(newNode, oldNode) {
        return tree_mutation_1.replaceChild(this, oldNode, newNode);
    }
}
exports.Node = Node;
for (const nodeType in type_1.NodeType) {
    // @ts-ignore
    Node[nodeType] = Node.prototype[nodeType] = type_1.NodeType[nodeType];
}
