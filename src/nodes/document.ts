import { Node } from "./node";
import { DocumentMode, DocumentProps } from "./contracts/type";
import { createElement, createTextNode } from "./node-contruction";
import * as legacy from "./domutils/legacy";
import { URL } from "url";

export class Document extends Node implements DocumentProps {
    _documentURI: string;
    _baseURI: string;
    mode: DocumentMode;

    constructor(props: DocumentProps) {
        super(props);
    }

    get documentElement() {
        return this.firstElementChild;
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

    get body() {
        return this.getElementsByTagName("body")[0];
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

    get documentURI() {
        return this._documentURI;
    }

    get baseURI() {
        if (this._baseURI || this._baseURI === '') {
            return this._baseURI;
        }
        this._baseURI = this.documentURI;
        try {
            const baseElements = this.getElementsByTagName('base');
            const href = baseElements[0].getAttribute('href');
            if (href) {
                this._baseURI = (new URL(href, this._baseURI)).href;
            }
        } catch (ex) {/* Just fall back to documentURI */
        }
        return this._baseURI
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
