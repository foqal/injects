import assert from 'assert';
import '../../../src';

describe('equals', () => {

    it('empty', () => {
        assert.strictEqual([].equals([]), true);
    });

    it('null', () => {
        assert.strictEqual([].equals(null), false);
    });

    it('undefined', () => {
        assert.strictEqual([].equals(undefined), false);
    });

    it('not equal', () => {
        assert.strictEqual([].equals([1]), false);
    });

    it('equal 1 element', () => {
        assert.strictEqual([1].equals([1]), true);
    });

    it('equal 1 element different types', () => {
        assert.strictEqual([1].equals(["1"]), false);
    });

    it('equal 2 elements', () => {
        assert.strictEqual([1, 2].equals([1, 2]), true);
    });

    it('not equal 2 elements different order', () => {
        assert.strictEqual([1, 2].equals([2, 1]), false);
    });

    it('not equal different types', () => {
        assert.strictEqual([1].equals([ [1] ]), false);
    });

    it('has equals method', () => {
        assert.strictEqual([ {
            equals: () => true
        }].equals([1]), true);
    });

    it('has equals method', () => {
        assert.strictEqual([ {
            equals: () => false
        }].equals([1]), false);
    });

    it('deep equals', () => {
        assert.strictEqual([ [1] ].equals([ [1] ]), true);
    });

    it('deep equals - 2', () => {
        assert.strictEqual([ [1], [2] ].equals([ [1], [2] ]), true);
    });

    it('deep equals different', () => {
        assert.strictEqual([ [1], [2] ].equals([ [1] ]), false);
    });

});
