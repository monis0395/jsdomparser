# JSDomParser
HTML parser and serializer with DOM APIs.

# Motivation
JSDOM library can be used in webworkers but the size of the library is too large to just use it as a proxy for DOM. Thus created a small library which uses the same parser as jsdom with minimal DOM APIs

# APIs
```typescript
export declare function parseDom(rawHTML: string, options?: Options): Document;
export declare function serializeDom(node: Node): string;

interface Options {
    url?: string;
}

export enum NodeType {
    ELEMENT_NODE = 1,
    TEXT_NODE = 3,
    COMMENT_NODE = 8,
    DOCUMENT_NODE = 9,
    DOCUMENT_TYPE_NODE = 10,
    DOCUMENT_FRAGMENT_NODE = 11,
}

export interface Node {
    type: string;
    localName: string;
    nodeType: NodeType;
    childNodes: Node[];
    children: Element[];
    parentNode: Node | null;
    previousSibling: Node | null;
    nextSibling: Node | null;
    previousElementSibling?: Element | null;
    nextElementSibling?: Element | null;
    nodeValue: string;
    firstChild: Node | null;
    lastChild: Node | null;
    firstElementChild: Element | null;
    lastElementChild: Element | null;
    tagName: string;
    textContent: string;
    ownerDocument: Document | null;
    appendChild(newNode: Node);
    removeChild(node: Node): Node;
    replaceChild(newNode: Node, oldNode: Node): Node;
}

export interface Document {
    documentElement: string;
    head: Element;
    body: Element;
    createElement(lowerName: string): Element;
    createTextNode(data: string): Node;
    documentURI: string;
    baseURI: string;
    getElementById(id: string): Element | null;
    getElementsByName(name: string): Element[];
    getElementsByClassName(names: string): Element[];
    getElementsByTagName(tagName: string): Element[];
}

export interface Element {
    attributes: Attribute[]
    style: Style;
    className: string;
    id: string;
    href: string;
    src: string;
    srcset: string;
    getAttribute(name: string): string | null
    hasAttribute(name: string): boolean
    setAttribute(name: string, value: string)
    removeAttribute(name: string)
    innerHTML: string;
    getElementsByClassName(names: string): Element[];
    getElementsByTagName(tagName: string): Element[];
}

interface Style {
    getStyle(name: string): string | undefined
    setStyle(name: string, value: string)
}

interface Attribute {
    name: string;
    value: string;
}
```
