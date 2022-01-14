"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
const node_1 = require("./node");
const node_contruction_1 = require("./tree-adapter/node-contruction");
const legacy = require("./domutils/legacy");
const url_1 = require("url");
class Document extends node_1.Node {
    constructor(props) {
        super(props);
    }
    get documentElement() {
        return this.firstElementChild;
    }
    get firstElementChild() {
        return this.children[0] || null;
    }
    get head() {
        return this.getElementsByTagName("head")[0];
    }
    get lastElementChild() {
        const children = this.children;
        return children[children.length - 1] || null;
    }
    get title() {
        const titleTag = this.getElementsByTagName("title")[0];
        if (titleTag) {
            return titleTag.textContent;
        }
        return '';
    }
    set title(newTitle) {
        let titleTag = this.getElementsByTagName("title")[0];
        if (!titleTag && this.head) {
            titleTag = this.createElement('title');
            this.head.appendChild(titleTag);
        }
        if (titleTag) {
            titleTag.textContent = newTitle;
        }
    }
    get body() {
        return this.getElementsByTagName("body")[0];
    }
    createElement(lowerName) {
        const element = node_contruction_1.createElement(lowerName, "", []);
        element.setOwnerDocument(this);
        return element;
    }
    createTextNode(data) {
        const textNode = node_contruction_1.createTextNode(data);
        textNode.setOwnerDocument(this);
        return textNode;
    }
    get documentURI() {
        return this._documentURI;
    }
    get baseURI() {
        if (this._baseURI || this._baseURI === '') {
            return this._baseURI;
        }
        this._baseURI = this.documentURI;
        try {
            const baseElements = this.getElementsByTagName('base');
            const href = baseElements[0].getAttribute('href');
            if (href) {
                this._baseURI = (new url_1.URL(href, this._baseURI)).href;
            }
        }
        catch (ex) { /* Just fall back to documentURI */
        }
        return this._baseURI;
    }
    getElementById(id) {
        return legacy.getElementById(id, this.childNodes);
    }
    getElementsByName(name) {
        return legacy.getElementsByName(name, this.childNodes);
    }
    getElementsByClassName(names) {
        return legacy.getElementsByClassName(names, this.childNodes);
    }
    getElementsByTagName(tagName) {
        return legacy.getElementsByTagName(tagName, this.childNodes, true);
    }
}
exports.Document = Document;
