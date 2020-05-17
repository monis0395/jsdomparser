import { Node } from "../nodes/node";
import { Document } from "../nodes/document";
export interface JsDomHandlerOptions {
    /***
     * Indicates whether the whitespace in text nodes should be normalized
     * (= all whitespace should be replaced with single spaces). The default value is "false".
     */
    normalizeWhitespace?: boolean;
}
export declare class JsDomHandler {
    /** The constructed DOM */
    dom: Document;
    /** Settings for the handler. */
    private _options;
    /** Indicated whether parsing has been completed. */
    private _done;
    /** Stack of open tags. */
    private _tagStack;
    /** A data node that is still being written to. */
    private _lastNode;
    /**
     * Initiate a new JsDomHandler.
     *
     * @param options Settings for the handler.
     */
    constructor(options?: JsDomHandlerOptions | null);
    onreset(): void;
    onend(): void;
    onerror(error: Error): void;
    onclosetag(): void;
    onopentag(name: string, attribs: {
        [key: string]: string;
    }): void;
    ontext(data: string): void;
    oncomment(data: string): void;
    oncommentend(): void;
    onprocessinginstruction(name: string, data: string): void;
    protected handleCallback(error: Error | null): void;
    protected addNode(node: Node): void;
}
