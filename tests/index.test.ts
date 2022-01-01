import { parseDom } from "../src";
import { expect } from 'chai';
import 'mocha';
import { NodeType } from "../src/nodes/contracts/type";

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
        expect(document.getElementsByClassName("text").length).to.be.eq(1);
        expect(body.firstElementChild.className).to.be.eq("text");
        body.firstElementChild.className = "text-2";
        expect(body.firstElementChild.className).to.be.eq("text-2");
        expect(document.getElementsByClassName("text-2").length).to.be.eq(1);
        expect(body.getElementsByClassName("text-2").length).to.be.eq(1);
    });

    it('documentURI', () => {
        const url = "http://example.com";
        const document = parseDom(`<div class="text">Hello</div>`, { url });
        expect(document.documentURI).to.be.eq(url);
        expect(document.baseURI).to.be.eq(url);
    });

    it('innerHTML', () => {
        const document = parseDom(`<div class="text">Hello</div>`);
        const body = document.body;
        expect(body.firstElementChild.firstChild.textContent).to.be.eq("Hello");
        expect(body.firstElementChild.innerHTML).to.be.eq("Hello");
        const innerHtml = `<div>innerText</div>`;
        body.firstElementChild.innerHTML = innerHtml;
        expect(body.firstElementChild).to.not.empty;
        // attributes should still remain
        expect(body.firstElementChild.className).to.be.eq("text");
        // text content should give proper value even for higher elements
        expect(body.firstElementChild.textContent).to.be.eq("innerText");
        expect(body.firstElementChild.firstChild.textContent).to.be.eq("innerText");
        expect(body.firstElementChild.innerHTML).to.be.eq(innerHtml);
        expect(body.innerHTML).to.be.eq(`<div class="text">${innerHtml}</div>`);
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
