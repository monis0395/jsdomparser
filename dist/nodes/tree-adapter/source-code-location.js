"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNodeSourceCodeLocation = exports.getNodeSourceCodeLocation = exports.setNodeSourceCodeLocation = void 0;
exports.setNodeSourceCodeLocation = (node, location) => {
    node.sourceCodeLocation = location;
};
exports.getNodeSourceCodeLocation = (node) => {
    return node.sourceCodeLocation;
};
exports.updateNodeSourceCodeLocation = (node, endLocation) => {
    node.sourceCodeLocation = Object.assign(node.sourceCodeLocation, endLocation);
};
