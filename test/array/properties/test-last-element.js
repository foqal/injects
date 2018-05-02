import assert from 'assert';
import '../../../src';


describe('lastElement', () => {

    it('no items', () => {
        //handler, filter
        assert.equal(null, [].lastElement);
    });

    it('1 item', () => {
        //handler, filter
        assert.equal(1, [1].lastElement);
    });

    it('2 items', () => {
        //handler, filter
        assert.equal(2, [1, 2].lastElement);
    });

    it('3 items', () => {
        //handler, filter
        assert.equal(3, [1, 2, 3].lastElement);
    });

});
