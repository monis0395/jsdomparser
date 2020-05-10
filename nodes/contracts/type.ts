import { GenericObjectType } from "../../types/types";

export interface NodeProps {
    type: string;
	nodeType: NodeType;
    localName?: string;
	childNodes?: NodeProps[];
	children?: NodeProps[];
	parentNode: NodeProps | null;
	previousSibling: NodeProps | null;
	nextSibling: NodeProps | null;
	nodeValue?: string;
}

export interface ElementProps extends NodeProps{
	nodeType: NodeType.ELEMENT_NODE
    namespace: string;
    attribs: GenericObjectType<any>
}

export interface DocumentProps extends NodeProps{
	nodeType: NodeType.DOCUMENT_NODE
    mode: string
}

export interface DocumentTypeProps extends NodeProps{
	nodeType: NodeType.DOCUMENT_TYPE_NODE
    name: string
    publicId: string
    systemId: string
}

export enum NodeType {
	ELEMENT_NODE = 1,
	TEXT_NODE = 3,
	COMMENT_NODE = 8,
	DOCUMENT_NODE = 9,
	DOCUMENT_TYPE_NODE = 10,
	DOCUMENT_FRAGMENT_NODE = 11,
}
