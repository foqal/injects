import assert from 'assert';
import '../../src';

describe('switches', () => {

    const comparer = (a, b) => a == b;

    it('simplest: 1', () => {
        assert.equal([1,2].switches(comparer), 2);
    });

    it('simplest: 2', () => {
        assert.equal([1,2,3].switches(comparer), 3);
    });

    it('repeating 1', () => {
        assert.equal([1, 2, 2].switches(comparer), 2);
    });

    it('repeating 2', () => {
        assert.equal([1, 2, 2, 1].switches(comparer), 3);
    });

    it('repeating 3', () => {
        assert.equal([1, 2, 2, 1, 2].switches(comparer), 4);
    });

    it('uniques: 4', () => {
        assert.equal([1, 2, 3, 4].switches(comparer), 4);
    });
});
