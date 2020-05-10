// @ts-ignore
import {parse,serialize} from "parse5"
import * as parser from "./nodes/main"
import { Node } from "./nodes/node";

export function parseDom(rawHTML) {
	return parse(rawHTML, { treeAdapter: parser });
}

export function serializeDom(node: Node) {
	return serialize(node, { treeAdapter: parser });
}
