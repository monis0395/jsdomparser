import { parse, serialize } from "parse5"
import * as parser from "./nodes/main"
import { Node } from "./nodes/node";
import { Options } from "./types/types";
import { Document } from "./nodes/document";

export { Node as Node };
export { NodeType as NodeType } from "./nodes/contracts/type";
export { Document as Document } from "./nodes/document";
export { Element as Element } from "./nodes/element";
export { Style as Style } from "./nodes/style";

export function parseDom(rawHTML: string, options?: Options) {
    const document = parse(rawHTML, { treeAdapter: parser }) as Document;
    if (options && options.url) {
        document._documentURI = options.url;
    }
    return document;
}

export function serializeDom(node: Node) {
    return serialize(node, { treeAdapter: parser });
}
