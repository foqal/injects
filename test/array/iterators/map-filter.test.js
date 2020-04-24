import assert from 'assert';
import '../../../src';


describe('mapFilter', () => {


    it('filter false defaults', () => {
        const items = [0, false, null].mapFilter();
        assert.deepEqual(items, [0, false]);
    });

    it('no params', () => {
        const items = ['a', 'b', 'c', 'd'].mapFilter(a => a);
        assert.deepEqual(items, ['a', 'b', 'c', 'd']);
    });

    it('default filter', () => {
        const items = ['a', null, 'b', null].mapFilter(a => a);
        assert.deepEqual(items, ['a', 'b']);
    });

    it('maps to null', () => {
        const items = ['a', 'b', 'c', 'd'].mapFilter(() => null);
        assert.deepEqual(items, []);
    });

    it('default map', () => {
        const items = ['a', 'b', 'c', 'd'].mapFilter(null, a => a != 'a');
        assert.deepEqual(items, ['b', 'c', 'd']);
    });

    it('values', () => {
        const items = ['a', 'b', 'c', 'd', 'e'].mapFilter(a => a, a => a != 'c');
        assert.deepEqual(items, ['a', 'b', 'd', 'e']);
    });


    it('filter 1st', () => {
        const items = ['a', 'b', 'c', 'd', 'e'].mapFilter(a => a, a => a != 'a');
        assert.deepEqual(items, ['b', 'c', 'd', 'e']);
    });

    it('filter last', () => {
        const items = ['a', 'b', 'c', 'd', 'e'].mapFilter(a => a, a => a != 'e');
        assert.deepEqual(items, ['a', 'b', 'c', 'd']);
    });

    it('indexes', () => {
        const items = ['a', 'b', 'c', 'd', 'e'].mapFilter((a, index) => index, index => index != 2);
        assert.deepEqual(items, [0, 1, 3, 4]);
    });

    it('index map', () => {
        const items = [0, 1, 2, 3, 4].mapFilter((a, index) => a * index, a => a != 9);
        assert.deepEqual(items, [0, 1, 4, 16]);
    });

    it('index letters', () => {
        const items = ['a', 'b', 'c', 'd'].mapFilter((value, index) => value + index, a => a != 'b1');
        assert.deepEqual(items, ['a0', 'c2', 'd3']);
    });

});
