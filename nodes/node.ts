import { NodeProps, NodeType } from "./contracts/type";
import { Element } from "./element";
import { createTextNode } from "./node-contruction";

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
    private _ownerDocument: Node;

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
        if (this.nodeType === NodeType.TEXT_NODE) {
            return this.nodeValue;
        }

        function getText(node) {
            node.childNodes.forEach((child) => {
                if (child.nodeType === NodeType.TEXT_NODE) {
                    text.push(child.nodeValue);
                } else {
                    getText(child);
                }
            });
        }

        const text = [];
        getText(this);
        return text.join("");
    }

    set textContent(data: string) {
        if (this.nodeType === NodeType.TEXT_NODE) {
            this.nodeValue = data;
            return;
        }

        // clear parentNodes for existing children
        for (let i = this.childNodes.length; --i >= 0;) {
            this.childNodes[i].parentNode = null;
        }

        const node = createTextNode(data);
        this.childNodes = [ node ];
        this.children = [];
        node.parentNode = this;
    }

    get ownerDocument() {
        if (this._ownerDocument) {
            return this._ownerDocument
        }
        if (this.nodeType === NodeType.DOCUMENT_NODE) {
            this._ownerDocument = null;
            return this._ownerDocument;
        }
        if (this.parentNode.nodeType === NodeType.DOCUMENT_NODE) {
            this._ownerDocument = this.parentNode;
            return this._ownerDocument;
        }
        return null;
    }

    setOwnerDocument(node: Node) {
        this._ownerDocument = node;
    }
}
