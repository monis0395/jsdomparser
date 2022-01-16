"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNodeSourceCodeLocation = exports.getNodeSourceCodeLocation = exports.setNodeSourceCodeLocation = void 0;
const setNodeSourceCodeLocation = (node, location) => {
    node.sourceCodeLocation = location;
};
exports.setNodeSourceCodeLocation = setNodeSourceCodeLocation;
const getNodeSourceCodeLocation = (node) => {
    return node.sourceCodeLocation;
};
exports.getNodeSourceCodeLocation = getNodeSourceCodeLocation;
const updateNodeSourceCodeLocation = (node, endLocation) => {
    node.sourceCodeLocation = Object.assign(node.sourceCodeLocation, endLocation);
};
exports.updateNodeSourceCodeLocation = updateNodeSourceCodeLocation;
