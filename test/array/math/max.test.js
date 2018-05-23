import assert from 'assert';
import '../../../src';

describe('max', () => {

    it('empty array', () => {
        assert.equal([].max(), null);
    });

    it('single value', () => {
        assert.equal([1].max(), 1);
    });

    it('max at end', () => {
        assert.equal([1,2,3,4,5].max(), 5);
    });

    it('max at beginning', () => {
        assert.equal([5,2,3,4,1].max(), 5);
    });

    it('max in middle', () => {
        assert.equal([1,2,5,1,2].max(), 5);
    });

    it('multiple max', () => {
        assert.equal([1,1,2,5,5,2].max(), 5);
    });

    it('beginning, end max', () => {
        assert.equal([6,1,2,5,5,6].max(), 6);
    });

    it('comparer', () => {
        assert.deepEqual([[1], [2], [3], [4]].max((a, b) => a[0] > b[0]), [4]);
    });
});
