import assert from 'assert';
import '../../src';

describe('capitalize', () => {


    describe('No Params', () => {

        it('length 0', () => {
            assert.strictEqual("".capitalize(), "");
        });

        it('1 word', () => {
            assert.strictEqual("hello".capitalize(), "Hello");
        });

        it('already capitalized', () => {
            assert.strictEqual("Hello".capitalize(), "Hello");
        });

         it('2 word', () => {
            assert.strictEqual("hello world".capitalize(), "Hello world");
        });

        it('already capitalized', () => {
            assert.strictEqual("Hello world".capitalize(), "Hello world");
        });

    });




    describe('Splitter', () => {

        it('length 0', () => {
            assert.strictEqual("".capitalize(/ /g), "");
        });

        it('length 0 - string splitter', () => {
            assert.strictEqual("".capitalize(" "), "");
        });

        it('1 word', () => {
            assert.strictEqual("hello".capitalize(/ /g), "Hello");
        });

        it('1 word - string splitter', () => {
            assert.strictEqual("hello".capitalize(" "), "Hello");
        });

        it('already capitalized', () => {
            assert.strictEqual("Hello".capitalize(/ /g), "Hello");
        });

        it('already capitalized - string splitter', () => {
            assert.strictEqual("Hello".capitalize(" "), "Hello");
        });

        it('string splitter', () => {
            assert.strictEqual("Hello    world".capitalize("  "), "Hello    World");
        });

        it('regexp flags', () => {
            assert.strictEqual("Hello world".capitalize(/O/i), "Hello woRld");
        });

        it('2 word', () => {
            assert.strictEqual("hello world".capitalize(/ /g), "Hello World");
        });

        it('already capitalized', () => {
            assert.strictEqual("Hello World".capitalize(/ /g), "Hello World");
        });

        it('middle split', () => {
            assert.strictEqual("Hello world".capitalize(/o/g), "Hello woRld");
        });

        it('different characters split', () => {
            assert.strictEqual("Hello world".capitalize(/[eo]/g), "HeLlo woRld");
        });

        it('last character', () => {
            assert.strictEqual("Hello world".capitalize(/d/g), "Hello world");
        });

        it('empty segments', () => {
            assert.strictEqual("Hello world".capitalize(/l/g), "HellO worlD");
        });

        it('long splitter', () => {
            assert.strictEqual("Hello world".capitalize(/wor/g), "Hello worLd");
        });

    });


     describe('Splitter + Joiner', () => {

        it('length 0', () => {
            assert.strictEqual("".capitalize(/ /g, "-"), "");
        });

        it('1 word', () => {
            assert.strictEqual("hello".capitalize(/ /g, "-"), "Hello");
        });

        it('already capitalized', () => {
            assert.strictEqual("Hello".capitalize(/ /g, "-"), "Hello");
        });

        it('2 word', () => {
            assert.strictEqual("hello world".capitalize(/ /g, "-"), "Hello-World");
        });

        it('already capitalized', () => {
            assert.strictEqual("Hello World".capitalize(/ /g, "-"), "Hello-World");
        });

        it('middle split', () => {
            assert.strictEqual("Hello world".capitalize(/o/g, "-"), "Hell- w-Rld");
        });

         it('different characters split', () => {
            assert.strictEqual("Hello world".capitalize(/[eo]/g, "-"), "H-Ll- w-Rld");
        });

        it('last character', () => {
            assert.strictEqual("Hello world".capitalize(/d/g, "-"), "Hello worl-");
        });

        it('empty segments', () => {
            assert.strictEqual("Hello world".capitalize(/l/g, "-"), "He--O wor-D");
        });

        it('long splitter, short joiner', () => {
            assert.strictEqual("Hello world".capitalize(/wor/g, "-"), "Hello -Ld");
        });

        it('short splitter, long joiner', () => {
            assert.strictEqual("Hello world".capitalize(/ /g, "-ASDF-"), "Hello-ASDF-World");
        });

        it('new lines', () => {
            assert.strictEqual("Hello\nworld".capitalize(/\n/, " "), "Hello World");
        });
    });



});

