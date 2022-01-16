import { Node } from "./node";
import { DocumentMode, DocumentProps } from "./contracts/type";
export declare class Document extends Node {
    _documentURI: string;
    mode: DocumentMode;
    constructor(props: DocumentProps);
    get body(): import("./element").Element;
    get childElementCount(): number;
    get documentElement(): import("./element").Element;
    get documentURI(): string;
    get head(): import("./element").Element;
    get title(): string;
    set title(newTitle: string);
    createElement(lowerName: string): import("./element").Element;
    createTextNode(data: string): Node;
    getElementById(id: string): import("./element").Element;
    getElementsByName(name: string): import("./element").Element[];
    getElementsByClassName(names: string): import("./element").Element[];
    getElementsByTagName(tagName: string): import("./element").Element[];
}
