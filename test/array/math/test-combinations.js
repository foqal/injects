import assert from 'assert';
import '../../../src';


describe('combinations', () => {

    describe('combinations', () => {

        it('empty array', () => {
            assert.deepEqual([].combinations(2), []);
        });

        it('3 pick 1 array', () => {
            assert.deepEqual([1, 2, 3].combinations(1).sort(), [[1], [2], [3]].sort());
        });

        it('2 pick 2 single array', () => {
            assert.deepEqual([1, 2].combinations(2).sort(), [[1, 2]].sort());
        });

        it('3 pick 2 array', () => {
           assert.deepEqual([1, 2, 3].combinations(2).sort(), [[1, 2], [1, 3], [2, 3]].sort());
        });

        it('3 pick 3 array', () => {
           assert.deepEqual([1, 2, 3].combinations(3).sort(), [[1, 2, 3]].sort());
        });

        it('4 pick 3 array', () => {
            assert.deepEqual([1, 2, 3, 4].combinations(3).sort(), [[1,2,3],[1,2,4],[1,3,4],[2,3,4]].sort());
        });

        it('5 pick 2 array', () => {
            assert.deepEqual([1, 2, 3, 4, 5].combinations(2).sort(), [[1,2],[1,3],[1,4],[1,5],[2,3],[2,4],[2,5],[3,4],[3,5],[4,5]].sort());
        });

        it('5 pick 3 array', () => {
            assert.deepEqual([1, 2, 3, 4, 5].combinations(3).sort(), [[1,2,3],[1,2,4],[1,2,5],[1,3,4],[1,3,5],[1,4,5],[2,3,4],[2,3,5],[2,4,5],[3,4,5]].sort());
        });

    });

    describe('no size', () => {

        it('empty array', () => {
            assert.deepEqual([].combinations(), []);
        });

        it('2 digits', () => {
            assert.deepEqual([1, 2].combinations().sort(), [[1], [2], [1, 2]].sort());
        });

        it('3 digits', () => {
            assert.deepEqual([1, 2, 3].combinations().sort(), [[1], [2], [3], [1, 2], [1, 3], [2, 3], [1,2,3]].sort());
        });

        it('4 digits', () => {
            assert.deepEqual([1, 2, 3, 4].combinations().sort(), [[1], [2], [3], [4],
                                                                  [1,2],[1,3],[1,4],[2,3],[2,4],[3,4],
                                                                  [1,2,3],[1,2,4],[1,3,4],[2,3,4],
                                                                  [1,2,3,4]].sort());
        });

    });
});
