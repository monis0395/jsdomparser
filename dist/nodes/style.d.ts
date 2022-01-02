/**
 * TextNode to contain a text element in DOM tree.
 * @param {string} value [description]
 */
import { Element } from "./element";
export declare class Style {
    private node;
    constructor(node: Element);
    getPropertyValue(styleName: string): string | undefined;
    setProperty(styleName: string, styleValue: string): void;
}
