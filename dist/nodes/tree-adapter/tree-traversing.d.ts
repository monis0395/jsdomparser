import { Node } from "../node";
import { Element } from "../element";
import { Attribute } from "parse5";
export declare const getFirstChild: (node: Node) => Node;
export declare const getChildNodes: (node: Node) => Node[];
export declare const getParentNode: (node: Node) => Node;
export declare const getAttrList: (element: Element) => Attribute[];
