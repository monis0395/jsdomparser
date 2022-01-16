import { NodeProps, NodeType } from "./contracts/type";
import { Element } from "./element";
import { Document } from "./document";
import { isCommentNode, isDocument, isElementNode, isTextNode } from "./tree-adapter/node-types";
import { appendChild, detachNode, insertBefore, replaceChild } from "./tree-adapter/tree-mutation";
// @ts-ignore
import { unescape } from 'html-escaper';
import { URL } from "url";

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

    get baseURI() {
        const document: Document = isDocument(this) ? this : this.ownerDocument;
        let _baseURI = document.documentURI;
        try {
            const baseElements = document.getElementsByTagName('base');
            const href = baseElements[0].getAttribute('href');
            if (href) {
                _baseURI = (new URL(href, _baseURI)).href;
            }
        } catch (ex) {/* Just fall back to documentURI */
        }
        return _baseURI;
    }

    get firstChild(): Node | null {
        return this.childNodes[0] || null;
    }

    get firstElementChild(): Element | null {
        return this.children[0] || null;
    }

    get lastChild(): Node | null {
        const children = this.childNodes;
        return children[children.length - 1] || null;
    }

    get lastElementChild(): Element | null {
        const children = this.children;
        return children[children.length - 1] || null;
    }

    get nextElementSibling(): Element | null {
        return this._nextElementSibling;
    }

    get nextSibling(): Node | null {
        return this._nextSibling;
    }

    get parentElement(): Element | null {
        return this._parentElement;
    }

    get parentNode(): Node | null {
        return this._parentNode;
    }

    get previousElementSibling(): Element | null {
        return this._previousElementSibling;
    }

    get previousSibling(): Node | null {
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

    get ownerDocument(): Document | null {
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

    insertBefore(newNode: Node, referenceNode: Node): Node | null {
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
