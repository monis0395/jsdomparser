import { Node } from "./node";
import { ElementProps } from "./contracts/type";
import { getAttrList } from "./tree-traversing";
import { GenericObjectType } from "../types/types";
import { parseDom, serializeDom } from "../index";
import * as legacy from "./domutils/legacy";
import { Style } from "./style";

export class Element extends Node implements ElementProps {
    namespaceURI: string;
    style: Style;
    attribs: GenericObjectType<any>;

    constructor(props: ElementProps) {
        super(props);
        this.style = new Style(this);
    }

    get attributes() {
        return getAttrList(this);
    }

    get className() {
        return this.getAttribute("class");
    }

    set className(classNames: string) {
        this.setAttribute("class", classNames);
    }

    get id() {
        return this.getAttribute("id");
    }

    set id(id: string) {
        this.setAttribute("id", id);
    }

    getAttribute(name: string) {
        return this.attribs[name] || null;
    }

    hasAttribute(name: string) {
        return this.getAttribute(name) !== null;
    }

    setAttribute(name: string, value: string) {
        this.attribs[name] = value;
        return value;
    }

    removeAttribute(name: string) {
        delete this.attribs[name];
    }


    get innerHTML() {
        return serializeDom(this)
    }

    set innerHTML(htmlString: string) {
        const document = parseDom(htmlString);
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
        get: function () {
            return this.getAttribute(name);
        },
        set: function (value: string) {
            return this.setAttribute(name, value);
        },
    });
});

