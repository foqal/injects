import assert from 'assert';
import '../../../src';

describe('offsetForEach', () => {

    it('empty', () => {
        const items = [];
        [].offsetForEach(1, null, i => items.push(i));
        assert.deepEqual(items, []);
    });

    it('no identity throws', () => {
        assert.throws(() => [].offsetForEach());
    });

    it('no identity throws non empty', () => {
        assert.throws(() => [1, 2].offsetForEach());
    });

    it('only start', () => {
        const items = [];
        [1, 2, 3, 4, 5].offsetForEach(1, null, i => items.push(i));
        assert.deepEqual(items, [2, 3, 4, 5]);
    });

    it('only end', () => {
        const items = [];
        [1, 2, 3, 4, 5].offsetForEach(null, 3, i => items.push(i));
        assert.deepEqual(items, [1, 2, 3]);
    });

    it('subset', () => {
        const items = [];
        [1, 2, 3, 4, 5].offsetForEach(1, 2, i => items.push(i));
        assert.deepEqual(items, [2, 3]);
    });


    it('has objects', () => {
        [1, 2, 3, 4, 5].offsetForEach(1, 2, obj => assert.ok(obj != null));
    });

    it('has index', () => {
        [1, 2, 3, 4, 5].offsetForEach(1, 2, (obj, index) => assert.ok(index != null));
    });
});
