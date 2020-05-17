import { Node } from "./node";
import { Element } from "./element";
import { Document } from "./document";
import { DocumentType } from "./documentType";
export declare function isTextNode(node: Node): boolean;
export declare function isCommentNode(node: Node): node is Node;
export declare function isDocumentTypeNode(node: Node): node is DocumentType;
export declare function isElementNode(node: Node): node is Element;
export declare function isDocument(node: Node | null): node is Document;
