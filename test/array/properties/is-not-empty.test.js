import assert from 'assert';
import '../../../src';


describe('isNotEmpty', () => {

    it('no items', () => {
        //handler, filter
        assert.strictEqual([].isNotEmpty, false);
    });

    it('1 item', () => {
        //handler, filter
        assert.strictEqual([1].isNotEmpty, true);
    });

    it('2 items', () => {
        //handler, filter
        assert.strictEqual([1, 2].isNotEmpty, true);
    });

    it('1 null item', () => {
        //handler, filter
        assert.strictEqual([null].isNotEmpty, true);
    });

    it('1 undefined item', () => {
        //handler, filter
        assert.strictEqual([null].isNotEmpty, true);
    });
});
