export interface NodeT {
	nodeType: NodeType;
	tagName: string;
	childNodes: NodeT[];
	parentNode: NodeT | null;

	previousSibling: NodeT | null;
	nextSibling: NodeT | null;

	nodeValue: string;
}

export interface ElementT extends NodeT{
	nodeType: NodeType.ELEMENT_NODE
}

export enum NodeType {
	ELEMENT_NODE = 1,
	TEXT_NODE = 3,
	COMMENT_NODE = 8,
	DOCUMENT_NODE = 9,
	DOCUMENT_TYPE_NODE = 10,
	DOCUMENT_FRAGMENT_NODE = 11,
}
