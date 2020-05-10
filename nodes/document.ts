import { Node } from "./node";
import { DocumentMode, DocumentProps } from "./contracts/type";
import { createElement, createTextNode } from "./node-contruction";
import { URL } from "url";
import * as legacy from "./domutils/legacy";

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

    get body() {
        return this.getElementsByTagName("body")[0];
    }

    createElement(lowerName: string) {
        return createElement(lowerName, "", []);
    }

    createTextNode(data: string) {
        return createTextNode(data);
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
        return legacy.getElementById(id, this)
    }

    getElementsByName(name: string) {
        return legacy.getElementsByName(name, this)
    }

    getElementsByClassName(names: string) {
        return legacy.getElementsByClassName(names, this)
    }

    getElementsByTagName(tagName: string) {
        return legacy.getElementsByTagName(tagName, this, true)
    }

}
