var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
define("nodes/contracts/type", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DocumentMode = exports.NodeName = exports.NodeType = void 0;
    var NodeType;
    (function (NodeType) {
        NodeType[NodeType["ELEMENT_NODE"] = 1] = "ELEMENT_NODE";
        NodeType[NodeType["TEXT_NODE"] = 3] = "TEXT_NODE";
        NodeType[NodeType["COMMENT_NODE"] = 8] = "COMMENT_NODE";
        NodeType[NodeType["DOCUMENT_NODE"] = 9] = "DOCUMENT_NODE";
        NodeType[NodeType["DOCUMENT_TYPE_NODE"] = 10] = "DOCUMENT_TYPE_NODE";
        NodeType[NodeType["DOCUMENT_FRAGMENT_NODE"] = 11] = "DOCUMENT_FRAGMENT_NODE";
    })(NodeType = exports.NodeType || (exports.NodeType = {}));
    var NodeName;
    (function (NodeName) {
        NodeName["TEXT_NODE"] = "#text";
        NodeName["COMMENT_NODE"] = "#comment";
        NodeName["DOCUMENT_NODE"] = "#document";
        NodeName["DOCUMENT_FRAGMENT_NODE"] = "#document-fragment";
    })(NodeName = exports.NodeName || (exports.NodeName = {}));
    var DocumentMode;
    (function (DocumentMode) {
        DocumentMode["NO_QUIRKS"] = "no-quirks";
        DocumentMode["QUIRKS"] = "quirks";
        DocumentMode["LIMITED_QUIRKS"] = "limited-quirks";
    })(DocumentMode = exports.DocumentMode || (exports.DocumentMode = {}));
});
define("nodes/tree-adapter/tree-traversing", ["require", "exports"], function (require, exports) {
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
define("nodes/document", ["require", "exports", "nodes/node", "nodes/tree-adapter/node-contruction", "nodes/domutils/legacy"], function (require, exports, node_1, node_contruction_1, legacy) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Document = void 0;
    legacy = __importStar(legacy);
    class Document extends node_1.Node {
        constructor(props) {
            super(props);
        }
        get body() {
            return this.getElementsByTagName("body")[0];
        }
        get childElementCount() {
            return this.children.length;
        }
        get documentElement() {
            return this.firstElementChild;
        }
        get documentURI() {
            return this._documentURI;
        }
        get head() {
            return this.getElementsByTagName("head")[0];
        }
        get title() {
            const titleTag = this.getElementsByTagName("title")[0];
            if (titleTag) {
                return titleTag.textContent;
            }
            return '';
        }
        set title(newTitle) {
            let titleTag = this.getElementsByTagName("title")[0];
            if (!titleTag && this.head) {
                titleTag = this.createElement('title');
                this.head.appendChild(titleTag);
            }
            if (titleTag) {
                titleTag.textContent = newTitle;
            }
        }
        createElement(lowerName) {
            const element = node_contruction_1.createElement(lowerName, "", []);
            element.setOwnerDocument(this);
            return element;
        }
        createTextNode(data) {
            const textNode = node_contruction_1.createTextNode(data);
            textNode.setOwnerDocument(this);
            return textNode;
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
define("nodes/documentType", ["require", "exports", "nodes/node"], function (require, exports, node_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DocumentType = void 0;
    class DocumentType extends node_2.Node {
        constructor(props) {
            super(props);
        }
    }
    exports.DocumentType = DocumentType;
});
define("nodes/tree-adapter/node-types", ["require", "exports", "nodes/contracts/type"], function (require, exports, type_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isDocument = exports.isElementNode = exports.isDocumentTypeNode = exports.isCommentNode = exports.isTextNode = void 0;
    function isTextNode(node) {
        return node.nodeType === type_1.NodeType.TEXT_NODE;
    }
    exports.isTextNode = isTextNode;
    function isCommentNode(node) {
        return node.nodeType === type_1.NodeType.COMMENT_NODE;
    }
    exports.isCommentNode = isCommentNode;
    function isDocumentTypeNode(node) {
        return node.nodeType === type_1.NodeType.DOCUMENT_TYPE_NODE;
    }
    exports.isDocumentTypeNode = isDocumentTypeNode;
    function isElementNode(node) {
        return !!node && node.nodeType === type_1.NodeType.ELEMENT_NODE;
    }
    exports.isElementNode = isElementNode;
    function isDocument(node) {
        if (node) {
            return node.nodeType === type_1.NodeType.DOCUMENT_NODE;
        }
        return false;
    }
    exports.isDocument = isDocument;
});
define("nodes/domutils/querying", ["require", "exports", "nodes/tree-adapter/node-types"], function (require, exports, node_types_1) {
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
            if (!node_types_1.isElementNode(checked)) {
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
        return nodes.some((checked) => node_types_1.isElementNode(checked) &&
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
        const stack = nodes.filter(node_types_1.isElementNode);
        let elem = stack.shift();
        while (elem) {
            const children = (_a = elem.childNodes) === null || _a === void 0 ? void 0 : _a.filter(node_types_1.isElementNode);
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
define("nodes/domutils/legacy", ["require", "exports", "nodes/domutils/querying", "nodes/tree-adapter/node-types"], function (require, exports, querying_1, node_types_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getElementsByTagName = exports.getElementsByName = exports.getElementsByClassName = exports.getElementById = exports.getElements = exports.testElement = void 0;
    /* eslint-disable @typescript-eslint/camelcase */
    const Checks = {
        tag_name(name) {
            if (typeof name === "function") {
                return (elem) => node_types_2.isElementNode(elem) && name(elem.localName);
            }
            else if (name === "*") {
                return node_types_2.isElementNode;
            }
            else {
                return (elem) => node_types_2.isElementNode(elem) && elem.localName === name;
            }
        },
        tag_contains(data) {
            if (typeof data === "function") {
                return (elem) => node_types_2.isTextNode(elem) && data(elem.nodeValue);
            }
            else {
                return (elem) => node_types_2.isTextNode(elem) && elem.nodeValue === data;
            }
        },
    };
    function getAttribCheck(attrib, value) {
        if (typeof value === "function") {
            return (elem) => node_types_2.isElementNode(elem) && value(elem.attribs[attrib]);
        }
        else {
            return (elem) => node_types_2.isElementNode(elem) && elem.attribs[attrib] === value;
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
        return querying_1.filter(getAttribCheck("class", (values) => {
            if (values && names) {
                const valuesArray = values.split(' '); // 10
                const namesArray = names.split(' '); // 2
                for (const name of namesArray) {
                    if (!name) {
                        continue;
                    }
                    if (valuesArray.indexOf(name) === -1) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }), element, recurse, limit);
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
    // todo: support cssText, priority eg: !important
    // todo: rename to CSSStyleDeclaration
    class Style {
        constructor(node) {
            this.node = node;
        }
        getPropertyValue(property) {
            const attr = this.node.getAttribute('style');
            if (!attr)
                return '';
            const styles = attr.split(';');
            for (const style of styles) {
                const [name, value] = style.split(':');
                if (name === property)
                    return value.trim();
            }
            return '';
        }
        setProperty(propertyName, value) {
            let _value = this.node.getAttribute('style') || '';
            let index = 0;
            do {
                const next = _value.indexOf(';', index) + 1;
                const length = next - index - 1;
                const style = (length > 0 ? _value.substr(index, length) : _value.substr(index));
                if (style.substr(0, style.indexOf(':')).trim() === propertyName) {
                    _value = _value.substr(0, index).trim() + (next ? ' ' + _value.substr(next).trim() : '');
                    break;
                }
                index = next;
            } while (index);
            _value += ' ' + propertyName + ': ' + value + ';';
            this.node.setAttribute('style', _value.trim());
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
    Object.keys(styleMap).forEach((jsName) => {
        const cssName = styleMap[jsName];
        Object.defineProperty(Style.prototype, jsName, {
            get() {
                return this.getPropertyValue(cssName);
            },
            set(value) {
                this.setProperty(cssName, value);
            },
            enumerable: false,
            configurable: true
        });
    });
});
define("nodes/element", ["require", "exports", "nodes/node", "nodes/tree-adapter/tree-traversing", "index", "nodes/domutils/legacy", "nodes/style"], function (require, exports, node_3, tree_traversing_1, index_1, legacy, style_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Element = void 0;
    legacy = __importStar(legacy);
    class Element extends node_3.Node {
        constructor(props) {
            super(props);
            this.style = new style_1.Style(this);
            this._localName = (this._localName || "").toLowerCase();
            this._tagName = this._localName.toUpperCase();
        }
        get attributes() {
            return tree_traversing_1.getAttrList(this);
        }
        get className() {
            return this.getAttribute("class") || '';
        }
        set className(classNames) {
            this.setAttribute("class", classNames);
        }
        get id() {
            return this.getAttribute("id") || '';
        }
        set id(id) {
            this.setAttribute("id", id);
        }
        getAttribute(name) {
            const value = this.attribs[name];
            if (typeof value === "string") {
                return value;
            }
            return null;
        }
        hasAttribute(name) {
            return this.getAttribute(name) !== null;
        }
        setAttribute(name, value) {
            this.attribs[name] = String(value);
            return value;
        }
        removeAttribute(name) {
            delete this.attribs[name];
        }
        get childElementCount() {
            return this.children.length;
        }
        get localName() {
            return this._localName;
        }
        get tagName() {
            return this._tagName;
        }
        get innerHTML() {
            return index_1.serializeDom(this);
        }
        set innerHTML(htmlString) {
            const document = index_1.parseDom(htmlString);
            // todo: handle head also
            const node = document.body;
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
                return this.getAttribute(name) || '';
            },
            set(value) {
                return this.setAttribute(name, value);
            },
        });
    });
});
define("nodes/tree-adapter/tree-mutation", ["require", "exports", "nodes/tree-adapter/node-contruction", "nodes/tree-adapter/node-types"], function (require, exports, node_contruction_2, node_types_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.adoptAttributes = exports.getTemplateContent = exports.setTemplateContent = exports.insertTextBefore = exports.insertText = exports.replaceChild = exports.insertBefore = exports.detachNode = exports.appendChild = void 0;
    function appendChild(parentNode, newNode) {
        insertBefore(parentNode, newNode, null);
    }
    exports.appendChild = appendChild;
    function detachNode(node) {
        if (!node.parentNode) {
            // this can mean that node is not yet attached and is in detach state
            return null;
        }
        const idx = node.parentNode.childNodes.indexOf(node);
        if (idx === -1) {
            throw new Error('removeChild: node not found');
        }
        const prev = node.previousSibling;
        const next = node.nextSibling;
        const prevElement = node.previousElementSibling || null;
        const nextElement = node.nextElementSibling || null;
        if (prev) {
            prev._nextSibling = next;
        }
        if (next) {
            next._previousSibling = prev;
        }
        if (node_types_3.isElementNode(node)) {
            updatePreviousElementFor(next, node, prevElement);
            updateNextElementSiblingFor(prev, node, nextElement);
            node.parentNode.children.splice(node.parentNode.children.indexOf(node), 1);
        }
        node.parentNode.childNodes.splice(idx, 1);
        resetNode(node);
        return node;
    }
    exports.detachNode = detachNode;
    function insertBefore(parentNode, newNode, next) {
        detachNode(newNode);
        const prevSibling = next ? next.previousSibling : parentNode.lastChild;
        const prevElement = next ? next.previousElementSibling : parentNode.lastElementChild;
        // updating previous sibling
        if (prevSibling) {
            prevSibling._nextSibling = newNode;
        }
        // updating new node
        newNode._previousSibling = prevSibling;
        newNode._nextSibling = next;
        newNode._previousElementSibling = prevElement;
        newNode._nextElementSibling = node_types_3.isElementNode(next) ? next : next && next.nextElementSibling;
        if (node_types_3.isElementNode(newNode)) {
            if (next) {
                updatePreviousElementFor(next.nextSibling, prevElement, newNode);
            }
            updateNextElementSiblingFor(prevSibling, prevElement, newNode);
            const nextElementIdx = parentNode.children.indexOf(newNode.nextElementSibling);
            const insertionElementIdx = nextElementIdx !== -1 ? nextElementIdx : parentNode.children.length;
            parentNode.children.splice(insertionElementIdx, 0, newNode); // attaching newNode in children before next
        }
        // updating next's previous references
        if (next) {
            next._previousSibling = newNode;
        }
        if (next && node_types_3.isElementNode(newNode)) {
            next._previousElementSibling = newNode;
        }
        const nextIdx = parentNode.childNodes.indexOf(newNode.nextSibling);
        const insertionIdx = nextIdx !== -1 ? nextIdx : parentNode.childNodes.length;
        parentNode.childNodes.splice(insertionIdx, 0, newNode); // attaching newNode in children before next
        newNode._parentNode = parentNode;
        newNode._parentElement = node_types_3.isElementNode(parentNode) ? parentNode : null;
        newNode.setOwnerDocument(parentNode.ownerDocument);
    }
    exports.insertBefore = insertBefore;
    function resetNode(node) {
        node._previousSibling = null;
        node._nextSibling = null;
        node._previousElementSibling = null;
        node._nextElementSibling = null;
        node._parentNode = null;
        node._parentElement = null;
    }
    function updatePreviousElementFor(nextSibling, oldRef, newRef) {
        while (nextSibling && nextSibling.previousElementSibling === oldRef) {
            nextSibling._previousElementSibling = newRef;
            nextSibling = nextSibling.nextSibling;
        }
    }
    function updateNextElementSiblingFor(prevSibling, oldRef, newRef) {
        let firstElementOccurrenceFound = false;
        while (prevSibling && !firstElementOccurrenceFound) {
            prevSibling._nextElementSibling = newRef;
            firstElementOccurrenceFound = node_types_3.isElementNode(prevSibling);
            prevSibling = prevSibling.previousSibling;
        }
    }
    function replaceChild(parentNode, oldNode, newNode) {
        const childIndex = parentNode.childNodes.indexOf(oldNode);
        if (childIndex === -1) {
            throw new Error('replaceChild: node not found');
        }
        insertBefore(parentNode, newNode, oldNode);
        return detachNode(oldNode);
    }
    exports.replaceChild = replaceChild;
    function insertText(parentNode, text) {
        const lastChild = parentNode.lastChild;
        if (lastChild && node_types_3.isTextNode(lastChild)) {
            lastChild.nodeValue += text;
        }
        else {
            appendChild(parentNode, node_contruction_2.createTextNode(text));
        }
    }
    exports.insertText = insertText;
    function insertTextBefore(parentNode, text, referenceNode) {
        const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
        if (prevNode && node_types_3.isTextNode(prevNode)) {
            prevNode.nodeValue += text;
        }
        else {
            insertBefore(parentNode, node_contruction_2.createTextNode(text), referenceNode);
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
define("nodes/node", ["require", "exports", "nodes/contracts/type", "nodes/tree-adapter/node-types", "nodes/tree-adapter/tree-mutation", "html-escaper", "url"], function (require, exports, type_2, node_types_4, tree_mutation_1, html_escaper_1, url_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Node = void 0;
    class Node {
        constructor(props) {
            this.nodeName = '';
            this.nodeValue = '';
            this.children = [];
            for (const key of Object.keys(props)) {
                // @ts-ignore
                this[key] = props[key];
            }
            this.childNodes = this.childNodes || [];
            this.children = this.childNodes.filter(node_types_4.isElementNode);
            this._parentNode = this._parentNode || null;
            this._parentElement = this._parentElement || null;
            this._previousSibling = this._previousSibling || null;
            this._nextSibling = this._nextSibling || null;
            this._previousElementSibling = this._previousElementSibling || null;
            this._nextElementSibling = this._nextElementSibling || null;
        }
        get baseURI() {
            const document = node_types_4.isDocument(this) ? this : this.ownerDocument;
            let _baseURI = document.documentURI;
            try {
                const baseElements = document.getElementsByTagName('base');
                const href = baseElements[0].getAttribute('href');
                if (href) {
                    _baseURI = (new url_1.URL(href, _baseURI)).href;
                }
            }
            catch (ex) { /* Just fall back to documentURI */
            }
            return _baseURI;
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
            if (node_types_4.isTextNode(this) || node_types_4.isCommentNode(this)) {
                return this.nodeValue;
            }
            function getText(node) {
                node.childNodes.forEach((child) => {
                    if (node_types_4.isTextNode(child) || node_types_4.isCommentNode(child)) {
                        text.push(html_escaper_1.unescape(child.nodeValue));
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
            if (node_types_4.isTextNode(this)) {
                this.nodeValue = data;
                return;
            }
            // clear parentNodes for existing children
            for (let i = this.childNodes.length - 1; i >= 0; i--) {
                this.removeChild(this.childNodes[i]);
            }
            const node = this.ownerDocument.createTextNode(data);
            this.appendChild(node);
        }
        get ownerDocument() {
            if (this._ownerDocument) {
                return this._ownerDocument;
            }
            if (node_types_4.isDocument(this)) {
                this._ownerDocument = null;
                return this._ownerDocument;
            }
            if (node_types_4.isDocument(this.parentNode)) {
                this._ownerDocument = this.parentNode;
                return this._ownerDocument;
            }
            return null;
        }
        setOwnerDocument(node) {
            this._ownerDocument = node;
        }
        appendChild(newChild) {
            tree_mutation_1.appendChild(this, newChild);
        }
        insertBefore(newNode, referenceNode) {
            tree_mutation_1.insertBefore(this, newNode, referenceNode);
            return newNode;
        }
        removeChild(child) {
            return tree_mutation_1.detachNode(child);
        }
        replaceChild(newChild, oldChild) {
            return tree_mutation_1.replaceChild(this, oldChild, newChild);
        }
    }
    exports.Node = Node;
    for (const nodeType in type_2.NodeType) {
        // @ts-ignore
        Node[nodeType] = Node.prototype[nodeType] = type_2.NodeType[nodeType];
    }
});
define("nodes/tree-adapter/node-contruction", ["require", "exports", "parse5/lib/common/doctype", "nodes/contracts/type", "nodes/node", "nodes/document", "nodes/element", "nodes/tree-adapter/node-types", "nodes/documentType", "nodes/tree-adapter/tree-mutation"], function (require, exports, doctype_1, type_3, node_4, document_1, element_1, node_types_5, documentType_1, tree_mutation_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createTextNode = exports.createCommentNode = exports.createDirectiveNode = exports.setDocumentType = exports.createElement = exports.createDocumentFragment = exports.createDocument = void 0;
    exports.createDocument = () => {
        return new document_1.Document({
            nodeType: type_3.NodeType.DOCUMENT_NODE,
            nodeName: type_3.NodeName.DOCUMENT_NODE,
            mode: type_3.DocumentMode.NO_QUIRKS,
        });
    };
    exports.createDocumentFragment = () => {
        return new node_4.Node({
            nodeType: type_3.NodeType.DOCUMENT_FRAGMENT_NODE,
            nodeName: type_3.NodeName.DOCUMENT_FRAGMENT_NODE,
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
            nodeType: type_3.NodeType.ELEMENT_NODE,
            nodeName: tagName === null || tagName === void 0 ? void 0 : tagName.toUpperCase(),
            namespaceURI,
            _localName: tagName,
            attribs,
        });
    };
    exports.setDocumentType = (document, name, publicId, systemId) => {
        const nodeValue = doctype_1.serializeContent(name, publicId, systemId);
        let doctypeNode = null;
        for (const node of document.childNodes) {
            if (node_types_5.isDocumentTypeNode(node)) {
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
            tree_mutation_2.appendChild(document, exports.createDirectiveNode(name, nodeValue, publicId, systemId));
        }
    };
    exports.createDirectiveNode = (name, nodeValue, publicId, systemId) => {
        return new documentType_1.DocumentType({
            nodeType: type_3.NodeType.DOCUMENT_TYPE_NODE,
            nodeName: name,
            nodeValue,
            name,
            publicId,
            systemId,
        });
    };
    exports.createCommentNode = (data) => {
        return new node_4.Node({
            nodeType: type_3.NodeType.COMMENT_NODE,
            nodeName: type_3.NodeName.COMMENT_NODE,
            nodeValue: data,
        });
    };
    exports.createTextNode = (data) => {
        return new node_4.Node({
            nodeType: type_3.NodeType.TEXT_NODE,
            nodeName: type_3.NodeName.TEXT_NODE,
            nodeValue: data,
        });
    };
});
define("nodes/tree-adapter/node-data", ["require", "exports"], function (require, exports) {
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
define("nodes/tree-adapter/source-code-location", ["require", "exports"], function (require, exports) {
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
define("adapters/parse5", ["require", "exports", "nodes/tree-adapter/node-contruction", "nodes/tree-adapter/node-data", "nodes/tree-adapter/node-types", "nodes/tree-adapter/source-code-location", "nodes/tree-adapter/tree-mutation", "nodes/tree-adapter/tree-traversing"], function (require, exports, node_contruction_3, node_data_1, node_types_6, source_code_location_1, tree_mutation_3, tree_traversing_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(node_contruction_3, exports);
    __exportStar(node_data_1, exports);
    __exportStar(node_types_6, exports);
    __exportStar(source_code_location_1, exports);
    __exportStar(tree_mutation_3, exports);
    __exportStar(tree_traversing_2, exports);
});
define("types/types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Parsers = void 0;
    var Parsers;
    (function (Parsers) {
        Parsers["parse5"] = "parse5";
    })(Parsers = exports.Parsers || (exports.Parsers = {}));
});
define("index", ["require", "exports", "parse5", "adapters/parse5", "types/types", "nodes/contracts/type", "nodes/node", "nodes/document", "nodes/element"], function (require, exports, parse5_1, jsDomTreeAdapter, types_1, type_4, node_5, document_2, element_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serializeDom = exports.parseDom = exports.nodes = void 0;
    jsDomTreeAdapter = __importStar(jsDomTreeAdapter);
    exports.nodes = {
        Node: node_5.Node, NodeType: type_4.NodeType, Document: document_2.Document, Element: element_2.Element,
    };
    function parseDom(rawHTML, options = {}) {
        switch (options.parser) {
            default:
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
    function serializeDom(node) {
        return parse5_1.serialize(node, { treeAdapter: jsDomTreeAdapter });
    }
    exports.serializeDom = serializeDom;
});
