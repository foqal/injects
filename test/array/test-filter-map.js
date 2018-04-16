import assert from 'assert';
import '../../src';


describe('filterMap', () => {

    it('values', () => {
        //handler, filter
        const items = ['a','b','c','d','e'].filterMap(a => a, a => a != 'c');
        assert.deepEqual(items, ['a','b','d','e']);
    });


    it('filter 1st', () => {
        //handler, filter
        const items = ['a','b','c','d','e'].filterMap(a => a, a => a != 'a');
        assert.deepEqual(items, ['b','c','d','e']);
    });

    it('filter last', () => {
        //handler, filter
        const items = ['a','b','c','d','e'].filterMap(a => a, a => a != 'e');
        assert.deepEqual(items, ['a','b','c','d']);
    });

    it('indexes', () => {
        //handler, filter
        const items = ['a','b','c','d','e'].filterMap((a, index) => index, a => a != 'c');
        assert.deepEqual(items, [0,1,3,4]);
    });

    it('string map', () => {
        //handler, filter
        const items = [0,1,2,3,4].filterMap((a, index) => a * index, a => a != 3);
        assert.deepEqual(items, [0, 1, 4, 16]);
    });

});
