"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTextNode = exports.createCommentNode = exports.createDirectiveNode = exports.setDocumentType = exports.createElement = exports.createDocumentFragment = exports.createDocument = void 0;
// @ts-ignore
const doctype_1 = require("parse5/lib/common/doctype");
const type_1 = require("../contracts/type");
const node_1 = require("../node");
const document_1 = require("../document");
const element_1 = require("../element");
const node_types_1 = require("./node-types");
const documentType_1 = require("../documentType");
const tree_mutation_1 = require("./tree-mutation");
const createDocument = () => {
    return new document_1.Document({
        nodeType: type_1.NodeType.DOCUMENT_NODE,
        nodeName: type_1.NodeName.DOCUMENT_NODE,
        mode: type_1.DocumentMode.NO_QUIRKS,
    });
};
exports.createDocument = createDocument;
const createDocumentFragment = () => {
    return new node_1.Node({
        nodeType: type_1.NodeType.DOCUMENT_FRAGMENT_NODE,
        nodeName: type_1.NodeName.DOCUMENT_FRAGMENT_NODE,
    });
};
exports.createDocumentFragment = createDocumentFragment;
const createElement = (tagName, namespaceURI, attrs) => {
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
        nodeType: type_1.NodeType.ELEMENT_NODE,
        nodeName: tagName === null || tagName === void 0 ? void 0 : tagName.toUpperCase(),
        namespaceURI,
        _localName: tagName,
        attribs,
    });
};
exports.createElement = createElement;
const setDocumentType = (document, name, publicId, systemId) => {
    const nodeValue = (0, doctype_1.serializeContent)(name, publicId, systemId);
    let doctypeNode = null;
    for (const node of document.childNodes) {
        if ((0, node_types_1.isDocumentTypeNode)(node)) {
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
        (0, tree_mutation_1.appendChild)(document, (0, exports.createDirectiveNode)(name, nodeValue, publicId, systemId));
    }
};
exports.setDocumentType = setDocumentType;
const createDirectiveNode = (name, nodeValue, publicId, systemId) => {
    return new documentType_1.DocumentType({
        nodeType: type_1.NodeType.DOCUMENT_TYPE_NODE,
        nodeName: name,
        nodeValue,
        name,
        publicId,
        systemId,
    });
};
exports.createDirectiveNode = createDirectiveNode;
const createCommentNode = (data) => {
    return new node_1.Node({
        nodeType: type_1.NodeType.COMMENT_NODE,
        nodeName: type_1.NodeName.COMMENT_NODE,
        nodeValue: data,
    });
};
exports.createCommentNode = createCommentNode;
const createTextNode = (data) => {
    return new node_1.Node({
        nodeType: type_1.NodeType.TEXT_NODE,
        nodeName: type_1.NodeName.TEXT_NODE,
        nodeValue: data,
    });
};
exports.createTextNode = createTextNode;
