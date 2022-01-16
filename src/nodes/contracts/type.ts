export interface NodeProps {
    nodeType: NodeType;
    nodeName: string | NodeName;
    nodeValue?: string;
}

export interface ElementProps extends NodeProps {
    _localName: string;
    attribs: Record<string, string>;
    namespaceURI: string;
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

export enum NodeName {
    TEXT_NODE = "#text",
    COMMENT_NODE = "#comment",
    DOCUMENT_NODE = "#document",
    DOCUMENT_FRAGMENT_NODE = "#document-fragment",
}

export enum DocumentMode {
    NO_QUIRKS = 'no-quirks',
    QUIRKS = 'quirks',
    LIMITED_QUIRKS = 'limited-quirks'
}
