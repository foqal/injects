import assert from 'assert';
import '../../src';

describe('extract-symbols-with-regexp', () => {

    function assertCorrect(name, {expectedText, expectedSymbols, test}) {
        describe(name, () => {
            it('text', () => {
                assert.strictEqual(test.text, expectedText);
            });

            it('symbols', () => {
                assert.deepEqual(test.symbols, expectedSymbols);
            });
        });
    }

    assertCorrect("match index", {
        expectedText: "",
        expectedSymbols: [],
        test: "".extractSymbolsWithRegExp(/<([^>]+)>/g)
    });

    assertCorrect("basic test", {
        expectedText: "hello ",
        expectedSymbols: ["world"],
        test: "hello <world>".extractSymbolsWithRegExp(/<([^>]+)>/g)
    });

    assertCorrect("match index", {
        expectedText: "hello",
        expectedSymbols: ["world"],
        test: "hello 'world'".extractSymbolsWithRegExp(/(^|\s)'([^']+)'(\s|$)/g, {matchIndex: 2})
    });

    assertCorrect("replace index", {
        expectedText: "hello  world.",
        expectedSymbols: ["beautiful"],
        test: "hello 'beautiful' world.".extractSymbolsWithRegExp(/(^|\s)('([^']+)')([^a-zA-Z])/g, {matchIndex: 3, replaceIndex: 2})
    });

    assertCorrect("replace index with space", {
        expectedText: "hello world.",
        expectedSymbols: ["beautiful"],
        test: "hello 'beautiful' world.".extractSymbolsWithRegExp(/(^|\s)('([^']+)'([^a-zA-Z]))/g, {matchIndex: 3, replaceIndex: 2})
    });


    assertCorrect("replace index with space", {
        expectedText: "hello <>",
        expectedSymbols: ["<world>"],
        test: "hello <world>".extractSymbolsWithRegExp(/( (<([^>]+)>))/g, {matchIndex: 2, replaceIndex: 3})
    });


});
