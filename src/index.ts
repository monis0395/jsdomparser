import { parse, serialize } from "parse5"
import * as jsDomTreeAdapter from "./adapters/parse5"
import { Options, Parsers } from "./types/types";
import { NodeType } from "./nodes/contracts/type";
import { Node } from "./nodes/node";
import { Document } from "./nodes/document";
import { Element } from "./nodes/element";

export const nodes = {
    Node, NodeType, Document, Element,
};

export function parseDom(rawHTML: string, options: Options = {}) {
    switch (options.parser) {
        default:
        case Parsers.parse5:
            return parse5(rawHTML, options);
    }
}

export function parse5(rawHTML: string, options?: Options) {
    const document = parse(rawHTML, { treeAdapter: jsDomTreeAdapter }) as Document;
    if (options && options.url) {
        document._documentURI = options.url;
    }
    return document;
}

export function serializeDom(node: Node) {
    return serialize(node, { treeAdapter: jsDomTreeAdapter });
}
