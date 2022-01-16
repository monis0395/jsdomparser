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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
const node_1 = require("./node");
const node_contruction_1 = require("./tree-adapter/node-contruction");
const legacy = __importStar(require("./domutils/legacy"));
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
        const element = (0, node_contruction_1.createElement)(lowerName, "", []);
        element.setOwnerDocument(this);
        return element;
    }
    createTextNode(data) {
        const textNode = (0, node_contruction_1.createTextNode)(data);
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
