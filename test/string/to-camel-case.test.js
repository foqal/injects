import assert from 'assert';
import '../../src';

describe('Camel Case', () => {


    describe('No Params', () => {

        it('length 0', () => {
            assert.strictEqual("".toCamelCase(), "");
        });

        it('1 word', () => {
            assert.strictEqual("hello".toCamelCase(), "hello");
        });

        it('already capitalized', () => {
            assert.strictEqual("Hello".toCamelCase(), "hello");
        });

        it('All capps', () => {
            assert.strictEqual("HELLO".toCamelCase(), "hello");
        });

        it('2 word', () => {
            assert.strictEqual("hello world".toCamelCase(), "helloWorld");
        });

        it('All capp multiple', () => {
            assert.strictEqual("HELLO WORLD".toCamelCase(), "helloWorld");
        });

        it('already capitalized', () => {
            assert.strictEqual("Hello    world".toCamelCase(), "helloWorld");
        });

    });

});
