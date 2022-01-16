"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
const node_1 = require("./node");
const node_contruction_1 = require("./tree-adapter/node-contruction");
const legacy = require("./domutils/legacy");
class Document extends node_1.Node {
    constructor(props) {
        super(props);
    }
    get body() {
        return this.getElementsByTagName("body")[0];
    }
    get childElementCount() {
        return this.children.length;
    }
    get documentElement() {
        return this.firstElementChild;
    }
    get documentURI() {
        return this._documentURI;
    }
    get head() {
        return this.getElementsByTagName("head")[0];
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
