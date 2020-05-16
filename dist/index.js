"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeDom = exports.parseDom = exports.Node = void 0;
const parse5_1 = require("parse5");
const parser = require("./nodes/main");
const node_1 = require("./nodes/node");
Object.defineProperty(exports, "Node", { enumerable: true, get: function () { return node_1.Node; } });
var type_1 = require("./nodes/contracts/type");
Object.defineProperty(exports, "NodeType", { enumerable: true, get: function () { return type_1.NodeType; } });
var document_1 = require("./nodes/document");
Object.defineProperty(exports, "Document", { enumerable: true, get: function () { return document_1.Document; } });
var element_1 = require("./nodes/element");
Object.defineProperty(exports, "Element", { enumerable: true, get: function () { return element_1.Element; } });
var style_1 = require("./nodes/style");
Object.defineProperty(exports, "Style", { enumerable: true, get: function () { return style_1.Style; } });
function parseDom(rawHTML, options) {
    const document = parse5_1.parse(rawHTML, { treeAdapter: parser });
    if (options && options.url) {
        document._documentURI = options.url;
    }
    return document;
}
exports.parseDom = parseDom;
function serializeDom(node) {
    return parse5_1.serialize(node, { treeAdapter: parser });
}
exports.serializeDom = serializeDom;
