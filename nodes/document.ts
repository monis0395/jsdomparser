import { Node } from "./node";
import { DocumentProps } from "./contracts/type";
import { createElement, createTextNode } from "./node-contruction";

export class Document extends Node {

    constructor(props: DocumentProps) {
        super(props);
    }

    get documentElement() {
        return this.firstElementChild;
    }

    createElement(lowerName: string) {
        return createElement(lowerName, "", []);
    }

    createTextNode(data: string) {
        return createTextNode(data);
    }

}
