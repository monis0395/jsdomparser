import { Node } from "./node";
import { DocumentMode, DocumentProps } from "./contracts/type";
import { createElement, createTextNode } from "./tree-adapter/node-contruction";
import * as legacy from "./domutils/legacy";

export class Document extends Node implements DocumentProps {
    _documentURI: string;
    mode: DocumentMode;

    constructor(props: DocumentProps) {
        super(props);
    }

    get body() {
        return this.getElementsByTagName("body")[0];
    }

    get documentElement() {
        return this.firstElementChild;
    }

    get documentURI() {
        return this._documentURI;
    }

    get head() {
        return this.getElementsByTagName("head")[0];
    }

    get title() {
        const titleTag = this.getElementsByTagName("title")[0];
        if (titleTag) {
            return titleTag.textContent;
        }
        return '';
    }

    set title(newTitle: string) {
        let titleTag = this.getElementsByTagName("title")[0];
        if (!titleTag && this.head) {
            titleTag = this.createElement('title');
            this.head.appendChild(titleTag)
        }
        if (titleTag) {
            titleTag.textContent = newTitle;
        }
    }

    createElement(lowerName: string) {
        const element = createElement(lowerName, "", []);
        element.setOwnerDocument(this);
        return element;
    }

    createTextNode(data: string) {
        const textNode = createTextNode(data);
        textNode.setOwnerDocument(this);
        return textNode;
    }

    getElementById(id: string) {
        return legacy.getElementById(id, this.childNodes)
    }

    getElementsByName(name: string) {
        return legacy.getElementsByName(name, this.childNodes)
    }

    getElementsByClassName(names: string) {
        return legacy.getElementsByClassName(names, this.childNodes)
    }

    getElementsByTagName(tagName: string) {
        return legacy.getElementsByTagName(tagName, this.childNodes, true)
    }

}
