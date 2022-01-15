import 'mocha';
import { assert } from 'chai';
import { parseDom } from '../../src';
import { isElementNode } from "../../src/nodes/tree-adapter/node-types";
import { Node } from '../../src/nodes/node';
import { Document } from '../../src/nodes/document';
import { Element } from '../../src/nodes/element';

describe('appendChild', () => {

    it('newNode has a previous sibling', () => {
        const document = parseDom(`<body><p>p1</p></body>`);

        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.appendChild(newNode);

        assert.equal(newNode.textContent, document.body.lastElementChild.textContent);
        checkLinksAndOrder(document);
    });

    it('newNode has no siblings', () => {
        const document = parseDom(`<body></body>`);

        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.appendChild(newNode);

        assert.equal(newNode.textContent, document.body.firstElementChild.textContent);
        checkLinksAndOrder(document);
    });
});

describe('insertBefore', () => {

    // because dom creation would use appendChild | inserBefore for it
    it('element | node creation', () => {
        let document;

        document = parseDom(`<body><!--c1--></body>`);
        checkLinksAndOrder(document);
        document = parseDom(`<body><p>p1</p></body>`);
        checkLinksAndOrder(document);

        document = parseDom(`<body><!--c1--><p>p1</p></body>`);
        checkLinksAndOrder(document);
        document = parseDom(`<body><p>p1</p><!--c1--></body>`);
        checkLinksAndOrder(document);

        document = parseDom(`<body><!--c1--><!--c1--><p>p1</p><p>p1</p></body>`);
        checkLinksAndOrder(document);
        document = parseDom(`<body><!--c1--><p>p1</p><!--c1--><p>p1</p></body>`);
        checkLinksAndOrder(document);
        document = parseDom(`<body><!--c1--><p>p1</p><p>p1</p><!--c1--></body>`);
        checkLinksAndOrder(document);

        document = parseDom(`<body><p>p1</p><p>p1</p><!--c1--><!--c1--></body>`);
        checkLinksAndOrder(document);
        document = parseDom(`<body><p>p1</p><!--c1--><p>p1</p><!--c1--></body>`);
        checkLinksAndOrder(document);
        document = parseDom(`<body><p>p1</p><!--c1--><!--c1--><p>p1</p></body>`);
        checkLinksAndOrder(document);

        document = parseDom(`<body><p>p1</p><!--c2--><!--c3--><p>p4</p><p>p5</p><!--c6--></body>`);
        checkLinksAndOrder(document);
    })

    it('appendChild | newNode has no siblings', () => {
        const document = parseDom(`<body></body>`);

        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.insertBefore(newNode, null);

        assert.equal(newNode.previousSibling, null, 'previousSibling');
        assert.equal(newNode.nextSibling, null, 'nextSibling');
        assert.equal(newNode.previousElementSibling, null, 'previousElementSibling');
        assert.equal(newNode.nextElementSibling, null, 'nextElementSibling');
        checkLinksAndOrder(document);
    });

    it('appendChild | newNode will only have a prev sibling', () => {
        const document = parseDom(`<body><!--c1--></body>`);

        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.insertBefore(newNode, null);

        assert.equal(newNode.previousSibling, document.body.firstChild, 'previousSibling');
        assert.equal(newNode.nextSibling, null, 'nextSibling');
        assert.equal(newNode.previousElementSibling, null, 'previousElementSibling');
        assert.equal(newNode.nextElementSibling, null, 'nextElementSibling');
        checkLinksAndOrder(document);
    });

    it('appendChild | newNode will only have a prev sibling element', () => {
        const document = parseDom(`<body><p>p1</p></body>`);

        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.insertBefore(newNode, null);

        assert.equal(newNode.previousSibling, document.body.firstChild, 'previousSibling');
        assert.equal(newNode.nextSibling, null, 'nextSibling');
        assert.equal(newNode.previousElementSibling, document.body.firstElementChild, 'previousElementSibling');
        assert.equal(newNode.nextElementSibling, null, 'nextElementSibling');
        checkLinksAndOrder(document);
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
        checkLinksAndOrder(document);
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
        checkLinksAndOrder(document);
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
        checkLinksAndOrder(document);
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
        checkLinksAndOrder(document);
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
        checkLinksAndOrder(document);
    });


    describe('both previous & next sibling element|node various order', () => {
        let document;
        let p1, c2, c3, p4, p5, p6, c7;

        beforeEach(() => {
            document = parseDom(`<body><p>p1</p><!--c2--><!--c3--><p>p4</p><p>p6</p><!--c7--></body>`);
            [p1, c2, c3, p4, p6, c7] = document.body.childNodes;
            p5 = document.createElement('p');
            p5.textContent = "p5";
        })

        it('insert before p1', () => {

            document.body.insertBefore(p5, p1);

            assert.equal(p5.previousSibling, null, 'previousSibling');
            assert.equal(p5.nextSibling, p1, 'nextSibling');
            assert.equal(p5.previousElementSibling, null, 'previousElementSibling');
            assert.equal(p5.nextElementSibling, p1, 'nextElementSibling');

            checkLinksAndOrder(document);
        })

        it('insert before c2', () => {

            document.body.insertBefore(p5, c2);

            assert.equal(p5.previousSibling, p1, 'previousSibling');
            assert.equal(p5.nextSibling, c2, 'nextSibling');
            assert.equal(p5.previousElementSibling, p1, 'previousElementSibling');
            assert.equal(p5.nextElementSibling, p4, 'nextElementSibling');

            checkLinksAndOrder(document);
        })

        it('insert before c3', () => {

            document.body.insertBefore(p5, c3);

            assert.equal(p5.previousSibling, c2, 'previousSibling');
            assert.equal(p5.nextSibling, c3, 'nextSibling');
            assert.equal(p5.previousElementSibling, p1, 'previousElementSibling');
            assert.equal(p5.nextElementSibling, p4, 'nextElementSibling');

            checkLinksAndOrder(document);
        })

        it('insert before p4', () => {

            document.body.insertBefore(p5, p4);

            assert.equal(p5.previousSibling, c3, 'previousSibling');
            assert.equal(p5.nextSibling, p4, 'nextSibling');
            assert.equal(p5.previousElementSibling, p1, 'previousElementSibling');
            assert.equal(p5.nextElementSibling, p4, 'nextElementSibling');

            checkLinksAndOrder(document);
        })

        it('insert before p6', () => {

            document.body.insertBefore(p5, p6);

            assert.equal(p5.previousSibling, p4, 'previousSibling');
            assert.equal(p5.nextSibling, p6, 'nextSibling');
            assert.equal(p5.previousElementSibling, p4, 'previousElementSibling');
            assert.equal(p5.nextElementSibling, p6, 'nextElementSibling');

            checkLinksAndOrder(document);
        })

        it('insert before c7', () => {

            document.body.insertBefore(p5, c7);

            assert.equal(p5.previousSibling, p6, 'previousSibling');
            assert.equal(p5.nextSibling, c7, 'nextSibling');
            assert.equal(p5.previousElementSibling, p6, 'previousElementSibling');
            assert.equal(p5.nextElementSibling, null, 'nextElementSibling');

            checkLinksAndOrder(document);
        })

        it('insert before null', () => {

            document.body.insertBefore(p5, null);

            assert.equal(p5.previousSibling, c7, 'previousSibling');
            assert.equal(p5.nextSibling, null, 'nextSibling');
            assert.equal(p5.previousElementSibling, p6, 'previousElementSibling');
            assert.equal(p5.nextElementSibling, null, 'nextElementSibling');

            checkLinksAndOrder(document);
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
        checkLinksAndOrder(document);
    });
})


describe('removeChild', () => {
    let document;
    let p1, c2, c3, p4, p5, c6;

    beforeEach(() => {
        document = parseDom(`<body><p>p1</p><!--c2--><!--c3--><p>p4</p><p>p5</p><!--c6--></body>`);
        [p1, c2, c3, p4, p5, c6] = document.body.childNodes;
    })

    it('remove p1', () => {
        p1.parentNode.removeChild(p1);
        checkLinksAndOrder(document);
    })

    it('remove c2', () => {
        c2.parentNode.removeChild(c2);
        checkLinksAndOrder(document);
    })

    it('remove c3', () => {
        c3.parentNode.removeChild(c3);
        checkLinksAndOrder(document);
    })

    it('remove p4', () => {
        p4.parentNode.removeChild(p4);
        checkLinksAndOrder(document);
    })

    it('remove p5', () => {
        p5.parentNode.removeChild(p5);
        checkLinksAndOrder(document);
    })

    it('remove c6', () => {
        c3.parentNode.removeChild(c6);
        checkLinksAndOrder(document);
    })
});

function checkLinksAndOrder(document: Document) {
    let last = null;
    document.body.childNodes.forEach((el) => {
        checkNodesLinks(last, el);
        last = el;
    });
    checkNodesLinks(last, null);
    compareElementSiblings(document);
}

function compareElementSiblings(document: Document) {
    let last = null;
    const elements = document.body.childNodes.filter(isElementNode);
    document.body.children.forEach((el, index) => {
        assert.equal(el, elements[index], `element order should be same as childNodes| index: ${index}`) // order
        checkElementLinks(last, el); // relation
        last = el;
    });
    checkElementLinks(last, null);
}

function checkNodesLinks(n1: Node | null, n2: Node | null) {
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

function checkElementLinks(n1: Element | null, n2: Element | null) {
    if (n1) {
        assert.equal(n1.nextElementSibling, n2, 'n1.nextElementSibling == n2');
    }

    if (n2) {
        assert.equal(n2.previousElementSibling, n1, 'n2.previousElementSibling, n1');
    }
}
