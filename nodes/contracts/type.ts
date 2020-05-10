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
    previousElementSibling?: NodeProps | null;
    nextElementSibling?: NodeProps | null;
    nodeValue?: string;
}

export interface ElementProps extends NodeProps {
    namespaceURI: string;
    attribs: GenericObjectType<any>
}

export interface DocumentProps extends NodeProps {
    mode: DocumentMode
}

export interface DocumentTypeProps extends NodeProps {
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

export enum DocumentMode {
    NO_QUIRKS = 'no-quirks',
    QUIRKS = 'quirks',
    LIMITED_QUIRKS = 'limited-quirks'
}
