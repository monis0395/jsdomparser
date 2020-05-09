import { ElementT, NodeT, NodeType } from "./contracts/type";

const nodePropertyShorthands = {
	localName: 'name',
	parentNode: 'parent',
	previousSibling: 'prev',
	nextSibling: 'next',
	nodeValue: 'data',
};

export class Node implements NodeT {
	nodeType: NodeType;
    localName: string;
	childNodes: NodeT[];
	children: ElementT[];
	parentNode: NodeT;
	previousSibling: NodeT;
	nextSibling: NodeT;
	nodeValue: string;

	constructor(props) {
		for (const key of Object.keys(props)) {
			this[key] = props[key];
		}
		this.childNodes = this.childNodes || [];
		this.children = this.childNodes.filter((node) => node.nodeType === NodeType.ELEMENT_NODE) as ElementT[] ;
	}

	get firstChild() {
		return this.childNodes[0] || null;
	}

	get firstElementChild() {
		return this.children[0] || null;
	}

	get lastChild() {
		const children = this.childNodes;
		return children[children.length - 1] || null;
	}

	get lastElementChild() {
		const children = this.children;
		return children[children.length - 1] || null;
	}

	get tagName() {
	    return this.localName.toUpperCase();
    }
}

Object.keys(nodePropertyShorthands).forEach(key => {
	const shorthand = nodePropertyShorthands[key];

	Object.defineProperty(Node.prototype, key, {
		get: function () {
			return this[shorthand] || null;
		},
		set: function (val) {
			this[shorthand] = val;
			return val;
		},
	});
});
