// @ts-ignore
import {parse,serialize} from "parse5"
import * as parser from "./nodes/main"
import { Node } from "./nodes/node";
import { Options } from "./types/types";

export function parseDom(rawHTML, options?: Options) {
	const document =  parse(rawHTML, { treeAdapter: parser });
	if (options&& options.url) {
	    document._documentURI = options.url;
    }
	return document;
}

export function serializeDom(node: Node) {
	return serialize(node, { treeAdapter: parser });
}
