import assert from 'assert';
import '../../src';

describe('extract-symbols-with-regexp', () => {

    it('hello world', () => {
        const {text, symbols} = "hello <world>".extractSymbolsWithRegExp(/<([^>]+)>/g);
        assert.equal(text, "hello ");
        assert.deepEqual(symbols, ["world"]);
    });

});
