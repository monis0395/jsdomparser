/**
 * TextNode to contain a text element in DOM tree.
 * @param {string} value [description]
 */
import { Element } from "./element";
export declare class Style {
    private node;
    constructor(node: Element);
    getPropertyValue(property: string): string;
    setProperty(propertyName: string, value: string): void;
}
