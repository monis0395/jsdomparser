import { ElementProps, NodeProps, NodeType } from "./contracts/type";

const nodePropertyShorthands = {
	localName: 'name',
	parentNode: 'parent',
	previousSibling: 'prev',
	nextSibling: 'next',
	nodeValue: 'data',
};

export class Node implements NodeProps {
    type: string;
	nodeType: NodeType;
    localName: string;
	childNodes: NodeProps[];
	children: ElementProps[];
	parentNode: NodeProps;
	previousSibling: NodeProps;
	nextSibling: NodeProps;
    previousElementSibling?: NodeProps | null;
    nextElementSibling?: NodeProps | null;
	nodeValue: string;

	constructor(props: NodeProps) {
		for (const key of Object.keys(props)) {
			this[key] = props[key];
		}
		this.childNodes = this.childNodes || [];
		this.children = this.childNodes.filter((node) => node.nodeType === NodeType.ELEMENT_NODE) as ElementProps[] ;
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

    get textContent() {
	    return this.nodeValue;
    }

    set textContent(data: string) {
	    this.nodeValue = data;
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
