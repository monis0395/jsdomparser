// @ts-ignore
import {parse} from "parse5"
import * as parser from "./nodes/main"

export function parseDom(rawHTML) {
	return parse(rawHTML, { treeAdapter: parser });
}
