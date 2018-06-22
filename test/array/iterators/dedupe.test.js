import assert from 'assert';
import '../../../src';


describe('dedupe', () => {
    it('empty - no handler', () => {
        assert.deepEqual([].dedupe(), []);
    });

    it('default handler', () => {
        assert.deepEqual([1, 2, 3, 1, 2, 3].dedupe(), [1,2,3]);
    });

    it('default handler all same', () => {
        assert.deepEqual([1, 1, 1, 1, 1, 1].dedupe(), [1]);
    });

    it('extractor called', () => {
        let called = false;
        [1].dedupe(value => {
            called = true;
            return value;
        });
        assert.ok(called);
    });

    it('extractor', () => {
        assert.deepEqual([{v: 1}, {v: 2}, {v:1}].dedupe(value => value.v), [{v: 1}, {v: 2}]);
    });

    it('extractor keeps first', () => {
        assert.deepEqual([{v: 1, a: 1}, {v: 2, a: 2}, {v:1, a: 3}].dedupe(value => value.v), [{v: 1, a: 1}, {v: 2, a: 2}]);
    });

    it('combiner not called when no duplicates', () => {
        let called = false;
        [1].dedupe(null, value => {
            called = true;
            return value;
        });
        assert.ok(!called);
    });

    it('combiner called', () => {
        let called = false;
        [1, 1].dedupe(null, (previous) => {
            called = true;
            return previous;
        });
        assert.ok(called);
    });

    it('custom assigner picks previous', () => {
        const result = [{v: 1, a: 1}, {v: 2, a: 2}, {v:1, a: 3}].dedupe(value => value.v, (prev) => prev);
        assert.deepEqual(result, [{v: 1, a: 1}, {v: 2, a: 2}]);
    });

    it('custom assigner picks new', () => {
        const result = [{v: 1, a: 1}, {v: 2, a: 2}, {v:1, a: 3}].dedupe(value => value.v, (prev, current) => current);
        assert.deepEqual(result, [{v: 1, a: 3}, {v: 2, a: 2}]);
    });
});
