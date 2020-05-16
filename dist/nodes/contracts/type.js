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
