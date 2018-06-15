import assert from 'assert';
import '../../../src';


describe('last', () => {
    it('last 1', () => {
      const items = [1,2,3,4,5].last(1);
      assert.deepEqual(items, [5]);
    });

    it('last 2', () => {
      const items = [1,2,3,4,5].last(2);
      assert.deepEqual(items, [4, 5]);
    });

    it('last bigger than list', () => {
      const items = [1, 2, 3, 4, 5].last(10);
      assert.deepEqual(items, [1, 2, 3, 4, 5]);
    });


    it('last bigger close list size', () => {
      const items = [1, 2, 3, 4, 5, 6, 7, 8, 9].last(10);
      assert.deepEqual(items, [1, 2, 3, 4, 5,6,7,8,9]);
    });

    it('last 5', () => {
      const items = [1, 2, 3, 4, 5].last(5);
      assert.deepEqual(items, [1, 2, 3, 4, 5]);
    });
});
