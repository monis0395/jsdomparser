import 'mocha';
import { assert } from 'chai';
import { parseDom } from '../../src';

describe('appendChild', () => {

    it('newNode has a previous sibling', () => {
        const document = parseDom(`<body><p>p1</p></body>`);

        const p1 = document.body.firstElementChild;
        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.appendChild(newNode);
        assert.equal(newNode.textContent, document.body.lastElementChild.textContent);
        compareNodesOrder(null, p1, newNode);
        compareNodesOrder(p1, newNode, null);
    });

    it('newNode has no siblings', () => {
        const document = parseDom(`<body></body>`);

        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.appendChild(newNode);
        assert.equal(newNode.textContent, document.body.firstElementChild.textContent);
        compareNodesOrder(null, newNode, null);
    });
});

describe('insertBefore', () => {

    it('newNode will have a next sibling', () => {
        const document = parseDom(`<body><p>p1</p></body>`);

        const p1 = document.body.firstElementChild;
        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.insertBefore(newNode, p1);

        compareNodesOrder(null, newNode, p1);
        compareNodesOrder(newNode, p1, null);
    });

    it('newNode will have a previous & next sibling', () => {
        const document = parseDom(`<body><p>p1</p><p>p3</p></body>`);

        const p1 = document.body.firstElementChild;
        const p3 = document.body.lastElementChild;
        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.insertBefore(newNode, p3);

        compareNodesOrder(null, p1, newNode);
        compareNodesOrder(p1, newNode, p3);
        compareNodesOrder(newNode, p3, null);
    });
})

function compareNodesOrder(n1, n2, n3) {
    if (n1) {
        assert.equal(n2.previousSibling.textContent, n1.textContent);
        assert.equal(n2.previousElementSibling.textContent, n1.textContent);
    } else {
        assert.equal(n2.previousSibling, n1);
        assert.equal(n2.previousElementSibling, n1);
    }

    if (n3) {
        assert.equal(n2.nextSibling.textContent, n3.textContent);
        assert.equal(n2.nextElementSibling.textContent, n3.textContent);
    } else {
        assert.equal(n2.nextSibling, n3);
        assert.equal(n2.nextElementSibling, n3);
    }
}
