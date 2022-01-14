import 'mocha';
import { assert } from 'chai';
import { parseDom } from '../../src';

describe('appendChild', () => {

    it('newNode has a previous sibling', () => {
        const document = parseDom(`<body><p>p1</p></body>`);

        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.appendChild(newNode);
        const p1 = document.body.firstElementChild;

        assert.equal(p1.previousSibling, null);
        assert.equal(p1.nextSibling.textContent, newNode.textContent);

        assert.equal(newNode.previousSibling.textContent, p1.textContent);
        assert.equal(newNode.nextSibling, null);

        assert.equal(p1.previousElementSibling, null);
        assert.equal(p1.nextElementSibling.textContent, newNode.textContent);

        assert.equal(newNode.previousElementSibling.textContent, p1.textContent);
        assert.equal(newNode.nextElementSibling, null);
    });

    it('newNode has no siblings', () => {
        const document = parseDom(`<body></body>`);

        const newNode = document.createElement('p');
        newNode.textContent = "p2";
        document.body.appendChild(newNode);
        const p1 = document.body.firstElementChild;

        assert.equal(p1.textContent, p1.textContent);
        assert.equal(p1.previousSibling, null);
        assert.equal(p1.nextSibling, null);
        assert.equal(p1.previousElementSibling, null);
        assert.equal(p1.nextElementSibling, null);
    });
});
