import 'mocha';
import { assert } from 'chai';
import { parseDom } from '../../src';
import { isElementNode } from "../../src/nodes/tree-adapter/node-types";
import { Node } from '../../src/nodes/node';
import { Document } from '../../src/nodes/document';

describe('appendChild', () => {

    it('newNode has a previous sibling', () => {
        const document = parseDom(`<body><p>p1</p></body>`);

        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.appendChild(newNode);
        assert.equal(newNode.textContent, document.body.lastElementChild.textContent);
        compareSiblings(document);
    });

    it('newNode has no siblings', () => {
        const document = parseDom(`<body></body>`);

        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.appendChild(newNode);
        assert.equal(newNode.textContent, document.body.firstElementChild.textContent);
        compareSiblings(document);
    });
});

describe('insertBefore', () => {

    it('newNode has no siblings', () => {
        const document = parseDom(`<body></body>`);

        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.insertBefore(newNode, null);
        assert.equal(newNode.textContent, document.body.firstElementChild.textContent);
        compareSiblings(document);
    });

    it('as appendChild | newNode will only have a prev sibling', () => {
        const document = parseDom(`<body><!--c1--></body>`);

        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.insertBefore(newNode, null);

        compareSiblings(document);
    });

    it('as appendChild | newNode will only have a prev sibling element', () => {
        const document = parseDom(`<body><p>p1</p></body>`);

        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.insertBefore(newNode, null);

        compareSiblings(document);
    });

    it('newNode will only have a next sibling', () => {
        const document = parseDom(`<body><p>p1</p></body>`);

        const p1 = document.body.firstElementChild;
        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.insertBefore(newNode, p1);

        compareSiblings(document);
    });

    it('newNode will only have a next sibling element', () => {
        const document = parseDom(`<body><!--c1--></body>`);

        const c1 = document.body.firstChild;
        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.insertBefore(newNode, c1);

        compareSiblings(document);
    });

    it('newNode will have a previous & next sibling', () => {
        const document = parseDom(`<body><!--c1--><!--c3--></body>`);

        const c3 = document.body.lastChild;
        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.insertBefore(newNode, c3);

        compareSiblings(document);
    });

    it('newNode will have a previous sibling element & next sibling', () => {
        const document = parseDom(`<body><p>p1</p><!--c3--></body>`);

        const c3 = document.body.lastChild;
        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.insertBefore(newNode, c3);

        compareSiblings(document);
    });

    it('newNode will have a previous sibling & next sibling element', () => {
        const document = parseDom(`<body><!--c1--><p>p3</p></body>`);

        const p3 = document.body.lastChild;
        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.insertBefore(newNode, p3);

        compareSiblings(document);
    });

    it('newNode will have a previous & next sibling element and previous & next sibling', () => {
        const document = parseDom(`<body><p>p1</p><!--c2--><!--c3--><p>p4</p></body>`);

        const c3 = document.body.childNodes[2];
        const p5 = document.createElement('p');
        p5.textContent = "p5";
        document.body.insertBefore(p5, c3);

        assert.equal(p5.nextSibling, c3, 'p5.nextSibling == c3');
        assert.equal(c3.previousSibling, p5, 'c3.previousSibling == p5');
        assert.equal(c3.previousElementSibling, p5, 'c3.previousElementSibling == p5');

        compareSiblings(document);
    });

    it('newNode will have a previous & next sibling element', () => {
        const document = parseDom(`<body><p>p1</p><p>p3</p></body>`);

        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.insertBefore(newNode, document.body.lastElementChild);

        compareSiblings(document);
    });
})

function compareSiblings(document: Document) {
    let last = null;
    document.body.childNodes.forEach((el) => {
        compareNodes(last, el);
        last = el;
    });
    compareNodes(last, null);
}

function compareNodes(n1: Node | null, n2: Node | null) {
    if (n1) {
        assert.equal(n1.nextSibling, n2, 'n1.nextSibling == n2');
        if (isElementNode(n2) || n2 === null) {
            assert.equal(n1.nextElementSibling, n2, 'n1.nextElementSibling == n2');
        } else if (n2) {
            assert.equal(n1.nextElementSibling, n2.nextElementSibling, 'n1.nextElementSibling == n2.nextElementSibling');
        }
    }

    if (n2) {
        assert.equal(n2.previousSibling, n1, 'n2.previousSibling, n1');
        if (isElementNode(n1) || n1 === null) {
            assert.equal(n2.previousElementSibling, n1, 'n2.previousElementSibling, n1');
        } else if (n1) {
            assert.equal(n2.previousElementSibling, n1.previousElementSibling, 'n2.previousElementSibling, n1.previousElementSibling');
        }
    }
}
