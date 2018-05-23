import assert from 'assert';
import '../../../src';

describe('findIndexComparing', () => {

    it('values', () => {
        //handler, filter
        assert.equal(['a','b','c','d','e'].findIndexComparing((a) => a == 'c'), 2);
    });

    it('simulate max', () => {
        //handler, filter
        assert.equal([1,2,3,2,1].findIndexComparing((a, b) => a > b), 2);
    });

    it('simulate min', () => {
        //handler, filter
        assert.equal([1,2,3,2,1].findIndexComparing((a, b) => a > b), 2);
    });

    it('closest', () => {
        //handler, filter
        assert.equal([1,2,3,2,1].findIndexComparing((a, b) => Math.abs(a - 3) < Math.abs(b - 3)), 2);
    });

    it('furthest', () => {
        //handler, filter
        assert.equal([0,2,3,2,3].findIndexComparing((a, b) => Math.abs(a - 3) > Math.abs(b - 3)), 0);
    });

});
