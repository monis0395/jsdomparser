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

        assert.equal(newNode.previousSibling, null, 'previousSibling');
        assert.equal(newNode.nextSibling, null, 'nextSibling');
        assert.equal(newNode.previousElementSibling, null, 'previousElementSibling');
        assert.equal(newNode.nextElementSibling, null, 'nextElementSibling');
        compareSiblings(document);
    });

    it('as appendChild | newNode will only have a prev sibling', () => {
        const document = parseDom(`<body><!--c1--></body>`);

        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.insertBefore(newNode, null);

        assert.equal(newNode.previousSibling, document.body.firstChild, 'previousSibling');
        assert.equal(newNode.nextSibling, null, 'nextSibling');
        assert.equal(newNode.previousElementSibling, null, 'previousElementSibling');
        assert.equal(newNode.nextElementSibling, null, 'nextElementSibling');
        compareSiblings(document);
    });

    it('as appendChild | newNode will only have a prev sibling element', () => {
        const document = parseDom(`<body><p>p1</p></body>`);

        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.insertBefore(newNode, null);

        assert.equal(newNode.previousSibling, document.body.firstChild, 'previousSibling');
        assert.equal(newNode.nextSibling, null, 'nextSibling');
        assert.equal(newNode.previousElementSibling, document.body.firstElementChild, 'previousElementSibling');
        assert.equal(newNode.nextElementSibling, null, 'nextElementSibling');
        compareSiblings(document);
    });

    it('newNode will only have a next sibling', () => {
        const document = parseDom(`<body><p>p1</p></body>`);

        const p1 = document.body.firstElementChild;
        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.insertBefore(newNode, p1);

        assert.equal(newNode.previousSibling, null, 'previousSibling');
        assert.equal(newNode.nextSibling, document.body.lastChild, 'nextSibling');
        assert.equal(newNode.previousElementSibling, null, 'previousElementSibling');
        assert.equal(newNode.nextElementSibling, document.body.lastElementChild, 'nextElementSibling');
        compareSiblings(document);
    });

    it('newNode will only have a next sibling element', () => {
        const document = parseDom(`<body><!--c1--></body>`);

        const c1 = document.body.firstChild;
        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.insertBefore(newNode, c1);

        assert.equal(newNode.previousSibling, null, 'previousSibling');
        assert.equal(newNode.nextSibling, document.body.lastChild, 'nextSibling');
        assert.equal(newNode.previousElementSibling, null, 'previousElementSibling');
        assert.equal(newNode.nextElementSibling, null, 'nextElementSibling');
        compareSiblings(document);
    });

    it('newNode will have a previous & next sibling', () => {
        const document = parseDom(`<body><!--c1--><!--c3--></body>`);

        const c3 = document.body.lastChild;
        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.insertBefore(newNode, c3);

        assert.equal(newNode.previousSibling, document.body.firstChild, 'previousSibling');
        assert.equal(newNode.nextSibling, document.body.lastChild, 'nextSibling');
        assert.equal(newNode.previousElementSibling, null, 'previousElementSibling');
        assert.equal(newNode.nextElementSibling, null, 'nextElementSibling');
        compareSiblings(document);
    });

    it('newNode will have a previous sibling element & next sibling', () => {
        const document = parseDom(`<body><p>p1</p><!--c3--></body>`);

        const c3 = document.body.lastChild;
        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.insertBefore(newNode, c3);

        assert.equal(newNode.previousSibling, document.body.firstChild, 'previousSibling');
        assert.equal(newNode.nextSibling, document.body.lastChild, 'nextSibling');
        assert.equal(newNode.previousElementSibling, document.body.firstElementChild, 'previousElementSibling');
        assert.equal(newNode.nextElementSibling, null, 'nextElementSibling');
        compareSiblings(document);
    });

    it('newNode will have a previous sibling & next sibling element', () => {
        const document = parseDom(`<body><!--c1--><p>p3</p></body>`);

        const p3 = document.body.lastChild;
        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.insertBefore(newNode, p3);

        assert.equal(newNode.previousSibling, document.body.firstChild, 'previousSibling');
        assert.equal(newNode.nextSibling, document.body.lastChild, 'nextSibling');
        assert.equal(newNode.previousElementSibling, null, 'previousElementSibling');
        assert.equal(newNode.nextElementSibling, document.body.lastElementChild, 'nextElementSibling');
        compareSiblings(document);
    });


    describe('both previous & next sibling element|node various order', () => {
        let document;
        let p1, c2, c3, p4, p5;

        beforeEach(() => {
            document = parseDom(`<body><p>p1</p><!--c2--><!--c3--><p>p4</p></body>`);
            [p1, c2, c3, p4] = document.body.childNodes;
            p5 = document.createElement('p');
            p5.textContent = "p5";
        })

        it('elements are in order', () => {
            compareSiblings(document);
        });

        it('insert before p1', () => {

            document.body.insertBefore(p5, p1);

            assert.equal(p5.previousSibling, null, 'previousSibling');
            assert.equal(p5.nextSibling, p1, 'nextSibling');
            assert.equal(p5.previousElementSibling, null, 'previousElementSibling');
            assert.equal(p5.nextElementSibling, p1, 'nextElementSibling');

            compareSiblings(document);
        })

        it('insert before c2', () => {

            document.body.insertBefore(p5, c2);

            assert.equal(p5.previousSibling, p1, 'previousSibling');
            assert.equal(p5.nextSibling, c2, 'nextSibling');
            assert.equal(p5.previousElementSibling, p1, 'previousElementSibling');
            assert.equal(p5.nextElementSibling, p4, 'nextElementSibling');

            compareSiblings(document);
        })

        it('insert before c3', () => {

            document.body.insertBefore(p5, c3);

            assert.equal(p5.previousSibling, c2, 'previousSibling');
            assert.equal(p5.nextSibling, c3, 'nextSibling');
            assert.equal(p5.previousElementSibling, p1, 'previousElementSibling');
            assert.equal(p5.nextElementSibling, p4, 'nextElementSibling');

            compareSiblings(document);
        })

        it('insert before p4', () => {

            document.body.insertBefore(p5, p4);

            assert.equal(p5.previousSibling, c3, 'previousSibling');
            assert.equal(p5.nextSibling, p4, 'nextSibling');
            assert.equal(p5.previousElementSibling, p1, 'previousElementSibling');
            assert.equal(p5.nextElementSibling, p4, 'nextElementSibling');

            compareSiblings(document);
        })

        it('insert before null', () => {

            document.body.insertBefore(p5, null);

            assert.equal(p5.previousSibling, p4, 'previousSibling');
            assert.equal(p5.nextSibling, null, 'nextSibling');
            assert.equal(p5.previousElementSibling, p4, 'previousElementSibling');
            assert.equal(p5.nextElementSibling, null, 'nextElementSibling');

            compareSiblings(document);
        })
    });
    it('newNode will have a previous & next sibling element', () => {
        const document = parseDom(`<body><p>p1</p><p>p3</p></body>`);

        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.insertBefore(newNode, document.body.lastElementChild);

        assert.equal(newNode.previousSibling, document.body.firstChild, 'previousSibling');
        assert.equal(newNode.nextSibling, document.body.lastChild, 'nextSibling');
        assert.equal(newNode.previousElementSibling, document.body.firstElementChild, 'previousElementSibling');
        assert.equal(newNode.nextElementSibling, document.body.lastElementChild, 'nextElementSibling');
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
    compareElementsOrder(document);
}

function compareElementsOrder(document: Document) {
    const elements = document.body.childNodes.filter(isElementNode);
    document.body.children.forEach((el, index) => {
        assert.equal(el, elements[index], `element order should be same as childNodes| index: ${index}`)
    });
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
