import 'mocha';
import { assert } from 'chai';
import { parseDom } from "../../src";

describe('dom querying', () => {

    it('getElementsByClassName', () => {
        let document = parseDom(`<div class="text">Hello</div>`);
        assert.equal(document.getElementsByClassName("text").length, 1);

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
        assert.deepEqual(document.getElementById("example").className, '', "className should always return empty string")
    });
});
