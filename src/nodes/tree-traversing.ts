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

export const getAttrList = function (element: Element): Attribute[] {
    return Object.keys(element.attribs).map((name) => {
        return {
            name,
            value: element.attribs[name],
        }
    });
};
