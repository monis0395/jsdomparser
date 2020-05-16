/**
 * TextNode to contain a text element in DOM tree.
 * @param {string} value [description]
 */
import { Element } from "./element";
export declare class Style {
    private node;
    constructor(node: Element);
    getStyle(styleName: string): string | undefined;
    setStyle(styleName: string, styleValue: string): void;
}
