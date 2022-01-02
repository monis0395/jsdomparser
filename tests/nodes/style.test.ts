import 'mocha';
import { assert } from 'chai';
import { parseDom } from '../../src';

describe('style', () => {

    it('.display: set | get', () => {
        const document = parseDom(`<p style='display: block'>Foo</p><p>Bar</p>`);
        const element = document.body.firstElementChild;
        assert.equal(
          // @ts-ignore
          element.style.display,
          'block',
          'should be able to access value via .display'
        );
        assert.equal(
          element.style.getPropertyValue('display'),
          'block',
          'we can also get value via .getPropertyValue'
        );
        // @ts-ignore
        element.style.display = 'none'
        assert.equal(
          // @ts-ignore
          element.style.display,
          'none',
          'should be able to update value via .display'
        );
        element.style.setProperty('display', 'block')
        assert.equal(
          element.style.getPropertyValue('display'),
          'block',
          'we can also set value via .setProperty'
        );
        // @ts-ignore
        element.style.display = 'block !important'
        assert.equal(
          element.style.getPropertyValue('display'),
          'block !important',
          'we can also set value via .setProperty'
        );
    });
});
