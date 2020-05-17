var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
}
define("types/types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Parsers = void 0;
    var Parsers;
    (function (Parsers) {
        Parsers["htmlparser2"] = "htmlparser2";
        Parsers["parse5"] = "parse5";
    })(Parsers = exports.Parsers || (exports.Parsers = {}));
});
define("nodes/contracts/type", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DocumentMode = exports.NodeType = void 0;
    var NodeType;
    (function (NodeType) {
        NodeType[NodeType["ELEMENT_NODE"] = 1] = "ELEMENT_NODE";
        NodeType[NodeType["TEXT_NODE"] = 3] = "TEXT_NODE";
        NodeType[NodeType["COMMENT_NODE"] = 8] = "COMMENT_NODE";
        NodeType[NodeType["DOCUMENT_NODE"] = 9] = "DOCUMENT_NODE";
        NodeType[NodeType["DOCUMENT_TYPE_NODE"] = 10] = "DOCUMENT_TYPE_NODE";
        NodeType[NodeType["DOCUMENT_FRAGMENT_NODE"] = 11] = "DOCUMENT_FRAGMENT_NODE";
    })(NodeType = exports.NodeType || (exports.NodeType = {}));
    var DocumentMode;
    (function (DocumentMode) {
        DocumentMode["NO_QUIRKS"] = "no-quirks";
        DocumentMode["QUIRKS"] = "quirks";
        DocumentMode["LIMITED_QUIRKS"] = "limited-quirks";
    })(DocumentMode = exports.DocumentMode || (exports.DocumentMode = {}));
});
define("nodes/tree-traversing", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getAttrList = exports.getParentNode = exports.getChildNodes = exports.getFirstChild = void 0;
    exports.getFirstChild = (node) => {
        return node.firstChild;
    };
    exports.getChildNodes = (node) => {
        return node.childNodes;
    };
    exports.getParentNode = (node) => {
        return node.parentNode;
    };
    exports.getAttrList = (element) => {
        return Object.keys(element.attribs).map((name) => {
            return {
                name,
                value: element.attribs[name],
            };
        });
    };
});
define("nodes/documentType", ["require", "exports", "nodes/node"], function (require, exports, node_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DocumentType = void 0;
    class DocumentType extends node_1.Node {
        constructor(props) {
            super(props);
        }
    }
    exports.DocumentType = DocumentType;
});
define("nodes/tree-mutation", ["require", "exports", "nodes/node-contruction", "nodes/node-types"], function (require, exports, node_contruction_1, node_types_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.adoptAttributes = exports.getTemplateContent = exports.setTemplateContent = exports.insertTextBefore = exports.insertText = exports.replaceChild = exports.detachNode = exports.insertBefore = exports.appendChild = void 0;
    function resetNode(node) {
        node.previousSibling = null;
        node.nextSibling = null;
        node.previousElementSibling = null;
        node.nextElementSibling = null;
        node.parentNode = null;
    }
    function appendChild(parentNode, newNode) {
        detachNode(newNode);
        const lastChild = parentNode.lastChild;
        if (lastChild) {
            lastChild.nextSibling = newNode;
            newNode.previousSibling = lastChild;
        }
        const lastElement = parentNode.lastElementChild;
        newNode.previousElementSibling = lastElement;
        if (node_types_1.isElementNode(newNode)) {
            parentNode.children.push(newNode);
            if (lastElement) {
                lastElement.nextElementSibling = newNode;
            }
            if (lastChild) {
                lastChild.nextElementSibling = newNode;
            }
        }
        parentNode.childNodes.push(newNode);
        newNode.parentNode = parentNode;
        newNode.setOwnerDocument(parentNode.ownerDocument);
    }
    exports.appendChild = appendChild;
    function insertBefore(parentNode, newNode, referenceNode) {
        detachNode(newNode);
        const insertionIdx = parentNode.childNodes.indexOf(referenceNode);
        const prev = referenceNode.previousSibling;
        const prevElement = referenceNode.previousElementSibling || null;
        if (prev) {
            prev.nextSibling = newNode;
            newNode.previousSibling = prev;
        }
        if (node_types_1.isElementNode(newNode)) {
            if (prevElement) {
                prevElement.nextElementSibling = newNode;
                newNode.previousElementSibling = prevElement;
            }
            referenceNode.previousElementSibling = newNode;
            if (node_types_1.isElementNode(referenceNode)) {
                newNode.nextElementSibling = referenceNode;
                const index = parentNode.children.indexOf(referenceNode);
                parentNode.children.splice(index, 0, newNode);
            }
        }
        referenceNode.previousSibling = newNode;
        newNode.nextSibling = referenceNode;
        parentNode.childNodes.splice(insertionIdx, 0, newNode);
        newNode.parentNode = parentNode;
        newNode.setOwnerDocument(parentNode.ownerDocument);
    }
    exports.insertBefore = insertBefore;
    function detachNode(node) {
        if (!node.parentNode) {
            return null;
        }
        const idx = node.parentNode.childNodes.indexOf(node);
        const prev = node.previousSibling;
        const next = node.nextSibling;
        const prevElement = node.previousElementSibling || null;
        const nextElement = node.nextElementSibling || null;
        if (prev) {
            prev.nextSibling = next;
        }
        if (next) {
            next.previousSibling = prev;
        }
        if (node_types_1.isElementNode(node)) {
            if (prevElement) {
                prevElement.nextElementSibling = nextElement;
            }
            if (nextElement) {
                nextElement.previousElementSibling = prevElement;
            }
            node.parentNode.children.splice(node.parentNode.children.indexOf(node), 1);
        }
        node.parentNode.childNodes.splice(idx, 1);
        resetNode(node);
        return node;
    }
    exports.detachNode = detachNode;
    function replaceChild(parentNode, oldNode, newNode) {
        const childIndex = parentNode.childNodes.indexOf(oldNode);
        if (childIndex === -1) {
            throw new Error('replaceChild: node not found');
        }
        detachNode(newNode);
        parentNode.childNodes[childIndex] = newNode;
        const previousSibling = oldNode.previousSibling || null;
        const nextSibling = oldNode.nextSibling || null;
        newNode.previousSibling = previousSibling;
        newNode.nextSibling = nextSibling;
        if (previousSibling) {
            previousSibling.nextSibling = newNode;
        }
        if (nextSibling) {
            nextSibling.previousSibling = newNode;
        }
        const previousElementSibling = oldNode.previousElementSibling || null;
        const nextElementSibling = oldNode.nextElementSibling || null;
        newNode.previousElementSibling = previousElementSibling;
        newNode.nextElementSibling = nextElementSibling;
        if (node_types_1.isElementNode(newNode)) {
            if (previousSibling) {
                previousSibling.nextElementSibling = newNode;
            }
            if (nextSibling) {
                nextSibling.previousElementSibling = newNode;
            }
            if (previousElementSibling) {
                previousElementSibling.nextElementSibling = newNode;
            }
            if (nextElementSibling) {
                nextElementSibling.previousElementSibling = newNode;
            }
            if (node_types_1.isElementNode(oldNode)) {
                parentNode.children[parentNode.children.indexOf(oldNode)] = newNode;
            }
            else {
                const insertionIdx = parentNode.children.indexOf(newNode.nextElementSibling);
                if (insertionIdx !== -1) {
                    parentNode.children.splice(insertionIdx, 0, newNode);
                }
                else {
                    parentNode.children.push(newNode);
                }
            }
        }
        if (!node_types_1.isElementNode(newNode) && node_types_1.isElementNode(oldNode)) {
            if (previousElementSibling) {
                previousElementSibling.nextElementSibling = nextElementSibling;
            }
            if (nextElementSibling) {
                nextElementSibling.previousElementSibling = previousElementSibling;
            }
            oldNode.parentNode.children.splice(oldNode.parentNode.children.indexOf(oldNode), 1);
        }
        newNode.parentNode = oldNode.parentNode;
        newNode.setOwnerDocument(parentNode.ownerDocument);
        resetNode(oldNode);
        return oldNode;
    }
    exports.replaceChild = replaceChild;
    function insertText(parentNode, text) {
        const lastChild = parentNode.lastChild;
        if (lastChild && node_types_1.isTextNode(lastChild)) {
            lastChild.nodeValue += text;
        }
        else {
            appendChild(parentNode, node_contruction_1.createTextNode(text));
        }
    }
    exports.insertText = insertText;
    function insertTextBefore(parentNode, text, referenceNode) {
        const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
        if (prevNode && node_types_1.isTextNode(prevNode)) {
            prevNode.nodeValue += text;
        }
        else {
            insertBefore(parentNode, node_contruction_1.createTextNode(text), referenceNode);
        }
    }
    exports.insertTextBefore = insertTextBefore;
    function setTemplateContent(templateElement, contentElement) {
        appendChild(templateElement, contentElement);
    }
    exports.setTemplateContent = setTemplateContent;
    function getTemplateContent(templateElement) {
        return templateElement.childNodes[0];
    }
    exports.getTemplateContent = getTemplateContent;
    /**
     * Copies attributes to the given element. Only attributes that are not yet present in the element are copied.
     *
     * @param recipient - Element to copy attributes into.
     * @param attrs - Attributes to copy.
     */
    function adoptAttributes(recipient, attrs) {
        for (const { name, value } of attrs)
            if (typeof recipient.attribs[name] === 'undefined') {
                recipient.attribs[name] = value;
            }
    }
    exports.adoptAttributes = adoptAttributes;
});
define("nodes/node-contruction", ["require", "exports", "parse5/lib/common/doctype", "nodes/contracts/type", "nodes/node", "nodes/document", "nodes/element", "nodes/node-types", "nodes/documentType", "nodes/tree-mutation"], function (require, exports, doctype_1, type_1, node_2, document_1, element_1, node_types_2, documentType_1, tree_mutation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createTextNode = exports.createCommentNode = exports.createDirectiveNode = exports.setDocumentType = exports.createElement = exports.createDocumentFragment = exports.createDocument = void 0;
    exports.createDocument = () => {
        return new document_1.Document({
            type: 'root',
            nodeType: type_1.NodeType.DOCUMENT_NODE,
            localName: '',
            parentNode: null,
            previousSibling: null,
            nextSibling: null,
            childNodes: [],
            children: [],
            mode: type_1.DocumentMode.NO_QUIRKS,
        });
    };
    exports.createDocumentFragment = () => {
        return new node_2.Node({
            type: 'root',
            nodeType: type_1.NodeType.DOCUMENT_FRAGMENT_NODE,
            localName: '',
            childNodes: [],
            children: [],
            parentNode: null,
            previousSibling: null,
            nextSibling: null,
        });
    };
    exports.createElement = (tagName, namespaceURI, attrs) => {
        let attribs = Object.create(null);
        if (Array.isArray(attrs)) {
            for (const { name, value } of attrs) {
                // right now optional params are missing for attributes
                attribs[name] = value;
            }
        }
        else {
            attribs = attrs;
        }
        return new element_1.Element({
            type: tagName === 'script' || tagName === 'style' ? tagName : 'tag',
            nodeType: type_1.NodeType.ELEMENT_NODE,
            localName: tagName,
            namespaceURI,
            attribs,
            childNodes: [],
            children: [],
            parentNode: null,
            previousSibling: null,
            nextSibling: null,
        });
    };
    exports.setDocumentType = (document, name, publicId, systemId) => {
        const nodeValue = doctype_1.serializeContent(name, publicId, systemId);
        let doctypeNode = null;
        for (const node of document.childNodes) {
            if (node_types_2.isDocumentTypeNode(node)) {
                doctypeNode = node;
                break;
            }
        }
        if (doctypeNode) {
            doctypeNode.nodeValue = nodeValue;
            doctypeNode.name = name;
            doctypeNode.publicId = publicId;
            doctypeNode.systemId = systemId;
        }
        else {
            tree_mutation_1.appendChild(document, exports.createDirectiveNode(name, nodeValue, publicId, systemId));
        }
    };
    exports.createDirectiveNode = (name, nodeValue, publicId, systemId) => {
        return new documentType_1.DocumentType({
            type: 'directive',
            nodeType: type_1.NodeType.DOCUMENT_TYPE_NODE,
            localName: '!doctype',
            parentNode: null,
            previousSibling: null,
            nextSibling: null,
            nodeValue,
            name,
            publicId,
            systemId,
        });
    };
    exports.createCommentNode = (data) => {
        return new node_2.Node({
            type: 'comment',
            nodeType: type_1.NodeType.COMMENT_NODE,
            nodeValue: data,
            parentNode: null,
            previousSibling: null,
            nextSibling: null,
        });
    };
    exports.createTextNode = (data) => {
        return new node_2.Node({
            type: 'text',
            nodeType: type_1.NodeType.TEXT_NODE,
            nodeValue: data,
            parentNode: null,
            previousSibling: null,
            nextSibling: null,
        });
    };
});
define("nodes/document", ["require", "exports", "nodes/node", "nodes/node-contruction", "nodes/domutils/legacy", "url"], function (require, exports, node_3, node_contruction_2, legacy, url_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Document = void 0;
    class Document extends node_3.Node {
        constructor(props) {
            super(props);
        }
        get documentElement() {
            return this.firstElementChild;
        }
        get head() {
            return this.getElementsByTagName("head")[0];
        }
        get body() {
            return this.getElementsByTagName("body")[0];
        }
        createElement(lowerName) {
            const element = node_contruction_2.createElement(lowerName, "", []);
            element.setOwnerDocument(this);
            return element;
        }
        createTextNode(data) {
            const textNode = node_contruction_2.createTextNode(data);
            textNode.setOwnerDocument(this);
            return textNode;
        }
        get documentURI() {
            return this._documentURI;
        }
        get baseURI() {
            if (this._baseURI || this._baseURI === '') {
                return this._baseURI;
            }
            this._baseURI = this.documentURI;
            try {
                const baseElements = this.getElementsByTagName('base');
                const href = baseElements[0].getAttribute('href');
                if (href) {
                    this._baseURI = (new url_1.URL(href, this._baseURI)).href;
                }
            }
            catch (ex) { /* Just fall back to documentURI */
            }
            return this._baseURI;
        }
        getElementById(id) {
            return legacy.getElementById(id, this.childNodes);
        }
        getElementsByName(name) {
            return legacy.getElementsByName(name, this.childNodes);
        }
        getElementsByClassName(names) {
            return legacy.getElementsByClassName(names, this.childNodes);
        }
        getElementsByTagName(tagName) {
            return legacy.getElementsByTagName(tagName, this.childNodes, true);
        }
    }
    exports.Document = Document;
});
define("nodes/node-types", ["require", "exports", "nodes/contracts/type"], function (require, exports, type_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isDocument = exports.isElementNode = exports.isDocumentTypeNode = exports.isCommentNode = exports.isTextNode = void 0;
    function isTextNode(node) {
        return node.nodeType === type_2.NodeType.TEXT_NODE;
    }
    exports.isTextNode = isTextNode;
    function isCommentNode(node) {
        return node.nodeType === type_2.NodeType.COMMENT_NODE;
    }
    exports.isCommentNode = isCommentNode;
    function isDocumentTypeNode(node) {
        return node.nodeType === type_2.NodeType.DOCUMENT_TYPE_NODE;
    }
    exports.isDocumentTypeNode = isDocumentTypeNode;
    function isElementNode(node) {
        return node.nodeType === type_2.NodeType.ELEMENT_NODE;
    }
    exports.isElementNode = isElementNode;
    function isDocument(node) {
        if (node) {
            return node.nodeType === type_2.NodeType.DOCUMENT_NODE;
        }
        return false;
    }
    exports.isDocument = isDocument;
});
define("nodes/domutils/querying", ["require", "exports", "nodes/node-types"], function (require, exports, node_types_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.findAll = exports.existsOne = exports.findOne = exports.findOneChild = exports.find = exports.filter = void 0;
    /**
     * Search a node and its children for nodes passing a test function.
     *
     * @param test Function to test nodes on.
     * @param node Element to search. Will be included in the result set if it matches.
     * @param recurse Also consider child nodes.
     * @param limit Maximum number of nodes to return.
     */
    function filter(test, node, recurse = true, limit = Infinity) {
        if (!Array.isArray(node))
            node = [node];
        return find(test, node, recurse, limit);
    }
    exports.filter = filter;
    /**
     * Like `filter`, but only works on an array of nodes.
     *
     * @param test Function to test nodes on.
     * @param nodes Array of nodes to search.
     * @param recurse Also consider child nodes.
     * @param limit Maximum number of nodes to return.
     */
    function find(test, nodes, recurse, limit) {
        const result = [];
        for (const elem of nodes) {
            if (test(elem)) {
                result.push(elem);
                if (--limit <= 0)
                    break;
            }
            if (recurse && elem.childNodes && elem.childNodes.length > 0) {
                const children = find(test, elem.childNodes, recurse, limit);
                result.push(...children);
                limit -= children.length;
                if (limit <= 0)
                    break;
            }
        }
        return result;
    }
    exports.find = find;
    /**
     * Finds the first element inside of an array that matches a test function.
     *
     * @param test Function to test nodes on.
     * @param nodes Array of nodes to search.
     */
    function findOneChild(test, nodes) {
        return nodes.find(test);
    }
    exports.findOneChild = findOneChild;
    /**
     * Finds one element in a tree that passes a test.
     *
     * @param test Function to test nodes on.
     * @param nodes Array of nodes to search.
     * @param recurse Also consider child nodes.
     */
    function findOne(test, nodes, recurse = true) {
        let elem = null;
        for (let i = 0; i < nodes.length && !elem; i++) {
            const checked = nodes[i];
            if (!node_types_3.isElementNode(checked)) {
                continue;
            }
            else if (test(checked)) {
                elem = checked;
            }
            else if (recurse && checked.childNodes.length > 0) {
                elem = findOne(test, checked.childNodes);
            }
        }
        return elem;
    }
    exports.findOne = findOne;
    /**
     * Returns whether a tree of nodes contains at least one node passing a test.
     *
     * @param test Function to test nodes on.
     * @param nodes Array of nodes to search.
     */
    function existsOne(test, nodes) {
        return nodes.some((checked) => node_types_3.isElementNode(checked) &&
            (test(checked) ||
                (checked.childNodes.length > 0 &&
                    existsOne(test, checked.childNodes))));
    }
    exports.existsOne = existsOne;
    /**
     * Search and array of nodes and its children for nodes passing a test function.
     *
     * Same as `find`, only with less options, leading to reduced complexity.
     *
     * @param test Function to test nodes on.
     * @param nodes Array of nodes to search.
     */
    function findAll(test, nodes) {
        var _a;
        const result = [];
        const stack = nodes.filter(node_types_3.isElementNode);
        let elem = stack.shift();
        while (elem) {
            const children = (_a = elem.childNodes) === null || _a === void 0 ? void 0 : _a.filter(node_types_3.isElementNode);
            if (children && children.length > 0) {
                stack.unshift(...children);
            }
            if (test(elem))
                result.push(elem);
            elem = stack.shift();
        }
        return result;
    }
    exports.findAll = findAll;
});
define("nodes/domutils/legacy", ["require", "exports", "nodes/domutils/querying", "nodes/node-types"], function (require, exports, querying_1, node_types_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getElementsByTagName = exports.getElementsByName = exports.getElementsByClassName = exports.getElementById = exports.getElements = exports.testElement = void 0;
    /* eslint-disable @typescript-eslint/camelcase */
    const Checks = {
        tag_name(name) {
            if (typeof name === "function") {
                return (elem) => node_types_4.isElementNode(elem) && name(elem.localName);
            }
            else if (name === "*") {
                return node_types_4.isElementNode;
            }
            else {
                return (elem) => node_types_4.isElementNode(elem) && elem.localName === name;
            }
        },
        tag_contains(data) {
            if (typeof data === "function") {
                return (elem) => node_types_4.isTextNode(elem) && data(elem.nodeValue);
            }
            else {
                return (elem) => node_types_4.isTextNode(elem) && elem.nodeValue === data;
            }
        },
    };
    function getAttribCheck(attrib, value) {
        if (typeof value === "function") {
            return (elem) => node_types_4.isElementNode(elem) && value(elem.attribs[attrib]);
        }
        else {
            return (elem) => node_types_4.isElementNode(elem) && elem.attribs[attrib] === value;
        }
    }
    function combineFuncs(a, b) {
        return (elem) => a(elem) || b(elem);
    }
    function compileTest(options) {
        const funcs = Object.keys(options).map((key) => {
            const value = options[key];
            return key in Checks
                ? Checks[key](value)
                : getAttribCheck(key, value);
        });
        return funcs.length === 0 ? null : funcs.reduce(combineFuncs);
    }
    function testElement(options, element) {
        const test = compileTest(options);
        return test ? test(element) : true;
    }
    exports.testElement = testElement;
    function getElements(options, element, recurse, limit = Infinity) {
        const test = compileTest(options);
        return test ? querying_1.filter(test, element, recurse, limit) : [];
    }
    exports.getElements = getElements;
    function getElementById(id, element, recurse = true) {
        if (!Array.isArray(element))
            element = [element];
        return querying_1.findOne(getAttribCheck("id", id), element, recurse);
    }
    exports.getElementById = getElementById;
    function getElementsByClassName(names, element, recurse = true, limit = Infinity) {
        return querying_1.filter(getAttribCheck("class", (value) => value && value.includes(names)), element, recurse, limit);
    }
    exports.getElementsByClassName = getElementsByClassName;
    function getElementsByName(name, element, recurse = true, limit = Infinity) {
        return querying_1.filter(getAttribCheck("name", name), element, recurse, limit);
    }
    exports.getElementsByName = getElementsByName;
    function getElementsByTagName(name, element, recurse, limit = Infinity) {
        return querying_1.filter(Checks.tag_name(name), element, recurse, limit);
    }
    exports.getElementsByTagName = getElementsByTagName;
});
define("nodes/style", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Style = void 0;
    class Style {
        constructor(node) {
            this.node = node;
        }
        getStyle(styleName) {
            const attr = this.node.getAttribute('style');
            if (!attr)
                return undefined;
            const styles = attr.split(';');
            for (const style of styles) {
                const [name, value] = style.split(':');
                if (name === styleName)
                    return value.trim();
            }
            return undefined;
        }
        setStyle(styleName, styleValue) {
            let value = this.node.getAttribute('style') || '';
            let index = 0;
            do {
                const next = value.indexOf(';', index) + 1;
                const length = next - index - 1;
                const style = (length > 0 ? value.substr(index, length) : value.substr(index));
                if (style.substr(0, style.indexOf(':')).trim() === styleName) {
                    value = value.substr(0, index).trim() + (next ? ' ' + value.substr(next).trim() : '');
                    break;
                }
                index = next;
            } while (index);
            value += ' ' + styleName + ': ' + styleValue + ';';
            this.node.setAttribute('style', value.trim());
        }
    }
    exports.Style = Style;
    // When a style is set in JS, map it to the corresponding CSS attribute
    const styleMap = {
        'alignmentBaseline': 'alignment-baseline',
        'background': 'background',
        'backgroundAttachment': 'background-attachment',
        'backgroundClip': 'background-clip',
        'backgroundColor': 'background-color',
        'backgroundImage': 'background-image',
        'backgroundOrigin': 'background-origin',
        'backgroundPosition': 'background-position',
        'backgroundPositionX': 'background-position-x',
        'backgroundPositionY': 'background-position-y',
        'backgroundRepeat': 'background-repeat',
        'backgroundRepeatX': 'background-repeat-x',
        'backgroundRepeatY': 'background-repeat-y',
        'backgroundSize': 'background-size',
        'baselineShift': 'baseline-shift',
        'border': 'border',
        'borderBottom': 'border-bottom',
        'borderBottomColor': 'border-bottom-color',
        'borderBottomLeftRadius': 'border-bottom-left-radius',
        'borderBottomRightRadius': 'border-bottom-right-radius',
        'borderBottomStyle': 'border-bottom-style',
        'borderBottomWidth': 'border-bottom-width',
        'borderCollapse': 'border-collapse',
        'borderColor': 'border-color',
        'borderImage': 'border-image',
        'borderImageOutset': 'border-image-outset',
        'borderImageRepeat': 'border-image-repeat',
        'borderImageSlice': 'border-image-slice',
        'borderImageSource': 'border-image-source',
        'borderImageWidth': 'border-image-width',
        'borderLeft': 'border-left',
        'borderLeftColor': 'border-left-color',
        'borderLeftStyle': 'border-left-style',
        'borderLeftWidth': 'border-left-width',
        'borderRadius': 'border-radius',
        'borderRight': 'border-right',
        'borderRightColor': 'border-right-color',
        'borderRightStyle': 'border-right-style',
        'borderRightWidth': 'border-right-width',
        'borderSpacing': 'border-spacing',
        'borderStyle': 'border-style',
        'borderTop': 'border-top',
        'borderTopColor': 'border-top-color',
        'borderTopLeftRadius': 'border-top-left-radius',
        'borderTopRightRadius': 'border-top-right-radius',
        'borderTopStyle': 'border-top-style',
        'borderTopWidth': 'border-top-width',
        'borderWidth': 'border-width',
        'bottom': 'bottom',
        'boxShadow': 'box-shadow',
        'boxSizing': 'box-sizing',
        'captionSide': 'caption-side',
        'clear': 'clear',
        'clip': 'clip',
        'clipPath': 'clip-path',
        'clipRule': 'clip-rule',
        'color': 'color',
        'colorInterpolation': 'color-interpolation',
        'colorInterpolationFilters': 'color-interpolation-filters',
        'colorProfile': 'color-profile',
        'colorRendering': 'color-rendering',
        'content': 'content',
        'counterIncrement': 'counter-increment',
        'counterReset': 'counter-reset',
        'cursor': 'cursor',
        'direction': 'direction',
        'display': 'display',
        'dominantBaseline': 'dominant-baseline',
        'emptyCells': 'empty-cells',
        'enableBackground': 'enable-background',
        'fill': 'fill',
        'fillOpacity': 'fill-opacity',
        'fillRule': 'fill-rule',
        'filter': 'filter',
        'cssFloat': 'float',
        'floodColor': 'flood-color',
        'floodOpacity': 'flood-opacity',
        'font': 'font',
        'fontFamily': 'font-family',
        'fontSize': 'font-size',
        'fontStretch': 'font-stretch',
        'fontStyle': 'font-style',
        'fontVariant': 'font-variant',
        'fontWeight': 'font-weight',
        'glyphOrientationHorizontal': 'glyph-orientation-horizontal',
        'glyphOrientationVertical': 'glyph-orientation-vertical',
        'height': 'height',
        'imageRendering': 'image-rendering',
        'kerning': 'kerning',
        'left': 'left',
        'letterSpacing': 'letter-spacing',
        'lightingColor': 'lighting-color',
        'lineHeight': 'line-height',
        'listStyle': 'list-style',
        'listStyleImage': 'list-style-image',
        'listStylePosition': 'list-style-position',
        'listStyleType': 'list-style-type',
        'margin': 'margin',
        'marginBottom': 'margin-bottom',
        'marginLeft': 'margin-left',
        'marginRight': 'margin-right',
        'marginTop': 'margin-top',
        'marker': 'marker',
        'markerEnd': 'marker-end',
        'markerMid': 'marker-mid',
        'markerStart': 'marker-start',
        'mask': 'mask',
        'maxHeight': 'max-height',
        'maxWidth': 'max-width',
        'minHeight': 'min-height',
        'minWidth': 'min-width',
        'opacity': 'opacity',
        'orphans': 'orphans',
        'outline': 'outline',
        'outlineColor': 'outline-color',
        'outlineOffset': 'outline-offset',
        'outlineStyle': 'outline-style',
        'outlineWidth': 'outline-width',
        'overflow': 'overflow',
        'overflowX': 'overflow-x',
        'overflowY': 'overflow-y',
        'padding': 'padding',
        'paddingBottom': 'padding-bottom',
        'paddingLeft': 'padding-left',
        'paddingRight': 'padding-right',
        'paddingTop': 'padding-top',
        'page': 'page',
        'pageBreakAfter': 'page-break-after',
        'pageBreakBefore': 'page-break-before',
        'pageBreakInside': 'page-break-inside',
        'pointerEvents': 'pointer-events',
        'position': 'position',
        'quotes': 'quotes',
        'resize': 'resize',
        'right': 'right',
        'shapeRendering': 'shape-rendering',
        'size': 'size',
        'speak': 'speak',
        'src': 'src',
        'stopColor': 'stop-color',
        'stopOpacity': 'stop-opacity',
        'stroke': 'stroke',
        'strokeDasharray': 'stroke-dasharray',
        'strokeDashoffset': 'stroke-dashoffset',
        'strokeLinecap': 'stroke-linecap',
        'strokeLinejoin': 'stroke-linejoin',
        'strokeMiterlimit': 'stroke-miterlimit',
        'strokeOpacity': 'stroke-opacity',
        'strokeWidth': 'stroke-width',
        'tableLayout': 'table-layout',
        'textAlign': 'text-align',
        'textAnchor': 'text-anchor',
        'textDecoration': 'text-decoration',
        'textIndent': 'text-indent',
        'textLineThrough': 'text-line-through',
        'textLineThroughColor': 'text-line-through-color',
        'textLineThroughMode': 'text-line-through-mode',
        'textLineThroughStyle': 'text-line-through-style',
        'textLineThroughWidth': 'text-line-through-width',
        'textOverflow': 'text-overflow',
        'textOverline': 'text-overline',
        'textOverlineColor': 'text-overline-color',
        'textOverlineMode': 'text-overline-mode',
        'textOverlineStyle': 'text-overline-style',
        'textOverlineWidth': 'text-overline-width',
        'textRendering': 'text-rendering',
        'textShadow': 'text-shadow',
        'textTransform': 'text-transform',
        'textUnderline': 'text-underline',
        'textUnderlineColor': 'text-underline-color',
        'textUnderlineMode': 'text-underline-mode',
        'textUnderlineStyle': 'text-underline-style',
        'textUnderlineWidth': 'text-underline-width',
        'top': 'top',
        'unicodeBidi': 'unicode-bidi',
        'unicodeRange': 'unicode-range',
        'vectorEffect': 'vector-effect',
        'verticalAlign': 'vertical-align',
        'visibility': 'visibility',
        'whiteSpace': 'white-space',
        'widows': 'widows',
        'width': 'width',
        'wordBreak': 'word-break',
        'wordSpacing': 'word-spacing',
        'wordWrap': 'word-wrap',
        'writingMode': 'writing-mode',
        'zIndex': 'z-index',
        'zoom': 'zoom'
    };
    // For each item in styleMap, define a getter and setter on the style property.
    for (const jsName in styleMap) {
        // @ts-ignore
        const cssName = styleMap[jsName];
        Object.defineProperty(Style, jsName, {
            get() {
                const style = this;
                return style.getStyle(cssName);
            },
            set(value) {
                const style = this;
                style.setStyle(cssName, value);
            },
            enumerable: false,
            configurable: true
        });
    }
});
define("nodes/element", ["require", "exports", "nodes/node", "nodes/tree-traversing", "index", "nodes/domutils/legacy", "nodes/style"], function (require, exports, node_4, tree_traversing_1, index_1, legacy, style_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Element = void 0;
    class Element extends node_4.Node {
        constructor(props) {
            super(props);
            this.style = new style_1.Style(this);
        }
        get attributes() {
            return tree_traversing_1.getAttrList(this);
        }
        get className() {
            return this.getAttribute("class");
        }
        set className(classNames) {
            this.setAttribute("class", classNames);
        }
        get id() {
            return this.getAttribute("id");
        }
        set id(id) {
            this.setAttribute("id", id);
        }
        getAttribute(name) {
            return this.attribs[name] || null;
        }
        hasAttribute(name) {
            return this.getAttribute(name) !== null;
        }
        setAttribute(name, value) {
            this.attribs[name] = value;
            return value;
        }
        removeAttribute(name) {
            delete this.attribs[name];
        }
        get innerHTML() {
            return index_1.serializeDom(this);
        }
        set innerHTML(htmlString) {
            const document = index_1.parseDom(htmlString);
            const node = document;
            while (this.childNodes.length) {
                this.removeChild(this.childNodes[0]);
            }
            while (node.childNodes.length) {
                this.appendChild(node.childNodes[0]);
            }
        }
        getElementsByClassName(names) {
            return legacy.getElementsByClassName(names, this.childNodes);
        }
        getElementsByTagName(tagName) {
            return legacy.getElementsByTagName(tagName, this.childNodes, true);
        }
    }
    exports.Element = Element;
    const elementAttributes = ["href", "src", "srcset"];
    elementAttributes.forEach((name) => {
        Object.defineProperty(Element.prototype, name, {
            get() {
                return this.getAttribute(name);
            },
            set(value) {
                return this.setAttribute(name, value);
            },
        });
    });
});
define("nodes/node", ["require", "exports", "nodes/contracts/type", "nodes/node-types", "nodes/tree-mutation", "entities"], function (require, exports, type_3, node_types_5, tree_mutation_2, entities_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Node = void 0;
    class Node {
        constructor(props) {
            this.parentNode = null;
            this.previousSibling = null;
            this.nextSibling = null;
            this.previousElementSibling = null;
            this.nextElementSibling = null;
            for (const key of Object.keys(props)) {
                // @ts-ignore
                this[key] = props[key];
            }
            this.localName = (this.localName || "").toLowerCase();
            this.childNodes = this.childNodes || [];
            this.children = this.childNodes.filter(node_types_5.isElementNode);
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
            if (this._tagName) {
                return this._tagName;
            }
            this._tagName = this.localName.toUpperCase();
            return this._tagName;
        }
        get textContent() {
            if (this.nodeType === type_3.NodeType.TEXT_NODE) {
                return this.nodeValue;
            }
            function getText(node) {
                node.childNodes.forEach((child) => {
                    if (node_types_5.isTextNode(child)) {
                        text.push(entities_1.decode(child.nodeValue));
                    }
                    else {
                        getText(child);
                    }
                });
            }
            const text = [];
            getText(this);
            return text.join("");
        }
        set textContent(data) {
            if (node_types_5.isTextNode(this)) {
                this.nodeValue = data;
                return;
            }
            // clear parentNodes for existing children
            for (let i = this.childNodes.length; --i >= 0;) {
                this.childNodes[i].parentNode = null;
            }
            const node = this.ownerDocument.createTextNode(data);
            this.childNodes = [node];
            this.children = [];
            node.parentNode = this;
        }
        get ownerDocument() {
            if (this._ownerDocument) {
                return this._ownerDocument;
            }
            if (node_types_5.isDocument(this)) {
                this._ownerDocument = null;
                return this._ownerDocument;
            }
            if (node_types_5.isDocument(this.parentNode)) {
                this._ownerDocument = this.parentNode;
                return this._ownerDocument;
            }
            return null;
        }
        setOwnerDocument(node) {
            this._ownerDocument = node;
        }
        appendChild(newNode) {
            tree_mutation_2.appendChild(this, newNode);
        }
        removeChild(node) {
            return tree_mutation_2.detachNode(node);
        }
        replaceChild(newNode, oldNode) {
            return tree_mutation_2.replaceChild(this, oldNode, newNode);
        }
    }
    exports.Node = Node;
    for (const nodeType in type_3.NodeType) {
        // @ts-ignore
        Node[nodeType] = Node.prototype[nodeType] = type_3.NodeType[nodeType];
    }
});
define("adapters/htmlparser2", ["require", "exports", "nodes/node-contruction", "nodes/node-types", "entities"], function (require, exports, node_contruction_3, node_types_6, entities_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JsDomHandler = void 0;
    const reWhitespace = /\s+/g;
    // Default options
    const defaultOpts = {
        normalizeWhitespace: false,
    };
    class JsDomHandler {
        /**
         * Initiate a new JsDomHandler.
         *
         * @param options Settings for the handler.
         */
        constructor(options) {
            /** The constructed DOM */
            this.dom = node_contruction_3.createDocument();
            /** Indicated whether parsing has been completed. */
            this._done = false;
            /** Stack of open tags. */
            this._tagStack = [];
            /** A data node that is still being written to. */
            this._lastNode = null;
            this._options = options || defaultOpts;
        }
        // Resets the handler back to starting state
        onreset() {
            this.dom = node_contruction_3.createDocument();
            this._done = false;
            this._tagStack = [];
            this._lastNode = null;
        }
        // Signals the handler that parsing is done
        onend() {
            if (this._done)
                return;
            this._done = true;
            this.handleCallback(null);
        }
        onerror(error) {
            this.handleCallback(error);
        }
        onclosetag() {
            this._lastNode = null;
            const elem = this._tagStack.pop();
            if (!elem) {
                return;
            }
        }
        onopentag(name, attribs) {
            const element = node_contruction_3.createElement(name, "", attribs);
            this.addNode(element);
            this._tagStack.push(element);
        }
        ontext(data) {
            const normalize = this._options.normalizeWhitespace;
            const { _lastNode } = this;
            data = entities_2.decode(data);
            if (_lastNode && node_types_6.isElementNode(_lastNode)) {
                _lastNode.nodeValue += data;
            }
            else {
                const node = node_contruction_3.createTextNode(data);
                this.addNode(node);
                this._lastNode = node;
            }
            if (normalize) {
                _lastNode.nodeValue = _lastNode.nodeValue.replace(reWhitespace, " ");
            }
        }
        oncomment(data) {
            data = entities_2.decode(data);
            if (this._lastNode && node_types_6.isCommentNode(this._lastNode)) {
                this._lastNode.nodeValue += data;
                return;
            }
            const node = node_contruction_3.createCommentNode(data);
            this.addNode(node);
            this._lastNode = node;
        }
        oncommentend() {
            this._lastNode = null;
        }
        onprocessinginstruction(name, data) {
            const node = node_contruction_3.createDirectiveNode(name, data);
            this.addNode(node);
        }
        handleCallback(error) {
            if (error) {
                throw error;
            }
        }
        addNode(node) {
            const parent = this._tagStack[this._tagStack.length - 1] || this.dom;
            parent.appendChild(node);
            this._lastNode = null;
        }
    }
    exports.JsDomHandler = JsDomHandler;
});
define("nodes/node-data", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getDocumentMode = exports.setDocumentMode = exports.getDocumentTypeNodeSystemId = exports.getDocumentTypeNodePublicId = exports.getDocumentTypeNodeName = exports.getCommentNodeContent = exports.getTextNodeContent = exports.getNamespaceURI = exports.getTagName = void 0;
    exports.getTagName = (element) => {
        return element.localName;
    };
    exports.getNamespaceURI = (element) => {
        return element.namespaceURI;
    };
    exports.getTextNodeContent = (textNode) => {
        return textNode.nodeValue;
    };
    exports.getCommentNodeContent = (commentNode) => {
        return commentNode.nodeValue;
    };
    exports.getDocumentTypeNodeName = (doctypeNode) => {
        return doctypeNode.name;
    };
    exports.getDocumentTypeNodePublicId = (doctypeNode) => {
        return doctypeNode.publicId;
    };
    exports.getDocumentTypeNodeSystemId = (doctypeNode) => {
        return doctypeNode.systemId;
    };
    exports.setDocumentMode = (document, mode) => {
        document.mode = mode;
    };
    exports.getDocumentMode = (document) => {
        return document.mode;
    };
});
define("nodes/source-code-location", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.updateNodeSourceCodeLocation = exports.getNodeSourceCodeLocation = exports.setNodeSourceCodeLocation = void 0;
    exports.setNodeSourceCodeLocation = (node, location) => {
        node.sourceCodeLocation = location;
    };
    exports.getNodeSourceCodeLocation = (node) => {
        return node.sourceCodeLocation;
    };
    exports.updateNodeSourceCodeLocation = (node, endLocation) => {
        node.sourceCodeLocation = Object.assign(node.sourceCodeLocation, endLocation);
    };
});
define("adapters/parse5", ["require", "exports", "nodes/node-contruction", "nodes/node-data", "nodes/node-types", "nodes/source-code-location", "nodes/tree-mutation", "nodes/tree-traversing"], function (require, exports, node_contruction_4, node_data_1, node_types_7, source_code_location_1, tree_mutation_3, tree_traversing_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(node_contruction_4, exports);
    __exportStar(node_data_1, exports);
    __exportStar(node_types_7, exports);
    __exportStar(source_code_location_1, exports);
    __exportStar(tree_mutation_3, exports);
    __exportStar(tree_traversing_2, exports);
});
define("index", ["require", "exports", "htmlparser2", "parse5", "adapters/htmlparser2", "adapters/parse5", "types/types", "nodes/contracts/type", "nodes/node", "nodes/document", "nodes/element"], function (require, exports, htmlparser2_1, parse5_1, htmlparser2_2, jsDomTreeAdapter, types_1, type_4, node_5, document_2, element_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serializeDom = exports.htmlparser2 = exports.parse5 = exports.parseDom = exports.nodes = void 0;
    exports.nodes = {
        Node: node_5.Node, NodeType: type_4.NodeType, Document: document_2.Document, Element: element_2.Element,
    };
    function parseDom(rawHTML, options = {}) {
        switch (options.parser) {
            default:
            case types_1.Parsers.htmlparser2:
                return htmlparser2(rawHTML, options);
            case types_1.Parsers.parse5:
                return parse5(rawHTML, options);
        }
    }
    exports.parseDom = parseDom;
    function parse5(rawHTML, options) {
        const document = parse5_1.parse(rawHTML, { treeAdapter: jsDomTreeAdapter });
        if (options && options.url) {
            document._documentURI = options.url;
        }
        return document;
    }
    exports.parse5 = parse5;
    function htmlparser2(data, options) {
        const handler = new htmlparser2_2.JsDomHandler(void 0);
        const document = handler.dom;
        new htmlparser2_1.Parser(handler).end(data);
        if (options && options.url) {
            document._documentURI = options.url;
        }
        return document;
    }
    exports.htmlparser2 = htmlparser2;
    function serializeDom(node) {
        return parse5_1.serialize(node, { treeAdapter: jsDomTreeAdapter });
    }
    exports.serializeDom = serializeDom;
});
