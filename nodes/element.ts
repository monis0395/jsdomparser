import { Node } from "./node";
import { NodeT, NodeType } from "./contracts/type";
import { appendChild, detachNode } from "./tree-mutation";
import { getAttrList } from "./tree-traversing";
import { GenericObjectType } from "../types/types";

export class Element extends Node {
    attribs: GenericObjectType<any>;

    constructor(props) {
        super(props);
        this.attribs = this.attribs || {};
        this.nodeType = NodeType.ELEMENT_NODE;
    }

    get attributes() {
        return getAttrList(this);
    }

    getAttribute(name) {
        return this.attribs[name] || null;
    }

    setAttribute(name, value) {
        this.attribs[name] = value;
        return value;
    }

    get className() {
        return this.getAttribute("class");
    }

    set className(classNames) {
        this.setAttribute("class", classNames);
    }

    appendChild(newNode: NodeT) {
        appendChild(this, newNode);
    }

    removeChild(node: NodeT) {
        detachNode(node);
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

