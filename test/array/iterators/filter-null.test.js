import assert from 'assert';
import '../../../src';


describe('filterNotNull', () => {

    it('Empty list', () => {
        const items = [].filterNull();
        assert.deepEqual(items, []);
    });

    it('true elements', () => {
        const items = [true, 1, "hello"].filterNull();
        assert.deepEqual(items, [true, 1, "hello"]);
    });

    it('falsy elements', () => {
        const items = [false, 0, ""].filterNull();
        assert.deepEqual(items, [false, 0, ""]);
    });

    it('null elements removed', () => {
        const items = [null, undefined].filterNull();
        assert.deepEqual(items, []);
    });

    it('mix elements', () => {
        const items = [0, 1, null, undefined, false, true].filterNull();
        assert.deepEqual(items, [0, 1, false, true]);
    });
});
