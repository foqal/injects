import assert from 'assert';
import '../../../src';


describe('isEmpty', () => {

    it('no items', () => {
        //handler, filter
        assert.strictEqual([].isEmpty, true);
    });

    it('1 item', () => {
        //handler, filter
        assert.strictEqual([1].isEmpty, false);
    });

    it('2 items', () => {
        //handler, filter
        assert.strictEqual([1, 2].isEmpty, false);
    });

    it('1 null item', () => {
        //handler, filter
        assert.strictEqual([null].isEmpty, false);
    });

    it('1 undefined item', () => {
        //handler, filter
        assert.strictEqual([null].isEmpty, false);
    });
});
