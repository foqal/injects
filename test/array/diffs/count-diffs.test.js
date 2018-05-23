import assert from 'assert';
import '../../../src';


describe('count diffs', () => {

    it('same values', () => {
        //handler, filter
        assert.equal([1,2,3].countDiffs([1,2,3], (a, b) => a - b), 1);
    });


    it('switches 2', () => {
        //handler, filter
        assert.equal([1,2,4].countDiffs([1,2,3,5], (a, b) => a - b), 2);
    });


    it('switches 3', () => {
        //handler, filter
        assert.equal([1,2,4,6].countDiffs([1,2,3,5], (a, b) => a - b), 3);
    });

});
