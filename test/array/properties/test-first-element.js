import assert from 'assert';
import '../../../src';

describe('firstElement', () => {

    it('no items', () => {
        //handler, filter
        assert.equal(null, [].firstElement);
    });

    it('1 item', () => {
        //handler, filter
        assert.equal(1, [1].firstElement);
    });

    it('2 items', () => {
        //handler, filter
        assert.equal(1, [1, 2].firstElement);
    });

    it('3 items', () => {
        //handler, filter
        assert.equal(1, [1, 2, 3].firstElement);
    });

});
