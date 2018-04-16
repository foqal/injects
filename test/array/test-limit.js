import assert from 'assert';
import '../../src';


describe('limit', () => {
    it('limit first 1', () => {
      const items = [1,2,3,4,5].limit(1);
      assert.deepEqual(items, [1]);
    });

    it('limit first 2', () => {
      const items = [1,2,3,4,5].limit(2);
      assert.deepEqual(items, [1, 2]);
    });

    it('limit bigger than list', () => {
      const items = [1,2,3,4,5].limit(10);
      assert.deepEqual(items, [1, 2, 3, 4, 5]);
    });

    it('limit 5', () => {
      const items = [1,2,3,4,5].limit(5);
      assert.deepEqual(items, [1, 2, 3, 4, 5]);
    });
});
