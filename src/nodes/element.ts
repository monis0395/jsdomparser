import { Node } from "./node";
import { ElementProps } from "./contracts/type";
import { getAttrList } from "./tree-adapter/tree-traversing";
import { parseDom, serializeDom } from "../index";
import * as legacy from "./domutils/legacy";
import { Style } from "./style";

export class Element extends Node {
    namespaceURI: string;
    style: Style;
    attribs: Record<string, string>;

    private readonly _localName: string;
    private readonly _tagName: string;

    constructor(props: ElementProps) {
        super(props);
        this.style = new Style(this);
        this._localName = (this._localName || "").toLowerCase();
        this._tagName = this._localName.toUpperCase();
    }

    get attributes() {
        return getAttrList(this);
    }

    get className() {
        return this.getAttribute("class") || '';
    }

    set className(classNames: string) {
        this.setAttribute("class", classNames);
    }

    get id() {
        return this.getAttribute("id") || '';
    }

    set id(id: string) {
        this.setAttribute("id", id);
    }

    getAttribute(name: string) {
        const value = this.attribs[name];
        if (typeof value === "string") {
            return value
        }
        return null;
    }

    hasAttribute(name: string) {
        return this.getAttribute(name) !== null;
    }

    setAttribute(name: string, value: string) {
        this.attribs[name] = String(value);
        return value;
    }

    removeAttribute(name: string) {
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
        return serializeDom(this)
    }

    set innerHTML(htmlString: string) {
        const document = parseDom(htmlString);
        // todo: handle head also
        const node = document.body;
        while (this.childNodes.length) {
            this.removeChild(this.childNodes[0])
        }
        while (node.childNodes.length) {
            this.appendChild(node.childNodes[0])
        }
    }

    getElementsByClassName(names: string) {
        return legacy.getElementsByClassName(names, this.childNodes)
    }

    getElementsByTagName(tagName: string) {
        return legacy.getElementsByTagName(tagName, this.childNodes, true)
    }
}

const elementAttributes = ["href", "src", "srcset"];
elementAttributes.forEach((name) => {
    Object.defineProperty(Element.prototype, name, {
        get() {
            return this.getAttribute(name) || '';
        },
        set(value: string) {
            return this.setAttribute(name, value);
        },
    });
});

