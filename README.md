# JSDomParser
HTML parser and serializer with DOM APIs.

# Motivation
JSDOM library can be used in webworkers but the size of the library is too large to just use it as a proxy for DOM. Thus created a small library which uses the same parser as jsdom with minimal DOM APIs
# Example
```javascript
import { parseDom } from "jsdomparser";

const doc = parseDom(`<!DOCTYPE html><p id="p1">Hello world</p>`);
console.log(doc.getElementById("p1").textContent); // Hello world
```

## Simple options
```javascript
import { parseDom } from "jsdomparser";

const doc = parseDom(``, {url: "https://example.org/"});
```

# Example Serialize
```javascript
import { parseDom, serializeDom } from "jsdomparser";

const doc = parseDom(`<!DOCTYPE html><p id="p1">Hello world</p>`);
console.log(serializeDom(doc.body)); // <p id="p1">Hello world</p>
```

# APIs
```typescript
export declare function parseDom(rawHTML: string, options?: Options): Document;
export declare function serializeDom(node: Node): string;

interface Options {
    url?: string;
    parser?: Parsers
}

export enum Parsers {
    parse5 = "parse5"
}

// todo: to make properties read only
export interface Node {
    baseURI?: string; // todo: to add
    
    childNodes: Node[]; // todo: make read only
    children: Element[]; // todo: make read only
    readonly firstChild: Node | null;
    readonly firstElementChild: Element | null;
    readonly lastChild: Node | null;
    readonly lastElementChild: Element | null;
    nextElementSibling?: Element | null;
    nextSibling: Node | null;
    previousElementSibling?: Element | null;
    previousSibling: Node | null;

    parentNode: Node | null;
    parentElement?: Element | null; // todo: to add

    nodeName: string;
    nodeType: NodeType;
    nodeValue: string;
    textContent: string;

    ownerDocument: Document | null;

    localName: string; // todo: move to element
    tagName: string; // todo: move to element
    type: string; // todo: to remove

    appendChild(newNode: Node);
    removeChild(node: Node): Node;
    replaceChild(newNode: Node, oldNode: Node): Node;
}

export interface Element extends Node {
    readonly attributes: Attribute[];
    readonly childElementCount: number;

    classList?: DOMTokenList; // todo: to add
    className: string;

    id: string;
    innerHTML: string;

    localName: string; // todo: move to element
    tagName: string; // todo: move to element

    style: CSSStyleDeclaration;

    href: string;
    src: string;
    srcset: string;

    getAttribute(name: string): string | null
    getElementsByClassName(names: string): Element[];
    getElementsByTagName(tagName: string): Element[];
    hasAttribute(name: string): boolean
    removeAttribute(name: string)
    setAttribute(name: string, value: string)
}

export interface Document extends Node  {
    baseURI: string; // todo: move to Node
    body: Element;
    readonly documentElement: string;
    readonly documentURI: string;
    readonly head: Element;
    title: string;
    
    createElement(lowerName: string): Element;
    createTextNode(data: string): Node;
    
    getElementById(id: string): Element | null;
    getElementsByName(name: string): Element[];
    getElementsByClassName(names: string): Element[];
    getElementsByTagName(tagName: string): Element[];
}

interface CSSStyleDeclaration {
    getPropertyValue(property: string): string;
    setProperty(propertyName: string, value: string);
    // named properties
}

interface Attribute {
    name: string;
    value: string;
}

export enum NodeType {
    ELEMENT_NODE = 1,
    TEXT_NODE = 3,
    COMMENT_NODE = 8,
    DOCUMENT_NODE = 9,
    DOCUMENT_TYPE_NODE = 10,
    DOCUMENT_FRAGMENT_NODE = 11,
}
```
