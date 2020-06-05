import assert from 'assert';
import '../../../src';
import {TestObject} from "./test-object";

describe('filterMap', () => {


    it('filter false defaults', () => {
        const items = [0, false, null].filterMap();
        assert.deepEqual(items, []);
    });


    it('no params', () => {
        const items = ['a', 'b', 'c', 'd'].filterMap(a => a);
        assert.deepEqual(items, ['a', 'b', 'c', 'd']);
    });

    it('default filter', () => {
        const items = ['a', null, 'b', null].filterMap(a => a);
        assert.deepEqual(items, ['a', 'b']);
    });

    it('maps to null', () => {
        const items = ['a', 'b', 'c', 'd'].filterMap(() => null);
        assert.deepEqual(items, [null, null, null, null]);
    });

    it('default map', () => {
        const items = ['a', 'b', 'c', 'd'].filterMap(null, a => a != 'a');
        assert.deepEqual(items, ['b', 'c', 'd']);
    });

    it('string extractor', () => {
        const items = [{a: 1}, {a: 2}, {a: 3}].filterMap("a");
        assert.deepEqual(items, [1, 2, 3]);
    });

    it('string filter', () => {
        const items = [{a: 1}, {a: 2}, {c: 3}].filterMap(null, "a");
        assert.deepEqual(items, [{a: 1}, {a: 2}]);
    });

    it('values', () => {
        const items = ['a', 'b', 'c', 'd', 'e'].filterMap(a => a, a => a != 'c');
        assert.deepEqual(items, ['a', 'b', 'd', 'e']);
    });


    it('filter 1st', () => {
        const items = ['a', 'b', 'c', 'd', 'e'].filterMap(a => a, a => a != 'a');
        assert.deepEqual(items, ['b','c','d','e']);
    });

    it('filter last', () => {
        const items = ['a', 'b', 'c', 'd', 'e'].filterMap(a => a, a => a != 'e');
        assert.deepEqual(items, ['a', 'b', 'c', 'd']);
    });

    it('indexes', () => {
        const items = ['a', 'b', 'c', 'd', 'e'].filterMap((a, index) => index, a => a != 'c');
        assert.deepEqual(items, [0, 1, 3, 4]);
    });

    it('index map', () => {
        const items = [0, 1, 2, 3, 4].filterMap((a, index) => a * index, a => a != 3);
        assert.deepEqual(items, [0, 1, 4, 16]);
    });

    it('Filters Falsy', () => {
        const items = [0, 1, 2, null, 3, 4, false].filterMap((a, index) => a * index);
        assert.deepEqual(items, [1, 4, 12, 20]);
    });

});
