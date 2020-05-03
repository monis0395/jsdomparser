import { parseDom } from "./index";
import { expect } from 'chai';
import 'mocha';

describe('test parse', () => {
	it('simple div', () => {
		const document = parseDom(`<div>Hello</div>`);
		expect(document).to.not.empty;
	});
});
