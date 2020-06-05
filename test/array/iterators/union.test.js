import assert from 'assert';
import '../../../src';
import {TestObject} from "./test-object";

describe('union', () => {
    it('empty', () => {
        const items = [].union([]);
        assert.deepEqual(items, []);
    });

    it('empty list', () => {
        const items = [].union([1, 2, 3]);
        assert.deepEqual(items, []);
    });

    it('empty union', () => {
        const items = [1, 2].union([]);
        assert.deepEqual(items, []);
    });

    it('no overlap', () => {
        const items = [1, 2].union([3, 4]);
        assert.deepEqual(items, []);
    });

    it('1 overlap', () => {
        const items = [1, 2, 3].union([3, 4]);
        assert.deepEqual(items, [3]);
    });

    it('2 overlap', () => {
        const items = [1, 2, 3, 4].union([3, 4]);
        assert.deepEqual(items, [3, 4]);
    });

    it('all overlap', () => {
        const items = [1, 2].union([1, 2]);
        assert.deepEqual(items, [1, 2]);
    });


    it('example', () => {
        const items = [1, 2, 3, 4, 5].union([2, 3]);
        assert.deepEqual(items, [2, 3]);
    });


    it('example with objects', () => {
        const items = [{id: 1}, {id: 2}].union([{id: 1}, {id: 4}], item => item.id);
        assert.deepEqual(items,  [{id: 1}]);
    });

    it('all overlap different order', () => {
        const items = [1, 2, 3].union([3, 2, 1]);
        assert.deepEqual(items, [1, 2, 3]);
    });


    it('no extractor doesnt work', () => {
        const items = [{id: 1}, {id: 2}].union([{id: 1}, {id: 2}]);
        assert.deepEqual(items, []);
    });

    it('with extractor does work', () => {
        const items = [{id: 1}, {id: 2}].union([{id: 1}, {id: 2}], item => item.id);
        assert.deepEqual(items, [{id: 1}, {id: 2}]);
    });

    it('string extractor', () => {
        const items = [{id: 1}, {id: 2}, {id: 3}].union([{id: 1}, {id: 2}], "id");
        assert.deepEqual(items, [{id: 1}, {id: 2}]);
    });

    it('with object to strings', () => {
        const items = [new TestObject(1), new TestObject(2)].union([new TestObject(2), new TestObject(3)]);
        assert.deepEqual(items, [new TestObject(2)]);
    });

});
