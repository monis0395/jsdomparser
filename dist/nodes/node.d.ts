import { NodeProps, NodeType } from "./contracts/type";
import { Element } from "./element";
import { Document } from "./document";
export declare class Node implements NodeProps {
    type: string;
    nodeType: NodeType;
    localName: string;
    children: Element[];
    childNodes: Node[];
    parentNode: Node;
    previousSibling: Node;
    nextSibling: Node;
    previousElementSibling?: Element;
    nextElementSibling?: Element;
    sourceCodeLocation?: string;
    nodeValue: string;
    nodeName: string;
    private _tagName;
    private _ownerDocument;
    constructor(props: NodeProps);
    get firstChild(): Node;
    get firstElementChild(): Element;
    get lastChild(): Node;
    get lastElementChild(): Element;
    get tagName(): string;
    get textContent(): string;
    set textContent(data: string);
    get ownerDocument(): Document;
    setOwnerDocument(node: Document): void;
    appendChild(newChild: Node): void;
    insertBefore(newNode: any, referenceNode: any): any;
    removeChild(child: Node): Node;
    replaceChild(newChild: Node, oldChild: Node): Node;
}
