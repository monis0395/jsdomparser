import { Node } from "./node";
import { NodeT, NodeType } from "./contracts/type";
import { appendChild, detachNode } from "./tree-mutation";

class Element extends Node {
    constructor(props: NodeT) {
        super(props);
        this.nodeType = NodeType.ELEMENT_NODE;
    }

    appendChild(newNode: NodeT) {
        appendChild(this, newNode);
    }

    removeChild(node: NodeT) {
        detachNode(node);
    }

}
