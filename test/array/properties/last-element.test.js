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

    it('not caching on add', () => {
        const array = [1, 2, 3];
        assert.equal(3, array.lastElement);
        array.push("a");
        //handler, filter
        assert.equal("a", array.lastElement);
    });

    it('not caching on remove', () => {
        const array = [1, 2, 3];
        assert.equal(3, array.lastElement);
        array.pop();
        //handler, filter
        assert.equal(2, array.lastElement);
    });
});
