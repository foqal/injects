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

    it('not caching on add', () => {
        const array = [1, 2, 3];
        assert.equal(1, array.firstElement);
        array.unshift("a");
        //handler, filter
        assert.equal("a", array.firstElement);
    });

    it('not caching on remove', () => {
        const array = [1, 2, 3];
        assert.equal(1, array.firstElement);
        array.shift();
        //handler, filter
        assert.equal(2, array.firstElement);
    });

});
