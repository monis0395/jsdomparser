//Conversion tables for DOM Level1 structure emulation
const nodeTypes = {
	element: 1,
	text: 3,
	cdata: 4,
	comment: 8,
};

const nodePropertyShorthands = {
	tagName: 'name',
	childNodes: 'children',
	parentNode: 'parent',
	previousSibling: 'prev',
	nextSibling: 'next',
	nodeValue: 'data',
};

//Node
export class Node {
	public childNodes: Node[];
	public type;

	constructor(props) {
		for (const key of Object.keys(props)) {
			this[key] = props[key];
		}
	}

	get firstChild() {
		const children = this.childNodes;

		return (children && children[0]) || null;
	}

	get lastChild() {
		const children = this.childNodes;

		return (children && children[children.length - 1]) || null;
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
