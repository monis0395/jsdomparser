import { Node } from "../node";

export const setNodeSourceCodeLocation = (node: Node, location: string) => {
    node.sourceCodeLocation = location;
};

export const getNodeSourceCodeLocation = (node: Node) => {
    return node.sourceCodeLocation;
};

export const updateNodeSourceCodeLocation = (node: Node, endLocation: string) => {
    node.sourceCodeLocation = Object.assign(node.sourceCodeLocation, endLocation);
};
