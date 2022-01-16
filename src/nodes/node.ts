import { NodeProps, NodeType } from "./contracts/type";
import { Element } from "./element";
import { Document } from "./document";
import { isCommentNode, isDocument, isElementNode, isTextNode } from "./tree-adapter/node-types";
import { appendChild, detachNode, insertBefore, replaceChild } from "./tree-adapter/tree-mutation";
// @ts-ignore
import { unescape } from 'html-escaper';

export class Node implements NodeProps {
    nodeName: string = '';
    nodeValue: string = '';
    nodeType: NodeType;

    children: Element[] = [];
    childNodes: Node[];
    _parentNode: Node;
    _parentElement: Element;
    _previousSibling: Node | null;
    _nextSibling: Node | null;
    _previousElementSibling: Element | null;
    _nextElementSibling: Element | null;
    sourceCodeLocation?: string;

    private _ownerDocument: Document;

    constructor(props: NodeProps) {
        for (const key of Object.keys(props)) {
            // @ts-ignore
            this[key] = props[key];
        }
        this.childNodes = this.childNodes || [];
        this.children = this.childNodes.filter(isElementNode);
        this._parentNode = this._parentNode || null;
        this._parentElement = this._parentElement || null;
        this._previousSibling = this._previousSibling || null;
        this._nextSibling = this._nextSibling || null;
        this._previousElementSibling = this._previousElementSibling || null;
        this._nextElementSibling = this._nextElementSibling || null;
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

    get nextElementSibling() {
        return this._nextElementSibling;
    }

    get nextSibling() {
        return this._nextSibling;
    }

    get parentElement() {
        return this._parentElement;
    }

    get parentNode() {
        return this._parentNode;
    }

    get previousElementSibling() {
        return this._previousElementSibling;
    }

    get previousSibling() {
        return this._previousSibling;
    }

    get textContent() {
        if (isTextNode(this) || isCommentNode(this)) {
            return this.nodeValue;
        }

        function getText(node: Node) {
            node.childNodes.forEach((child) => {
                if (isTextNode(child) || isCommentNode(child)) {
                    text.push(unescape(child.nodeValue));
                } else {
                    getText(child);
                }
            });
        }

        const text: string[] = [];
        getText(this);
        return text.join("");
    }

    set textContent(data: string) {
        if (isTextNode(this)) {
            this.nodeValue = data;
            return;
        }

        // clear parentNodes for existing children
        for (let i = this.childNodes.length - 1; i >= 0; i--) {
            this.removeChild(this.childNodes[i])
        }
        const node = this.ownerDocument.createTextNode(data);
        this.appendChild(node)
    }

    get ownerDocument(): Document {
        if (this._ownerDocument) {
            return this._ownerDocument
        }
        if (isDocument(this)) {
            this._ownerDocument = null;
            return this._ownerDocument;
        }
        if (isDocument(this.parentNode)) {
            this._ownerDocument = this.parentNode;
            return this._ownerDocument;
        }
        return null;
    }

    setOwnerDocument(node: Document) {
        this._ownerDocument = node;
    }

    appendChild(newChild: Node) {
        appendChild(this, newChild);
    }

    insertBefore(newNode, referenceNode) {
        insertBefore(this, newNode, referenceNode)
        return newNode;
    }

    removeChild(child: Node) {
        return detachNode(child);
    }

    replaceChild(newChild: Node, oldChild: Node) {
        return replaceChild(this, oldChild, newChild);
    }
}

for (const nodeType in NodeType) {
    // @ts-ignore
    Node[nodeType] = Node.prototype[nodeType] = NodeType[nodeType];
}
