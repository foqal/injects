import assert from 'assert';
import '../../../src';


describe('diff', () => {

    it('same values', () => {
        assert.deepEqual([1,2,3].diff([1,2,3]), []);
    });

    it('compare empty', () => {
        const diff = [].diff([]);
        assert.deepEqual(diff, []);
    });

    it('compare to empty', () => {
        const diff = ['a', 'b', 'c'].diff([]);
        assert.deepEqual(diff, [
            ['a', null, 0, null],
            ['b', null, 1, null],
            ['c', null, 2, null]
        ]);
    });

    it('compare from empty', () => {
        const diff = [].diff(['a', 'b', 'c']);
        assert.deepEqual(diff, [
            [null, 'a', null, 0],
            [null, 'b', null, 1],
            [null, 'c', null, 2]
        ]);
    });

    it('add one', () => {
        const diff = ['a', 'b', 'c', 'd'].diff(['a', 'b', 'c']);
        assert.deepEqual(diff, [['d', null, 3, null]]);
    });

    it('remove one', () => {
        const diff = ['a', 'b', 'c'].diff(['a', 'b', 'c', 'd']);
        assert.deepEqual(diff, [[null, 'd', null, 3]]);
    });

    it('change one', () => {
        const diff = ['a', 'b', 'c', 'd'].diff(['a', 'b', 'c', 'e']);
        assert.deepEqual(diff, [['d', 'e', 3, 3]]);
    });

    it('added one middle', () => {
        const diff = ['a', 'b', 'c', 'd', 'e'].diff(['a', 'b', 'c', 'e']);
        assert.deepEqual(diff, [['d', null, 3, null]]);
    });

    it('added 2 middle', () => {
        const diff = ['a', 'b', 'c', 'd', 'e', 'f'].diff(['a', 'b', 'c', 'f']);
        assert.deepEqual(diff, [
            ['d', null, 3, null],
            ['e', null, 4, null]
        ]);
    });

    it('added 1 middle 1 end', () => {
        const diff = ['a', 'b', 'c', 'd', 'e', 'f'].diff(['a', 'b', 'c', 'e']);
        assert.deepEqual(diff, [
            ['d', null, 3, null],
            ['f', null, 5, null]
        ]);
    });

    it('added 1 middle 1 end', () => {
        const diff = ['a', 'b', 'c', 'd', 'e'].diff(['a', 'b', 'c', 'e', 'f']);
        assert.deepEqual(diff, [
            ['d', null, 3, null],
            [null, 'f', null, 4]
        ]);
    });

    it('added 1 middle 1 end', () => {
        const diff = [{v: 'a'}, {v: 'b'}, {v: 'c'}, {v: 'd'}].diff(['a', 'b', 'c', 'e'], (left, right) => left.v == right);
        assert.deepEqual(diff, [
            [{v: 'd'}, 'e', 3, 3]
        ]);
    });



});
