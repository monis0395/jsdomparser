import { Node } from "../node";

export const setNodeSourceCodeLocation = (node: Node, location: any) => {
    node.sourceCodeLocation = location;
};

export const getNodeSourceCodeLocation = (node: Node) => {
    return node.sourceCodeLocation;
};

export const updateNodeSourceCodeLocation = (node: Node, endLocation: any) => {
    node.sourceCodeLocation = Object.assign(node.sourceCodeLocation, endLocation);
};
