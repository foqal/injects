import assert from 'assert';
import '../../../src';

describe('min', () => {

    it('empty array', () => {
        assert.equal([].min(), null);
    });

    it('single value', () => {
        assert.equal([1].min(), 1);
    });

    it('min at end', () => {
        assert.equal([1,2,3,4,5,0].min(), 0);
    });

    it('min at beginning', () => {
        assert.equal([0, 5,2,3,4,1].min(), 0);
    });

    it('min in middle', () => {
        assert.equal([1,2,0,1,2].min(), 0);
    });

    it('multiple min', () => {
        assert.equal([1,1,2,0,0,2].min(), 0);
    });

    it('beginning, end min', () => {
        assert.equal([0,1,2,5,5,0].min(), 0);
    });

    it('comparer', () => {
        assert.deepEqual([[1], [2], [3], [4]].max((a, b) => a[0] < b[0]), [1]);
    });
});
