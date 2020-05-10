import { NodeProps, NodeType } from "./contracts/type";
import { Element } from "./element";


export class Node implements NodeProps {
    type: string;
    nodeType: NodeType;
    localName: string;
    childNodes: Node[];
    children: Element[];
    parentNode: Node;
    previousSibling: Node;
    nextSibling: Node;
    previousElementSibling?: Node;
    nextElementSibling?: Node;
    nodeValue: string;

    constructor(props: NodeProps) {
        for (const key of Object.keys(props)) {
            this[key] = props[key];
        }
        this.childNodes = this.childNodes || [];
        this.children = this.childNodes.filter((node) => node.nodeType === NodeType.ELEMENT_NODE) as Element[];
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
        return this.localName.toUpperCase();
    }

    get textContent() {
        return this.nodeValue;
    }

    set textContent(data: string) {
        this.nodeValue = data;
    }
}
