import assert from 'assert';
import '../../../src';


describe('min value', () => {

    it('empty array', () => {
        assert.equal([].minValue(), null);
    });

    it('single value', () => {
        assert.equal([1].minValue(), 1);
    });

    it('min at end', () => {
        assert.equal([1,2,3,4,5,0].minValue(), 0);
    });

    it('min at beginning', () => {
        assert.equal([0, 5,2,3,4,1].minValue(), 0);
    });

    it('min in middle', () => {
        assert.equal([1,2,0,1,2].minValue(), 0);
    });

    it('multiple min', () => {
        assert.equal([1,1,2,0,0,2].minValue(), 0);
    });

    it('beginning, end min', () => {
        assert.equal([0,1,2,5,5,0].minValue(), 0);
    });

    it('extractor', () => {
        assert.equal([[1], [2], [3], [4]].minValue(a => a[0]), 1);
    });
});
