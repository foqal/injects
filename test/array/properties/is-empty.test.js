import assert from 'assert';
import '../../../src';


describe('isEmpty', () => {

    it('no items', () => {
        //handler, filter
        assert.equal(true, [].isEmpty);
    });

    it('1 item', () => {
        //handler, filter
        assert.equal(false, [1].isEmpty);
    });

    it('2 items', () => {
        //handler, filter
        assert.equal(false, [1, 2].isEmpty);
    });

    it('1 null item', () => {
        //handler, filter
        assert.equal(false, [null].isEmpty);
    });
});
