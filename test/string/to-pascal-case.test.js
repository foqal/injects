import assert from 'assert';
import '../../src';

describe('Pascal Case', () => {


    describe('No Params', () => {

        it('length 0', () => {
            assert.strictEqual("".toPascalCase(), "");
        });

        it('1 word', () => {
            assert.strictEqual("hello".toPascalCase(), "Hello");
        });

        it('already capitalized', () => {
            assert.strictEqual("Hello".toPascalCase(), "Hello");
        });

        it('All capps', () => {
            assert.strictEqual("HELLO".toPascalCase(), "Hello");
        });

        it('2 word', () => {
            assert.strictEqual("hello world".toPascalCase(), "HelloWorld");
        });

        it('All capp multiple', () => {
            assert.strictEqual("HELLO WORLD".toPascalCase(), "HelloWorld");
        });

        it('already capitalized', () => {
            assert.strictEqual("Hello    world".toPascalCase(), "HelloWorld");
        });

    });

});
