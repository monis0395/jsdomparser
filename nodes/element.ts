import { Node } from "./node";
import { ElementProps } from "./contracts/type";
import { appendChild, detachNode } from "./tree-mutation";
import { getAttrList } from "./tree-traversing";
import { GenericObjectType } from "../types/types";
import { parseDom, serializeDom } from "../index";

export class Element extends Node {
    attribs: GenericObjectType<any>;

    constructor(props: ElementProps) {
        super(props);
    }

    get attributes() {
        return getAttrList(this);
    }

    get className() {
        return this.getAttribute("class");
    }

    set className(classNames) {
        this.setAttribute("class", classNames);
    }

    getAttribute(name) {
        return this.attribs[name] || null;
    }

    setAttribute(name, value) {
        this.attribs[name] = value;
        return value;
    }

    appendChild(newNode) {
        appendChild(this, newNode);
    }

    removeChild(node) {
        detachNode(node);
    }

    get innerHtml() {
        return serializeDom(this)
    }

    set innerHtml(htmlString: string) {
        const document = parseDom(htmlString);
        const node = document.body.firstChild;
        for (let i = this.childNodes.length; --i >= 0;) {
            this.childNodes[i].parentNode = null;
        }
        for (const key of Object.keys(node)) {
            this[key] = node[key];
        }
        for (let i = this.childNodes.length; --i >= 0;) {
            this.childNodes[i].parentNode = this;
        }
    }
}

const elementAttributes = ["href", "id", "src", "srcset"];
elementAttributes.forEach(name => {
    Object.defineProperty(Element.prototype, name, {
        get: function () {
            return this.getAttribute(name);
        },
        set: function (value) {
            return this.setAttribute(name, value);
        },
    });
});

