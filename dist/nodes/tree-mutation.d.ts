import { Node } from "./node";
import { Element } from "./element";
import { Attribute } from "parse5";
export declare const appendChild: (parentNode: Node, newNode: Node) => void;
export declare const insertBefore: (parentNode: Node, newNode: Node, referenceNode: Node) => void;
export declare const detachNode: (node: Node) => any;
export declare const replaceChild: (parentNode: Node, oldNode: Node, newNode: Node) => any;
export declare const insertText: (parentNode: Node, text: string) => void;
export declare const insertTextBefore: (parentNode: Node, text: string, referenceNode: Node) => void;
export declare const setTemplateContent: (templateElement: Element, contentElement: Node) => void;
export declare const getTemplateContent: (templateElement: Element) => Node;
/**
 * Copies attributes to the given element. Only attributes that are not yet present in the element are copied.
 *
 * @param recipient - Element to copy attributes into.
 * @param attrs - Attributes to copy.
 */
export declare const adoptAttributes: (recipient: Element, attrs: Attribute[]) => void;
