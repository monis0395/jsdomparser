export const setNodeSourceCodeLocation = function (node, location) {
	node.sourceCodeLocation = location;
};

export const getNodeSourceCodeLocation = function (node) {
	return node.sourceCodeLocation;
};

export const updateNodeSourceCodeLocation = function (node, endLocation) {
	// @ts-ignore
	node.sourceCodeLocation = Object.assign(node.sourceCodeLocation, endLocation);
};
