import assert from 'assert';
import '../../../src';


describe('filterNotNull', () => {

    it('Empty list', () => {
        const items = [].filterNotNull();
        assert.deepEqual(items, []);
    });

    it('true elements', () => {
        const items = [true, 1, "hello"].filterNotNull();
        assert.deepEqual(items, [true, 1, "hello"]);
    });

    it('falsy elements', () => {
        const items = [false, 0, ""].filterNotNull();
        assert.deepEqual(items, [false, 0, ""]);
    });

    it('null elements removed', () => {
        const items = [null, undefined].filterNotNull();
        assert.deepEqual(items, []);
    });

    it('mix elements', () => {
        const items = [0, 1, null, undefined, false, true].filterNotNull();
        assert.deepEqual(items, [0, 1, false, true]);
    });
});
