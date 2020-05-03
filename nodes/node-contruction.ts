import { DOCUMENT_MODE } from 'parse5/lib/common/html';
import { Node } from "./node";
import { NodeType } from "./contracts/type";

export const createDocument = function () {
	return new Node({
		type: 'root',
		nodeType: NodeType.DOCUMENT_NODE,
		name: 'root',
		parent: null,
		prev: null,
		next: null,
		childNodes: [],
		children: [],
		'x-mode': DOCUMENT_MODE.NO_QUIRKS,
	});
};

export const createDocumentFragment = function () {
	return new Node({
		type: 'root',
		nodeType: NodeType.DOCUMENT_FRAGMENT_NODE,
		name: 'root',
		parent: null,
		prev: null,
		next: null,
		childNodes: [],
		children: [],
	});
};

export const createElement = function (tagName, namespaceURI, attrs) {
	const attribs = Object.create(null);
	const attribsNamespace = Object.create(null);
	const attribsPrefix = Object.create(null);

	for (let i = 0; i < attrs.length; i++) {
		const attrName = attrs[i].name;

		attribs[attrName] = attrs[i].value;
		attribsNamespace[attrName] = attrs[i].namespace;
		attribsPrefix[attrName] = attrs[i].prefix;
	}

	return new Node({
		type: tagName === 'script' || tagName === 'style' ? tagName : 'tag',
		nodeType: NodeType.ELEMENT_NODE,
		name: tagName,
		namespace: namespaceURI,
		attribs: attribs,
		'x-attribsNamespace': attribsNamespace,
		'x-attribsPrefix': attribsPrefix,
		childNodes: [],
		children: [],
		parent: null,
		prev: null,
		next: null,
	});
};

export const createCommentNode = function (data) {
	return new Node({
		type: 'comment',
		nodeType: NodeType.COMMENT_NODE,
		data: data,
		parent: null,
		prev: null,
		next: null,
	});
};

export const createTextNode = function (value) {
	return new Node({
		type: 'text',
		nodeType: NodeType.TEXT_NODE,
		data: value,
		parent: null,
		prev: null,
		next: null,
	});
};
