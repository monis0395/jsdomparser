import { Node } from "./node";
import { DocumentTypeProps } from "./contracts/type";

export class DocumentType extends Node {

    constructor(props: DocumentTypeProps) {
        super(props);
    }
}
