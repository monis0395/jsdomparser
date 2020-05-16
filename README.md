# JSDomParser
HTML parser and serializer with DOM APIs.

# Motivation
JSDOM library can be used in webworkers but the size of the library is too large to just use it as a proxy for DOM. Thus created a small library which uses the same parser as jsdom with minimal DOM APIs

# APIs
## Node
- type: string
- localName: string
- nodeType: NodeType
- childNodes: Node[]
- children: Element[]
- parentNode: Node = null
- previousSibling: Node = null
- nextSibling: Node = null
- previousElementSibling?: Element = null
- nextElementSibling?: Element = null
- nodeValue: string
- firstChild: Node | null
- lastChild: Node | null
- firstElementChild: Element | null
- lastElementChild: Element | null
- tagName: string
- textContent: string
- ownerDocument: Document | null
- appendChild(newNode: Node)
- removeChild(node: Node): Node
- replaceChild(newNode: Node, oldNode: Node): Node

## Document
- documentElement: string
- head: Element
- body: Element
- createElement(lowerName: string): Element
- createTextNode(data: string): Node
- documentURI: string
- baseURI: string
- getElementById(id: string): Element | null
- getElementsByName(name: string): Element[]
- getElementsByClassName(names: string): Element[]
- getElementsByTagName(tagName: string): Element[]

