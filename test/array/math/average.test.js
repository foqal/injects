import assert from 'assert';
import '../../../src';

describe('average', () => {

    it('empty array', () => {
        assert.throws(() => {
            [].average();
        });
    });

    it('simple array', () => {
        assert.equal([1, 2, 3].average(), 2);
    });

    it('single value', () => {
        assert.equal([1].average(), 1);
    });

    it('same value', () => {
        assert.equal([1,1,1].average(), 1);
    });

    it('not median value', () => {
        assert.equal([1,1,1,4].average(), 1.75);
    });

    it('extracted', () => {
        assert.equal([
            {value: 1},
            {value: 2},
            {value: 3},
            ].average(a => a.value), 2);
    });

});
