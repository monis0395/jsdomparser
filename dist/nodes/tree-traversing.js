"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttrList = exports.getParentNode = exports.getChildNodes = exports.getFirstChild = void 0;
const getFirstChild = (node) => {
    return node.firstChild;
};
exports.getFirstChild = getFirstChild;
const getChildNodes = (node) => {
    return node.childNodes;
};
exports.getChildNodes = getChildNodes;
const getParentNode = (node) => {
    return node.parentNode;
};
exports.getParentNode = getParentNode;
const getAttrList = (element) => {
    return Object.keys(element.attribs).map((name) => {
        return {
            name,
            value: element.attribs[name],
        };
    });
};
exports.getAttrList = getAttrList;
