import assert from 'assert';
import '../../../src';


describe('flatten', () => {
    it('empty', () => {
        const items = [].flatten();
        assert.deepEqual(items, []);
    });
    it('empty 2d', () => {
        const items = [[]].flatten();
        assert.deepEqual(items, []);
    });
    it('empty 2d +', () => {
        const items = [[], []].flatten();
        assert.deepEqual(items, []);
    });
    it('empty 3d', () => {
        const items = [[[]]].flatten();
        assert.deepEqual(items, [[]]);
    });

    it('flat', () => {
        const items = [1, 2, 3].flatten();
        assert.deepEqual(items, [1, 2, 3]);
    });

    it('simple', () => {
        const items = [[1, 2, 3]].flatten();
        assert.deepEqual(items, [1, 2, 3]);
    });

    it('2 array', () => {
        const items = [[1, 2, 3], [4, 5, 6]].flatten();
        assert.deepEqual(items, [1, 2, 3, 4, 5, 6]);
    });

    it('mixed types', () => {
        const items = [[1, 2, 3], ['a', 'b']].flatten();
        assert.deepEqual(items, [1, 2, 3, 'a', 'b']);
    });

    it('mixed types 2', () => {
        const items = [[1, 2, 3], ['a', 'b'], [{a: 1}, {b: 2}]].flatten();
        assert.deepEqual(items, [1, 2, 3, 'a', 'b', {a: 1}, {b: 2}]);
    });

    it('mixed types 2', () => {
        const items = [[1, 2, 3], ['a', 'b'], [{a: 1}, {b: 2}]].flatten();
        assert.deepEqual(items, [1, 2, 3, 'a', 'b', {a: 1}, {b: 2}]);
    });

});
