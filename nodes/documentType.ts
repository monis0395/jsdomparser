import { Node } from "./node";
import { DocumentTypeProps, NodeType } from "./contracts/type";

export class DocumentType extends Node implements DocumentTypeProps {
    name: string;
    publicId: string;
    systemId: string;

    constructor(props: DocumentTypeProps) {
        super(props);
        this.nodeType = NodeType.DOCUMENT_TYPE_NODE
    }
}
