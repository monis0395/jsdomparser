"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Element = void 0;
const node_1 = require("./node");
const tree_traversing_1 = require("./tree-adapter/tree-traversing");
const index_1 = require("../index");
const legacy = __importStar(require("./domutils/legacy"));
const style_1 = require("./style");
class Element extends node_1.Node {
    constructor(props) {
        super(props);
        this.style = new style_1.Style(this);
        this._localName = (this._localName || "").toLowerCase();
        this._tagName = this._localName.toUpperCase();
    }
    get attributes() {
        return tree_traversing_1.getAttrList(this);
    }
    get className() {
        return this.getAttribute("class") || '';
    }
    set className(classNames) {
        this.setAttribute("class", classNames);
    }
    get id() {
        return this.getAttribute("id") || '';
    }
    set id(id) {
        this.setAttribute("id", id);
    }
    getAttribute(name) {
        const value = this.attribs[name];
        if (typeof value === "string") {
            return value;
        }
        return null;
    }
    hasAttribute(name) {
        return this.getAttribute(name) !== null;
    }
    setAttribute(name, value) {
        this.attribs[name] = String(value);
        return value;
    }
    removeAttribute(name) {
        delete this.attribs[name];
    }
    get childElementCount() {
        return this.children.length;
    }
    get localName() {
        return this._localName;
    }
    get tagName() {
        return this._tagName;
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
        get() {
            return this.getAttribute(name) || '';
        },
        set(value) {
            return this.setAttribute(name, value);
        },
    });
});
