import assert from 'assert';
import '../../../src';


describe('filterNotFalsy', () => {

    it('Empty list', () => {
        const items = [].filterNotFalsy();
        assert.deepEqual(items, []);
    });

    it('true elements', () => {
        const items = [1, true, "Hello"].filterNotFalsy();
        assert.deepEqual(items, [1, true, "Hello"]);
    });

    it('falsy elements', () => {
        const items = [false, 0, null, undefined, ""].filterNotFalsy();
        assert.deepEqual(items, []);
    });

    it('null elements removed', () => {
        const items = [null, undefined].filterNotFalsy();
        assert.deepEqual(items, []);
    });

    it('not null falsy elements removed', () => {
        const items = [0, "", false].filterNotFalsy();
        assert.deepEqual(items, []);
    });

    it('mix elements', () => {
        const items = [0, 1, null, undefined, false, true].filterNotFalsy();
        assert.deepEqual(items, [1, true]);
    });
});
