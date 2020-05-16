"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttrList = exports.getParentNode = exports.getChildNodes = exports.getFirstChild = void 0;
exports.getFirstChild = function (node) {
    return node.firstChild;
};
exports.getChildNodes = function (node) {
    return node.childNodes;
};
exports.getParentNode = function (node) {
    return node.parentNode;
};
exports.getAttrList = function (element) {
    return Object.keys(element.attribs).map((name) => {
        return {
            name,
            value: element.attribs[name],
        };
    });
};
