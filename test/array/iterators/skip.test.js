import assert from 'assert';
import '../../../src';

describe('skip', () => {
    it('1', () => {
        const items = [1,2,3,4,5].skip(1);
        assert.deepEqual(items, [2, 3, 4, 5]);
    });

    it('2', () => {
        const items = [1,2,3,4,5].skip(2);
        assert.deepEqual(items, [3, 4, 5]);
    });

    it('list size', () => {
        const items = [1,2,3,4,5].skip(5);
        assert.deepEqual(items, []);
    });

    it('more than list', () => {
        const items = [1,2,3,4,5].skip(10);
        assert.deepEqual(items, []);
    });
});
