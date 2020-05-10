import { Node } from "./node";
import { Element } from "./element";
import { Attribute } from "parse5";

export const getFirstChild = function (node: Node) {
    return node.firstChild;
};

export const getChildNodes = function (node: Node) {
    return node.childNodes;
};

export const getParentNode = function (node: Node) {
    return node.parentNode;
};

export const getAttrList = function (element: Element) {
    const attrList: Attribute[] = [];

    for (const name in element.attribs) {
        attrList.push({
            name: name,
            value: element.attribs[name],
        });
    }

    return attrList;
};
