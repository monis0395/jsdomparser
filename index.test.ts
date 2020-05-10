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
        expect(document.head.localName).to.be.eq("head");
        expect(document.body.localName).to.be.eq("body");
        expect(document.body.firstElementChild.ownerDocument).to.be.eq(document);
    });

    it('className', () => {
        const document = parseDom(`<div class="text">Hello</div>`);
        const body = document.body;
        expect(body.firstElementChild.className).to.be.eq("text");
        body.firstElementChild.className = "text-2";
        expect(body.firstElementChild.className).to.be.eq("text-2");
    });

    it('documentURI', () => {
        const url = "http://example.com";
        const document = parseDom(`<div class="text">Hello</div>`, { url });
        expect(document.documentURI).to.be.eq(url);
        expect(document.baseURI).to.be.eq(url);
    });

    it('innerHtml', () => {
        const document = parseDom(`<div class="text">Hello</div>`);
        const body = document.body;
        expect(body.firstElementChild.firstChild.textContent).to.be.eq("Hello");
        expect(body.firstElementChild.innerHtml).to.be.eq("Hello");
        const innerHtml = `<div>innerText</div>`;
        body.firstElementChild.innerHtml = innerHtml;
        expect(body.firstElementChild).to.not.empty;
        expect(body.firstElementChild.className).to.be.eq(null);
        expect(body.firstElementChild.textContent).to.be.eq("innerText");
        expect(body.firstElementChild.firstChild.textContent).to.be.eq("innerText");
        expect(body.firstElementChild.innerHtml).to.be.eq("innerText");
        expect(body.innerHtml).to.be.eq(innerHtml);
    });

    it('textContent', () => {
        const document = parseDom(`<div class="text">Hello</div>`);
        const body = document.body;
        expect(body.firstElementChild.textContent).to.be.eq("Hello");
        expect(body.firstElementChild.firstChild.textContent).to.be.eq("Hello");
        body.firstElementChild.textContent = "innerText";
        expect(body.firstElementChild.textContent).to.be.eq("innerText");
        expect(body.firstElementChild.firstChild.textContent).to.be.eq("innerText");
    });

});
