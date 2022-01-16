import { Node } from "../node";
import { Element } from "../element";
import { Attribute } from "parse5";
export declare function appendChild(parentNode: Node, newNode: Node): void;
export declare function detachNode(node: Node): Node | null;
export declare function insertBefore(parentNode: Node, newNode: Node, next: Node | null): void;
export declare function replaceChild(parentNode: Node, oldNode: Node, newNode: Node): Node | null;
export declare function insertText(parentNode: Node, text: string): void;
export declare function insertTextBefore(parentNode: Node, text: string, referenceNode: Node): void;
export declare function setTemplateContent(templateElement: Element, contentElement: Node): void;
export declare function getTemplateContent(templateElement: Element): Node;
/**
 * Copies attributes to the given element. Only attributes that are not yet present in the element are copied.
 *
 * @param recipient - Element to copy attributes into.
 * @param attrs - Attributes to copy.
 */
export declare function adoptAttributes(recipient: Element, attrs: Attribute[]): void;
