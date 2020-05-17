"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeDom = exports.htmlparser2 = exports.parse5 = exports.parseDom = exports.nodes = void 0;
const htmlparser2_1 = require("htmlparser2");
const parse5_1 = require("parse5");
const jsDomTreeAdapter = require("./adapters/parse5");
const types_1 = require("./types/types");
const type_1 = require("./nodes/contracts/type");
const node_1 = require("./nodes/node");
const document_1 = require("./nodes/document");
const element_1 = require("./nodes/element");
const htmlparser2_2 = require("./adapters/htmlparser2");
exports.nodes = {
    Node: node_1.Node, NodeType: type_1.NodeType, Document: document_1.Document, Element: element_1.Element,
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
