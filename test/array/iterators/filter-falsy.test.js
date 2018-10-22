import assert from 'assert';
import '../../../src';


describe('filterFalsy', () => {

    it('Empty list', () => {
        const items = [].filterFalsy();
        assert.deepEqual(items, []);
    });

    it('true elements', () => {
        const items = [1, true, "Hello"].filterFalsy();
        assert.deepEqual(items, [1, true, "Hello"]);
    });

    it('falsy elements', () => {
        const items = [false, 0, null, undefined, ""].filterFalsy();
        assert.deepEqual(items, []);
    });

    it('null elements removed', () => {
        const items = [null, undefined].filterFalsy();
        assert.deepEqual(items, []);
    });

    it('not null falsy elements removed', () => {
        const items = [0, "", false].filterFalsy();
        assert.deepEqual(items, []);
    });

    it('mix elements', () => {
        const items = [0, 1, null, undefined, false, true].filterFalsy();
        assert.deepEqual(items, [1, true]);
    });
});
