import 'mocha';
import { assert } from 'chai';
import { parseDom } from '../../src';

describe('element', () => {

    it('.className', () => {
        const document = parseDom(`<p class='text'>Foo</p><p>Bar</p>`);
        assert.equal(document.body.firstElementChild.className, 'text');

        document.body.firstElementChild.className = 'text-2';
        assert.equal(
          document.body.firstElementChild.className,
          'text-2',
          'className should get updated after the change'
        )
        assert.equal(
          document.body.lastElementChild.className,
          '',
          'when className not set, it should return empty string'
        )
    });

    it('.id', () => {
        const document = parseDom(`<p id='foo'>Foo</p><p>Bar</p>`);

        const happyCaseElement = document.body.firstElementChild;
        assert.equal(
          happyCaseElement.id,
          'foo'
        )
        happyCaseElement.id = 'foo-bar';
        assert.equal(
          happyCaseElement.id,
          'foo-bar',
          'id should get updated after the change'
        )

        const negativeCaseElement = document.body.lastElementChild;
        assert.equal(
          negativeCaseElement.id,
          '',
          'when id not set, it should return empty string'
        )
    });

    it('.has | .get | .set |.remove Attribute', () => {
        const document = parseDom(`<p id='foo'>Foo</p><p>Bar</p>`);

        const happyCaseElement = document.body.firstElementChild;
        assert.equal(
          happyCaseElement.getAttribute('id'),
          'foo'
        )
        happyCaseElement.setAttribute('id','foo-bar');
        assert.equal(
          happyCaseElement.getAttribute('id'),
          'foo-bar',
          'setAttribute should updated the element & getAttribute should also return the value set'
        )
        assert.equal(
          happyCaseElement.hasAttribute('id'),
          true,
          'hasAttribute of existing property should return true'
        )

        const oddCaseElement = happyCaseElement;
        oddCaseElement.setAttribute('any-prop','');
        assert.equal(
          oddCaseElement.getAttribute('any-prop'),
          '',
          'setAttribute: name: can be any string | value: can be an empty string'
        )
        assert.equal(
          oddCaseElement.hasAttribute('any-prop'),
          true,
          'hasAttribute: should always return true even if value is an empty string'
        )
        oddCaseElement.setAttribute('null-prop',null);
        assert.equal(
          oddCaseElement.getAttribute('null-prop'),
          'null',
          'setAttribute: if null value is passed, it would be converted to string null'
        )
        oddCaseElement.setAttribute('undefined-prop',undefined);
        assert.equal(
          oddCaseElement.getAttribute('undefined-prop'),
          'undefined',
          'setAttribute: if null value is passed, it would be converted to string undefined'
        )
        oddCaseElement.removeAttribute('null-prop');
        assert.equal(
          oddCaseElement.getAttribute('null-prop'),
          null,
          'removeAttribute: will remove the attribute | .get will return null'
        )
        oddCaseElement.removeAttribute('undefined-prop');
        assert.equal(
          oddCaseElement.hasAttribute('undefined-prop'),
          false,
          'removeAttribute: will remove the attribute | .has will return false'
        )

        const negativeCaseElement = document.body.lastElementChild;
        assert.equal(
          negativeCaseElement.getAttribute('id'),
          null,
          'getAttribute of non existing property should return null'
        )
        assert.equal(
          negativeCaseElement.hasAttribute('id'),
          false,
          'hasAttribute of non existing property should return false'
        )
        assert.equal(
          negativeCaseElement.hasAttribute('id'),
          false,
          'hasAttribute of non existing property should return null'
        )
    });
});
