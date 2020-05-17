"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsDomHandler = void 0;
const node_contruction_1 = require("../nodes/node-contruction");
const node_types_1 = require("../nodes/node-types");
const entities_1 = require("entities");
const reWhitespace = /\s+/g;
// Default options
const defaultOpts = {
    normalizeWhitespace: false,
};
class JsDomHandler {
    /**
     * Initiate a new JsDomHandler.
     *
     * @param options Settings for the handler.
     */
    constructor(options) {
        /** The constructed DOM */
        this.dom = node_contruction_1.createDocument();
        /** Indicated whether parsing has been completed. */
        this._done = false;
        /** Stack of open tags. */
        this._tagStack = [];
        /** A data node that is still being written to. */
        this._lastNode = null;
        this._options = options || defaultOpts;
    }
    // Resets the handler back to starting state
    onreset() {
        this.dom = node_contruction_1.createDocument();
        this._done = false;
        this._tagStack = [];
        this._lastNode = null;
    }
    // Signals the handler that parsing is done
    onend() {
        if (this._done)
            return;
        this._done = true;
        this.handleCallback(null);
    }
    onerror(error) {
        this.handleCallback(error);
    }
    onclosetag() {
        this._lastNode = null;
        const elem = this._tagStack.pop();
        if (!elem) {
            return;
        }
    }
    onopentag(name, attribs) {
        const element = node_contruction_1.createElement(name, "", attribs);
        this.addNode(element);
        this._tagStack.push(element);
    }
    ontext(data) {
        const normalize = this._options.normalizeWhitespace;
        const { _lastNode } = this;
        data = entities_1.decode(data);
        if (_lastNode && node_types_1.isElementNode(_lastNode)) {
            _lastNode.nodeValue += data;
        }
        else {
            const node = node_contruction_1.createTextNode(data);
            this.addNode(node);
            this._lastNode = node;
        }
        if (normalize) {
            _lastNode.nodeValue = _lastNode.nodeValue.replace(reWhitespace, " ");
        }
    }
    oncomment(data) {
        data = entities_1.decode(data);
        if (this._lastNode && node_types_1.isCommentNode(this._lastNode)) {
            this._lastNode.nodeValue += data;
            return;
        }
        const node = node_contruction_1.createCommentNode(data);
        this.addNode(node);
        this._lastNode = node;
    }
    oncommentend() {
        this._lastNode = null;
    }
    onprocessinginstruction(name, data) {
        const node = node_contruction_1.createDirectiveNode(name, data);
        this.addNode(node);
    }
    handleCallback(error) {
        if (error) {
            throw error;
        }
    }
    addNode(node) {
        const parent = this._tagStack[this._tagStack.length - 1] || this.dom;
        parent.appendChild(node);
        this._lastNode = null;
    }
}
exports.JsDomHandler = JsDomHandler;
