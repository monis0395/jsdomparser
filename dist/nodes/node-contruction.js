"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTextNode = exports.createCommentNode = exports.setDocumentType = exports.createElement = exports.createDocumentFragment = exports.createDocument = void 0;
// @ts-ignore
const doctype_1 = require("parse5/lib/common/doctype");
const type_1 = require("./contracts/type");
const node_1 = require("./node");
const document_1 = require("./document");
const element_1 = require("./element");
const node_types_1 = require("./node-types");
const documentType_1 = require("./documentType");
const tree_mutation_1 = require("./tree-mutation");
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
    return new node_1.Node({
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
    const attribs = Object.create(null);
    for (const { name, value } of attrs) {
        // right now optional params are missing for attributes
        attribs[name] = value;
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
        if (node_types_1.isDocumentTypeNode(node)) {
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
        tree_mutation_1.appendChild(document, new documentType_1.DocumentType({
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
        }));
    }
};
exports.createCommentNode = (data) => {
    return new node_1.Node({
        type: 'comment',
        nodeType: type_1.NodeType.COMMENT_NODE,
        nodeValue: data,
        parentNode: null,
        previousSibling: null,
        nextSibling: null,
    });
};
exports.createTextNode = (data) => {
    return new node_1.Node({
        type: 'text',
        nodeType: type_1.NodeType.TEXT_NODE,
        nodeValue: data,
        parentNode: null,
        previousSibling: null,
        nextSibling: null,
    });
};
