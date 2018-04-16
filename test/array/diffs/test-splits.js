import assert from 'assert';
import '../../../src';


describe('splits', () => {

    it('empty array', () => {
        assert.deepEqual([].split(2), []);
    });

    it('simple array', () => {
        assert.deepEqual([1, 2, 3, 4].split(2), [[1, 2], [3, 4]]);
    });

    it('smaller than array', () => {
        assert.deepEqual([1, 2].split(3), [[1, 2]]);
    });

    it('same as split', () => {
        assert.deepEqual([1, 2, 3].split(3), [[1, 2, 3]]);
    });


    it('larger than split', () => {
        assert.deepEqual([1, 2, 3].split(2), [[1, 2], [3]]);
    });

    it('split size small', () => {
        assert.throws(() => {
            assert.deepEqual([].split(0), []);
        });
    });

});
