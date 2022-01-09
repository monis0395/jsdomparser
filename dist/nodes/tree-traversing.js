"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttrList = exports.getParentNode = exports.getChildNodes = exports.getFirstChild = void 0;
exports.getFirstChild = (node) => {
    return node.firstChild;
};
exports.getChildNodes = (node) => {
    return node.childNodes;
};
exports.getParentNode = (node) => {
    return node.parentNode;
};
exports.getAttrList = (element) => {
    return Object.keys(element.attribs).map((name) => {
        return {
            name,
            value: element.attribs[name],
        };
    });
};
