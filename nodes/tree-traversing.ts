export const getFirstChild = function (node) {
	return node.children[0];
};

export const getChildNodes = function (node) {
	return node.children;
};

export const getParentNode = function (node) {
	return node.parent;
};

export const getAttrList = function (element) {
	const attrList = [];

	for (const name in element.attribs) {
		attrList.push({
			name: name,
			value: element.attribs[name],
			namespace: element['x-attribsNamespace'][name],
			prefix: element['x-attribsPrefix'][name],
		});
	}

	return attrList;
};
