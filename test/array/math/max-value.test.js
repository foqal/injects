import assert from 'assert';
import '../../../src';

describe('max value', () => {
   it('empty array', () => {
       assert.equal([].maxValue(), null);
   });

   it('single value', () => {
       assert.equal([1].maxValue(), 1);
   });

   it('max at end', () => {
       assert.equal([1,2,3,4,5].maxValue(), 5);
   });

   it('max at beginning', () => {
       assert.equal([5,2,3,4,1].maxValue(), 5);
   });

   it('max in middle', () => {
       assert.equal([1,2,5,1,2].maxValue(), 5);
   });

   it('multiple max', () => {
       assert.equal([1,1,2,5,5,2].maxValue(), 5);
   });

   it('beginning, end max', () => {
       assert.equal([6,1,2,5,5,6].maxValue(), 6);
   });

   it('extractor', () => {
       assert.equal([[1], [2], [3], [4]].maxValue(a => a[0]), 4);
   });
});
