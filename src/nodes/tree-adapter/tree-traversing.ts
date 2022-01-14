import { Node } from "../node";
import { Element } from "../element";
import { Attribute } from "parse5";

export const getFirstChild = (node: Node) => {
    return node.firstChild;
};

export const getChildNodes = (node: Node) => {
    return node.childNodes;
};

export const getParentNode = (node: Node) => {
    return node.parentNode;
};

export const getAttrList = (element: Element): Attribute[] => {
    return Object.keys(element.attribs).map((name) => {
        return {
            name,
            value: element.attribs[name],
        }
    });
};
