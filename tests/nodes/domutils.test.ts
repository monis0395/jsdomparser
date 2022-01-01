import 'mocha';
import { assert } from 'chai';
import { parseDom } from "../../src";

describe('test parse', () => {

    it('getElementsByClassName', () => {
        let document = parseDom(`<div class="text">Hello</div>`);
        assert.equal(document.getElementsByClassName("text").length, 1);
        assert.equal(document.body.firstElementChild.textContent, "Hello");

        document.body.firstElementChild.className = "text-2";
        assert.equal(document.body.firstElementChild.className, "text-2", "values should get updated after the change");
        assert.equal(document.getElementsByClassName("text-2").length, 1);

        document = parseDom(`
                <div id="example">
                  <p id="p1" class="aaa bbb"/>
                  <p id="p2" class="aaa ccc"/>
                  <p id="p3" class="bbb ccc"/>
                  <p id="p4" class="ddd-eee"/>
                </div>`);
        assert.deepEqual(
          document.getElementsByClassName("aaa").map(el => el.id),
          ["p1", "p2"],
        )
        assert.deepEqual(
          document.getElementsByClassName("ccc bbb").map(el => el.id),
          ["p3"]
        )
        assert.deepEqual(
          document.getElementsByClassName("bbb  ccc ").map(el => el.id),
          ["p3"],
        )
        assert.deepEqual(document.getElementsByClassName("aaa,bbb").length, 0)
        assert.deepEqual(document.getElementsByClassName("ddd").length, 0, "no substring matches")
        assert.deepEqual(document.getElementsByClassName("eee").length, 0, "no substring matches")
    });
});
