import { Options } from "./types/types";
import { NodeType } from "./nodes/contracts/type";
import { Node } from "./nodes/node";
import { Document } from "./nodes/document";
import { Element } from "./nodes/element";
export declare const nodes: {
    Node: typeof Node;
    NodeType: typeof NodeType;
    Document: typeof Document;
    Element: typeof Element;
};
export declare function parseDom(rawHTML: string, options?: Options): Document;
export declare function parse5(rawHTML: string, options?: Options): Document;
export declare function serializeDom(node: Node): string;
