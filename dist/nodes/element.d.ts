import { Node } from "./node";
import { ElementProps } from "./contracts/type";
import { GenericObjectType } from "../types/types";
import { Style } from "./style";
export declare class Element extends Node implements ElementProps {
    namespaceURI: string;
    style: Style;
    attribs: GenericObjectType<string>;
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
    get innerHTML(): string;
    set innerHTML(htmlString: string);
    getElementsByClassName(names: string): Element[];
    getElementsByTagName(tagName: string): Element[];
}
