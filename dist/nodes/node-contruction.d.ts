import { Node } from "./node";
import { Document } from "./document";
import { Element } from "./element";
import { Attribute } from "parse5";
export declare const createDocument: () => Document;
export declare const createDocumentFragment: () => Node;
export declare const createElement: (tagName: string, namespaceURI: string, attrs: Attribute[]) => Element;
export declare const setDocumentType: (document: Document, name: string, publicId: string, systemId: string) => void;
export declare const createCommentNode: (data: string) => Node;
export declare const createTextNode: (data: string) => Node;