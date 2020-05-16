import { Node } from "./node";
import { DocumentTypeProps } from "./contracts/type";
export declare class DocumentType extends Node implements DocumentTypeProps {
    name: string;
    publicId: string;
    systemId: string;
    constructor(props: DocumentTypeProps);
}
