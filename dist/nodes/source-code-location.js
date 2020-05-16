"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNodeSourceCodeLocation = exports.getNodeSourceCodeLocation = exports.setNodeSourceCodeLocation = void 0;
exports.setNodeSourceCodeLocation = function (node, location) {
    node.sourceCodeLocation = location;
};
exports.getNodeSourceCodeLocation = function (node) {
    return node.sourceCodeLocation;
};
exports.updateNodeSourceCodeLocation = function (node, endLocation) {
    // @ts-ignore
    node.sourceCodeLocation = Object.assign(node.sourceCodeLocation, endLocation);
};
