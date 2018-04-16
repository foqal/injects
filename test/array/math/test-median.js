import assert from 'assert';
import '../../../src';

describe('median', () => {

    it('empty array', () => {
        assert.throws(() => {
            [].median();
        });
    });

    it('simple array', () => {
        assert.equal([1, 2, 3].median(), 2);
    });

    it('single value', () => {
        assert.equal([1].median(), 1);
    });

    it('same value', () => {
        assert.equal([1,1,1].median(), 1);
    });

    it('center value', () => {
        assert.equal([1,2,3,4].median(), 2.5);
    });

    it('not average value', () => {
        assert.equal([1,1,1,4].median(), 1);
    });

    it('extracted', () => {
        assert.equal([
            {value: 1},
            {value: 2},
            {value: 3},
            ].median(a => a.value), 2);
    });
});
