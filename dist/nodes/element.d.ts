import { Node } from "./node";
import { ElementProps } from "./contracts/type";
import { Style } from "./style";
export declare class Element extends Node {
    namespaceURI: string;
    style: Style;
    attribs: Record<string, string>;
    private readonly _localName;
    private readonly _tagName;
    constructor(props: ElementProps);
    get attributes(): import("parse5").Attribute[];
    get className(): string;
    set className(classNames: string);
    get id(): string;
    set id(id: string);
    getAttribute(name: string): string;
    hasAttribute(name: string): boolean;
    setAttribute(name: string, value: string): string;
    removeAttribute(name: string): void;
    get childElementCount(): number;
    get localName(): string;
    get tagName(): string;
    get innerHTML(): string;
    set innerHTML(htmlString: string);
    getElementsByClassName(names: string): Element[];
    getElementsByTagName(tagName: string): Element[];
}
