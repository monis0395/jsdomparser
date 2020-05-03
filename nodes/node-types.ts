import { NodeType } from "./contracts/type";

export const isTextNode = function (node) {
	return node.nodeType === NodeType.TEXT_NODE;
};

export const isCommentNode = function (node) {
	return node.nodeType === NodeType.COMMENT_NODE;
};

export const isDocumentTypeNode = function (node) {
	return node.type === 'directive' && node.name === '!doctype';
};

export const isElementNode = function (node) {
	return node.nodeType === NodeType.ELEMENT_NODE;
};
