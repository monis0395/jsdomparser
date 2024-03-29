//@ts-nocheck
import 'mocha';
import { assert } from 'chai';
import { parseDom } from '../../src';

describe('node', () => {

    it('.nodeName', () => {
        const document = parseDom(`<p class='text'>Foo</p><div>Bar</div>`);
        assert.equal(document.nodeName, '#document');
        assert.equal(document.body.nodeName, 'BODY');
        assert.equal(document.body.firstElementChild.nodeName, 'P');
        assert.equal(document.body.lastElementChild.nodeName, 'DIV');
    });

    it('.parentNode & .parentElement', () => {
        const document = parseDom(`<body><!-- c1 --><p1>p1</p1></body>`);
        assert.equal(document.body.parentNode, document.firstChild);
        assert.equal(document.body.parentElement, document.firstElementChild);
        assert.equal(document.body.firstChild.parentNode, document.body);
        assert.equal(document.body.firstChild.parentElement, document.body);
        assert.equal(document.body.firstElementChild.parentNode, document.body);
        assert.equal(document.body.firstElementChild.parentElement, document.body);

        assert.throws(() => {
            document.body.firstChild.parentNode = document.body.lastChild;
        }, /Cannot set property/, 'parentNode should be read Only');

        assert.throws(() => {
            document.body.firstChild.parentElement = document.body.lastChild;
        }, /Cannot set property/,'parentElement should be read Only')
    });

    it('.childNodes & .children', () => {
        const document = parseDom(`<body><!-- c1 --><p1>p1</p1></body>`);
        assert.equal(document.body.childNodes.length, 2);
        assert.equal(document.body.children.length, 1);
    });
});
