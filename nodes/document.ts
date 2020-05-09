import { Node } from "./node";
import { NodeType } from "./contracts/type";
import { createElement, createTextNode } from "./node-contruction";

export class Document extends Node {

    constructor(props) {
        super(props);
        this.nodeType = NodeType.DOCUMENT_NODE;
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
