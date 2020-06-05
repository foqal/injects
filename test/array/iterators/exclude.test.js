import assert from 'assert';
import '../../../src';
import { TestObject } from './test-object';

describe('exclude', () => {
    it('empty', () => {
        const items = [].exclude([]);
        assert.deepEqual(items, []);
    });

    it('empty list', () => {
        const items = [].exclude([1, 2, 3]);
        assert.deepEqual(items, []);
    });

    it('empty exclude', () => {
        const items = [1, 2].exclude([]);
        assert.deepEqual(items, [1, 2]);
    });

    it('no overlap', () => {
        const items = [1, 2].exclude([3, 4]);
        assert.deepEqual(items, [1, 2]);
    });

    it('1 overlap', () => {
        const items = [1, 2, 3].exclude([3, 4]);
        assert.deepEqual(items, [1, 2]);
    });

    it('2 overlap', () => {
        const items = [1, 2, 3, 4].exclude([3, 4]);
        assert.deepEqual(items, [1, 2]);
    });

    it('all overlap', () => {
        const items = [1, 2].exclude([1, 2]);
        assert.deepEqual(items, []);
    });

    it('example', () => {
        const items = [1, 2, 3, 4, 5].exclude([2, 3]);
        assert.deepEqual(items, [1, 4, 5]);
    });

    it('example with objects', () => {
        const items = [{id: 1}, {id: 2}].exclude([{id: 1}, {id: 4}], "id");
        assert.deepEqual(items,  [{id: 2}]);
    });

    it('no extractor doesnt work', () => {
        const items = [{id: 1}, {id: 2}].exclude([{id: 1}, {id: 2}]);
        assert.deepEqual(items, [{id: 1}, {id: 2}]);
    });

    it('with extractor does work', () => {
        const items = [{id: 1}, {id: 2}].exclude([{id: 1}, {id: 2}], item => item.id);
        assert.deepEqual(items, []);
    });

    it('string extractor', () => {
        const items = [{id: 1}, {id: 2}, {id: 3}].exclude([{id: 1}, {id: 2}], "id");
        assert.deepEqual(items, [{id: 3}]);
    });


    it('with object to strings', () => {
        const items = [new TestObject(1), new TestObject(2)].exclude([new TestObject(2), new TestObject(3)]);
        assert.deepEqual(items, [new TestObject(1)]);
    });

});
