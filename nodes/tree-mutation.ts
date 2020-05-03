import doctype from "parse5/lib/common/doctype";
import { Node } from "./node";
import { createTextNode } from "./node-contruction";

export const appendChild = function (parentNode, newNode) {
	const prev = parentNode.children[parentNode.children.length - 1];

	if (prev) {
		prev.next = newNode;
		newNode.prev = prev;
	}

	parentNode.children.push(newNode);
	newNode.parent = parentNode;
};

export const insertBefore = function (parentNode, newNode, referenceNode) {
	const insertionIdx = parentNode.children.indexOf(referenceNode);
	const prev = referenceNode.prev;

	if (prev) {
		prev.next = newNode;
		newNode.prev = prev;
	}

	referenceNode.prev = newNode;
	newNode.next = referenceNode;

	parentNode.children.splice(insertionIdx, 0, newNode);
	newNode.parent = parentNode;
};

export const setTemplateContent = function (templateElement, contentElement) {
	appendChild(templateElement, contentElement);
};

export const getTemplateContent = function (templateElement) {
	return templateElement.children[0];
};

export const setDocumentType = function (document, name, publicId, systemId) {
	const data = doctype.serializeContent(name, publicId, systemId);
	let doctypeNode = null;

	for (let i = 0; i < document.children.length; i++) {
		if (document.children[i].type === 'directive' && document.children[i].name === '!doctype') {
			doctypeNode = document.children[i];
			break;
		}
	}

	if (doctypeNode) {
		doctypeNode.data = data;
		doctypeNode['x-name'] = name;
		doctypeNode['x-publicId'] = publicId;
		doctypeNode['x-systemId'] = systemId;
	} else {
		appendChild(
			document,
			new Node({
				type: 'directive',
				name: '!doctype',
				data: data,
				'x-name': name,
				'x-publicId': publicId,
				'x-systemId': systemId,
			}),
		);
	}
};

export const setDocumentMode = function (document, mode) {
	document['x-mode'] = mode;
};

export const getDocumentMode = function (document) {
	return document['x-mode'];
};

export const detachNode = function (node) {
	if (node.parent) {
		const idx = node.parent.children.indexOf(node);
		const prev = node.prev;
		const next = node.next;

		node.prev = null;
		node.next = null;

		if (prev) {
			prev.next = next;
		}

		if (next) {
			next.prev = prev;
		}

		node.parent.children.splice(idx, 1);
		node.parent = null;
	}
};

export const insertText = function (parentNode, text) {
	const lastChild = parentNode.children[parentNode.children.length - 1];

	if (lastChild && lastChild.type === 'text') {
		lastChild.data += text;
	} else {
		appendChild(parentNode, createTextNode(text));
	}
};

export const insertTextBefore = function (parentNode, text, referenceNode) {
	const prevNode = parentNode.children[parentNode.children.indexOf(referenceNode) - 1];

	if (prevNode && prevNode.type === 'text') {
		prevNode.data += text;
	} else {
		insertBefore(parentNode, createTextNode(text), referenceNode);
	}
};

export const adoptAttributes = function (recipient, attrs) {
	for (let i = 0; i < attrs.length; i++) {
		const attrName = attrs[i].name;

		if (typeof recipient.attribs[attrName] === 'undefined') {
			recipient.attribs[attrName] = attrs[i].value;
			recipient['x-attribsNamespace'][attrName] = attrs[i].namespace;
			recipient['x-attribsPrefix'][attrName] = attrs[i].prefix;
		}
	}
};
