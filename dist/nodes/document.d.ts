import { Node } from "./node";
import { DocumentMode, DocumentProps } from "./contracts/type";
export declare class Document extends Node implements DocumentProps {
    _documentURI: string;
    _baseURI: string;
    mode: DocumentMode;
    constructor(props: DocumentProps);
    get documentElement(): any;
    get head(): import("./element").Element;
    get title(): string;
    set title(newTitle: string);
    get body(): import("./element").Element;
    createElement(lowerName: string): import("./element").Element;
    createTextNode(data: string): Node;
    get documentURI(): string;
    get baseURI(): string;
    getElementById(id: string): import("./element").Element;
    getElementsByName(name: string): import("./element").Element[];
    getElementsByClassName(names: string): import("./element").Element[];
    getElementsByTagName(tagName: string): import("./element").Element[];
}
