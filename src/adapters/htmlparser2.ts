import { Node } from "../nodes/node";
import { Element } from "../nodes/element";
import { createCommentNode, createDirectiveNode, createDocument, createElement, createTextNode } from "../nodes/node-contruction";
import { isCommentNode, isElementNode } from "../nodes/node-types";
import { Document } from "../nodes/document";

const reWhitespace = /\s+/g;

export interface JsDomHandlerOptions {
    /***
     * Indicates whether the whitespace in text nodes should be normalized
     * (= all whitespace should be replaced with single spaces). The default value is "false".
     */
    normalizeWhitespace?: boolean;
}

// Default options
const defaultOpts: JsDomHandlerOptions = {
    normalizeWhitespace: false,
};

export class JsDomHandler {
    /** The constructed DOM */
    public dom: Document = createDocument();

    /** Settings for the handler. */
    private _options: JsDomHandlerOptions;

    /** Indicated whether parsing has been completed. */
    private _done: boolean = false;

    /** Stack of open tags. */
    private _tagStack: Element[] = [];

    /** A data node that is still being written to. */
    private _lastNode: Node | null = null;

    /**
     * Initiate a new JsDomHandler.
     *
     * @param options Settings for the handler.
     */
    public constructor(options?: JsDomHandlerOptions | null) {
        this._options = options || defaultOpts;
    }

    // Resets the handler back to starting state
    public onreset(): void {
        this.dom = createDocument();
        this._done = false;
        this._tagStack = [];
        this._lastNode = null;
    }

    // Signals the handler that parsing is done
    public onend(): void {
        if (this._done) return;
        this._done = true;
        this.handleCallback(null);
    }

    public onerror(error: Error): void {
        this.handleCallback(error);
    }

    public onclosetag(): void {
        this._lastNode = null;
        const elem = this._tagStack.pop();
        if (!elem) {
            return;
        }
    }

    public onopentag(name: string, attribs: { [key: string]: string }): void {
        const element = createElement(name, "", attribs);
        this.addNode(element);
        this._tagStack.push(element);
    }

    public ontext(data: string): void {
        const normalize = this._options.normalizeWhitespace;

        const { _lastNode } = this;

        if (_lastNode && isElementNode(_lastNode)) {
            _lastNode.nodeValue += data;
        } else {
            const node = createTextNode(data);
            this.addNode(node);
            this._lastNode = node;
        }
        if (normalize) {
            _lastNode.nodeValue = _lastNode.nodeValue.replace(reWhitespace, " ");
        }
    }

    public oncomment(data: string): void {
        if (this._lastNode && isCommentNode(this._lastNode)) {
            this._lastNode.nodeValue += data;
            return;
        }

        const node = createCommentNode(data);
        this.addNode(node);
        this._lastNode = node;
    }

    public oncommentend(): void {
        this._lastNode = null;
    }

    public onprocessinginstruction(name: string, data: string): void {
        const node = createDirectiveNode(name, data);
        this.addNode(node);
    }

    protected handleCallback(error: Error | null): void {
        if (error) {
            throw error;
        }
    }

    protected addNode(node: Node) {
        const parent = this._tagStack[this._tagStack.length - 1] || this.dom;
        parent.appendChild(node);
        this._lastNode = null;
    }
}
