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
});
