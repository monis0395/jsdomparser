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

    it('should resolve absolute URLs using the baseURI', () => {
        const document = parseDom(`<a href="/about">Link</a>`, { url: "http://example.com" });
        const link = document.body.firstElementChild;

        assert.equal(link.getAttribute('href'), '/about');
        // @ts-ignore
        assert.equal(link.href, 'http://example.com/about');
    });

    it('should update baseURI when <base> element href is changed via setAttribute', () => {
        const document = parseDom(
            `<html><head><base href="first/"></head><body><a href="about">Link</a></body></html>`,
            { url: "http://example.com/root/" }
        );
        const base = document.head.firstElementChild;
        const link = document.body.firstElementChild;

        // @ts-ignore
        assert.equal(link.href, 'http://example.com/root/first/about');
        assert.equal(document.baseURI, 'http://example.com/root/first/');

        base.setAttribute('href', 'second/');
        
        // baseURI cache should be cleared and updated
        assert.equal(document.baseURI, 'http://example.com/root/second/');
        // @ts-ignore
        assert.equal(link.href, 'http://example.com/root/second/about');

        base.removeAttribute('href');
        // fall back to documentURI when base href is removed
        assert.equal(document.baseURI, 'http://example.com/root/');
        // @ts-ignore
        assert.equal(link.href, 'http://example.com/root/about');
    });

    it('should update baseURI when <base>.href is changed via property setter', () => {
        const document = parseDom(
            `<html><head><base href="first/"></head><body><a href="about">Link</a></body></html>`,
            { url: "http://example.com/root/" }
        );
        const base = document.head.firstElementChild;
        const link = document.body.firstElementChild;

        assert.equal(document.baseURI, 'http://example.com/root/first/');
        // @ts-ignore
        assert.equal(link.href, 'http://example.com/root/first/about');

        // @ts-ignore
        base.href = 'third/';

        assert.equal(document.baseURI, 'http://example.com/root/third/');
        // @ts-ignore
        assert.equal(link.href, 'http://example.com/root/third/about');
    });

    it('should keep absolute link href unchanged regardless of baseURI', () => {
        const document = parseDom(
            `<html><head><base href="http://base.example/"></head><body><a href="https://absolute.example/path">Link</a></body></html>`
        );
        const link = document.body.firstElementChild;

        // @ts-ignore
        assert.equal(link.href, 'https://absolute.example/path');
    });

    it('should update absolute baseURI values without parse options url', () => {
        const document = parseDom(
            `<html><head><base href="https://old.example/base/"></head><body><a href="file.js">Link</a></body></html>`
        );
        const base = document.head.firstElementChild;
        const link = document.body.firstElementChild;

        assert.equal(document.baseURI, 'https://old.example/base/');
        // @ts-ignore
        assert.equal(link.href, 'https://old.example/base/file.js');

        base.setAttribute('href', 'https://new.example/assets/');

        assert.equal(document.baseURI, 'https://new.example/assets/');
        // @ts-ignore
        assert.equal(link.href, 'https://new.example/assets/file.js');
    });
});
