
export const getTagName = function (element) {
	return element.localName;
};

export const getNamespaceURI = function (element) {
	return element.namespace;
};

export const getTextNodeContent = function (textNode) {
	return textNode.nodeValue;
};

export const getCommentNodeContent = function (commentNode) {
	return commentNode.nodeValue;
};

export const getDocumentTypeNodeName = function (doctypeNode) {
	return doctypeNode['x-name'];
};

export const getDocumentTypeNodePublicId = function (doctypeNode) {
	return doctypeNode['x-publicId'];
};

export const getDocumentTypeNodeSystemId = function (doctypeNode) {
	return doctypeNode['x-systemId'];
};
