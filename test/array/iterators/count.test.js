import assert from 'assert';
import '../../../src';


describe('count', () => {
    it('empty - no handler', () => {
        assert.strictEqual([].count(), 0);
    });

    it('1 item - no handler', () => {
        assert.strictEqual([1].count(), 1);
    });

    it('2 item - no handler', () => {
        assert.strictEqual([1, 2].count(), 2);
    });

    it('2 item - no handler', () => {
        assert.strictEqual(["asdf", "asdf"].count(), 2);
    });

    it('default dont count falsy', () => {
        assert.strictEqual([true, false, null, undefined, 0, "", "hello"].count(), 2);
    });

    it('count falsy with handler', () => {
        assert.strictEqual([null, 0, undefined].count(() => true), 3);
    });

    it('custom handler', () => {
        assert.strictEqual([1, 2, 1, 3, 2, 3, 1, 4].count(value => value == 1), 3);
    });

    it('custom handler index', () => {
        assert.strictEqual([1, 2, 1, 3, 2, 3, 1, 4].count((value, index) => index > 3), 4);
    });

    it('custom handler index', () => {
        assert.strictEqual([{v: true}, {v: false}, {v: true}, {v: true}].count(value => value.v), 3);
    });
});
