import { parseDom } from "./index";
import { expect } from 'chai';
import 'mocha';
import { NodeType } from "./nodes/contracts/type";

describe('test parse', () => {
	it('simple div', () => {
		const document = parseDom(`<div class="text">Hello</div>`);
		expect(document).to.not.empty;
		expect(document.nodeType).to.is.eq(NodeType.DOCUMENT_NODE);
		expect(document.children).to.be.not.empty;
		expect(document.childNodes).to.be.not.empty;
		expect(document.childNodes.length).to.be.eq(1);
        expect(document.firstElementChild.firstElementChild.localName).to.be.eq("head");
        expect(document.firstElementChild.lastElementChild.localName).to.be.eq("body");
        expect(document.firstElementChild.lastElementChild.ownerDocument).to.be.eq(document);
	});
});
