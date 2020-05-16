"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Element = void 0;
const node_1 = require("./node");
const tree_traversing_1 = require("./tree-traversing");
const index_1 = require("../index");
const legacy = require("./domutils/legacy");
const style_1 = require("./style");
class Element extends node_1.Node {
    constructor(props) {
        super(props);
        this.style = new style_1.Style(this);
    }
    get attributes() {
        return tree_traversing_1.getAttrList(this);
    }
    get className() {
        return this.getAttribute("class");
    }
    set className(classNames) {
        this.setAttribute("class", classNames);
    }
    get id() {
        return this.getAttribute("id");
    }
    set id(id) {
        this.setAttribute("id", id);
    }
    getAttribute(name) {
        return this.attribs[name] || null;
    }
    hasAttribute(name) {
        return this.getAttribute(name) !== null;
    }
    setAttribute(name, value) {
        this.attribs[name] = value;
        return value;
    }
    removeAttribute(name) {
        delete this.attribs[name];
    }
    get innerHTML() {
        return index_1.serializeDom(this);
    }
    set innerHTML(htmlString) {
        const document = index_1.parseDom(htmlString);
        // todo: handle head also
        const node = document.body;
        while (this.childNodes.length) {
            this.removeChild(this.childNodes[0]);
        }
        while (node.childNodes.length) {
            this.appendChild(node.childNodes[0]);
        }
    }
    getElementsByClassName(names) {
        return legacy.getElementsByClassName(names, this.childNodes);
    }
    getElementsByTagName(tagName) {
        return legacy.getElementsByTagName(tagName, this.childNodes, true);
    }
}
exports.Element = Element;
const elementAttributes = ["href", "src", "srcset"];
elementAttributes.forEach((name) => {
    Object.defineProperty(Element.prototype, name, {
        get: function () {
            return this.getAttribute(name);
        },
        set: function (value) {
            return this.setAttribute(name, value);
        },
    });
});
