import assert from 'assert';
import '../../src';

describe('Snake Case', () => {


    describe('No Params', () => {

        it('length 0', () => {
            assert.strictEqual("".toSnakeCase(), "");
        });

        it('1 word', () => {
            assert.strictEqual("hello".toSnakeCase(), "hello");
        });

        it('already capitalized', () => {
            assert.strictEqual("Hello".toSnakeCase(), "hello");
        });

        it('2 word', () => {
            assert.strictEqual("hello world".toSnakeCase(), "hello_world");
        });

        it('already capitalized', () => {
            assert.strictEqual("Hello    world".toSnakeCase(), "hello_world");
        });

        it('mix case', () => {
            assert.strictEqual("HelloWorld".toSnakeCase(), "hello_world");
        });

        it('All Capital', () => {
            assert.strictEqual("HELLO WORLD".toSnakeCase(), "hello_world");
        });

        it('Space and cap', () => {
            assert.strictEqual("hello worldHowAre".toSnakeCase(), "hello_world_how_are");
        });
    });

});
