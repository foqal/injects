import assert from 'assert';
import '../../src';

describe('toDarwinCase', () => {


    describe('No Params', () => {

        it('length 0', () => {
            assert.strictEqual("".toDarwinCase(), "");
        });

        it('1 word', () => {
            assert.strictEqual("hello".toDarwinCase(), "Hello");
        });

        it('already capitalized', () => {
            assert.strictEqual("Hello".toDarwinCase(), "Hello");
        });

        it('2 word', () => {
            assert.strictEqual("hello world".toDarwinCase(), "Hello_World");
        });

        it('already capitalized', () => {
            assert.strictEqual("Hello    world".toDarwinCase(), "Hello_World");
        });

        it('Case Match', () => {
            assert.strictEqual("HelloWorld".toDarwinCase(), "Hello_World");
        });

        it('Case Match lower', () => {
            assert.strictEqual("helloWorld".toDarwinCase(), "Hello_World");
        });

        it('All Capital', () => {
            assert.strictEqual("HELLO WORLD".toDarwinCase(), "Hello_World");
        });

        it('Space and cap', () => {
            assert.strictEqual("hello worldHowAre".toDarwinCase(), "Hello_World_How_Are");
        });

    });




    describe('Splitter', () => {

        it('length 0', () => {
            assert.strictEqual("".toDarwinCase(/ /g), "");
        });

        it('length 0 - string splitter', () => {
            assert.strictEqual("".toDarwinCase(" "), "");
        });

        it('1 word', () => {
            assert.strictEqual("hello".toDarwinCase(/ /g), "Hello");
        });

        it('1 word - string splitter', () => {
            assert.strictEqual("hello".toDarwinCase(" "), "Hello");
        });

        it('already capitalized', () => {
            assert.strictEqual("Hello".toDarwinCase(/ /g), "Hello");
        });

        it('already capitalized - string splitter', () => {
            assert.strictEqual("Hello".toDarwinCase(" "), "Hello");
        });

        it('string splitter', () => {
            assert.strictEqual("Hello    world".toDarwinCase("  "), "Hello__World");
        });

        it('regexp flags', () => {
            assert.strictEqual("Hello world".toDarwinCase(/O/i), "Hell_ w_Rld");
        });

        it('2 word', () => {
            assert.strictEqual("hello world".toDarwinCase(/ /g), "Hello_World");
        });

        it('already capitalized', () => {
            assert.strictEqual("Hello World".toDarwinCase(/ /g), "Hello_World");
        });

        it('middle split', () => {
            assert.strictEqual("Hello world".toDarwinCase(/o/g), "Hell_ w_Rld");
        });

        it('different characters split', () => {
            assert.strictEqual("Hello world".toDarwinCase(/[eo]/g), "H_Ll_ w_Rld");
        });

        it('last character', () => {
            assert.strictEqual("Hello world".toDarwinCase(/d/g), "Hello worl_");
        });

        it('empty segments', () => {
            assert.strictEqual("Hello world".toDarwinCase(/l/g), "He__O wor_D");
        });

        it('long splitter', () => {
            assert.strictEqual("Hello world".toDarwinCase(/wor/g), "Hello _Ld");
        });

    });


     describe('Splitter + Joiner', () => {

        it('length 0', () => {
            assert.strictEqual("".toDarwinCase(/ /g, "-"), "");
        });

        it('1 word', () => {
            assert.strictEqual("hello".toDarwinCase(/ /g, "-"), "Hello");
        });

        it('already capitalized', () => {
            assert.strictEqual("Hello".toDarwinCase(/ /g, "-"), "Hello");
        });

        it('2 word', () => {
            assert.strictEqual("hello world".toDarwinCase(/ /g, "-"), "Hello-World");
        });

        it('already capitalized', () => {
            assert.strictEqual("Hello World".toDarwinCase(/ /g, "-"), "Hello-World");
        });

        it('middle split', () => {
            assert.strictEqual("Hello world".toDarwinCase(/o/g, "-"), "Hell- w-Rld");
        });

         it('different characters split', () => {
            assert.strictEqual("Hello world".toDarwinCase(/[eo]/g, "-"), "H-Ll- w-Rld");
        });

        it('last character', () => {
            assert.strictEqual("Hello world".toDarwinCase(/d/g, "-"), "Hello worl-");
        });

        it('empty segments', () => {
            assert.strictEqual("Hello world".toDarwinCase(/l/g, "-"), "He--O wor-D");
        });

        it('long splitter, short joiner', () => {
            assert.strictEqual("Hello world".toDarwinCase(/wor/g, "-"), "Hello -Ld");
        });

        it('short splitter, long joiner', () => {
            assert.strictEqual("Hello world".toDarwinCase(/ /g, "-ASDF-"), "Hello-ASDF-World");
        });

        it('new lines', () => {
            assert.strictEqual("Hello\nworld".toDarwinCase(/\n/, " "), "Hello World");
        });

        it('join by empty string', () => {
            assert.strictEqual("Hello world".toDarwinCase(" ", ""), "HelloWorld");
        });

        it('join by 0', () => {
            assert.strictEqual("hello world".toDarwinCase(" ", 0), "Hello0World");
        });

        it('join by false', () => {
            assert.strictEqual("hello world".toDarwinCase(" ", false), "HellofalseWorld");
        });
    });



});
