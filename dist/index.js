"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeDom = exports.parseDom = exports.nodes = void 0;
const parse5_1 = require("parse5");
const jsDomTreeAdapter = __importStar(require("./adapters/parse5"));
const types_1 = require("./types/types");
const type_1 = require("./nodes/contracts/type");
const node_1 = require("./nodes/node");
const document_1 = require("./nodes/document");
const element_1 = require("./nodes/element");
exports.nodes = {
    Node: node_1.Node, NodeType: type_1.NodeType, Document: document_1.Document, Element: element_1.Element,
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
