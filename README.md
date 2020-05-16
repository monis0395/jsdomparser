# JSDomParser
HTML parser and serializer with DOM APIs.

# Motivation
JSDOM library can be used in webworkers but the size of the library is too large to just use it as a proxy for DOM. Thus created a small library which uses the same parser as jsdom with minimal DOM APIs

# APIs
## Document
- documentElement
- head
- body
- createElement(lowerName: string)
- createTextNode(data: string)
- documentURI
- baseURI
- getElementById(id: string)
- getElementsByName(name: string)
- getElementsByClassName(names: string)
- getElementsByTagName(tagName: string)

