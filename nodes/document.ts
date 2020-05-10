import { Node } from "./node";
import { DocumentMode, DocumentProps } from "./contracts/type";
import { createElement, createTextNode } from "./node-contruction";
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
        return this.documentElement.firstElementChild;
    }

    get body() {
        return this.documentElement.lastElementChild;
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

    getElementsByTagName(tagName) {
        // not implemented yet
        return [];
    }

}
