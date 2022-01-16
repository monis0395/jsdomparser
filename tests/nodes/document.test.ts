import 'mocha';
import { assert } from 'chai';
import { parseDom } from '../../src';

describe('document', () => {

    it('.firstElementChild', () => {
        const document = parseDom(`<html><head></head></html>`);
        assert.isOk(
          document.firstElementChild,
          "document should have a element",
        );
        assert.equal(
          document.firstElementChild.tagName,
          "HTML",
        );
    });

    it('.childElementCount', () => {
        const document = parseDom(`<p>Foo</p><p>Bar</p>`);
        assert.equal(
          document.childElementCount,
          1,
          'head should always be created'
        );
    });

    it('.head', () => {
        const document = parseDom(`<p>Foo</p><p>Bar</p>`);
        assert.isOk(
          document.head,
          'head should always be created'
        );
    });

    it('.lastElementChild', () => {
        const document = parseDom(`<html><head></head></html>`);
        assert.isOk(
          document.lastElementChild,
          "document should have a element",
        );
        assert.equal(
          document.lastElementChild.tagName,
          "HTML",
        );
    });

    it('.title', () => {
        const document = parseDom(`<p>Foo</p><p>Bar</p>`);
        assert.equal(
          document.title,
          '',
          'title when not set, should be an empty string'
        );
        assert.equal(
          document.getElementsByTagName('title').length,
          0,
          'title tag is not present'
        )
        document.title = 'new title'
        assert.equal(
          document.title,
          'new title',
          'title we should be able to update title tag even when title tag is absent'
        )
        assert.equal(
          document.getElementsByTagName('title').length,
          1,
          'title tag should be present after adding a title'
        )
        document.head.parentNode.removeChild(document.head);
        assert.equal(
          document.getElementsByTagName('head').length,
          0,
          'head tag removed'
        )
        document.title = 'new title'
        assert.equal(
          document.title,
          '',
          'title we should be not be updated when head tag is not present'
        )
    });
});
