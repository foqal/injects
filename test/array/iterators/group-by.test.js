import assert from 'assert';
import '../../../src';

function assertDeepStrictEqual(actual, expected) {
    const start = Object.create(null);
    const expect = Object.assign(start, expected);
    assert.deepStrictEqual(actual, expect);
}

describe('groupBy', () => {


    it('empty - no handler', () => {
        assertDeepStrictEqual([].groupBy(), {});
    });

    it('empty - dont call handler', () => {
        [].groupBy(() => {
            throw new Error("Should not be called.");
        });
    });

    it('empty - dont call extractor', () => {
        [].groupBy(null, () => {
            throw new Error("Should not be called.");
        });
    });

    it('default', () => {
        const actual = [{id: 1, a: 1}, {id: 1, a: 2}].groupBy();
        assertDeepStrictEqual(actual, {1: [{id: 1, a: 1}, {id: 1, a: 2}]});

    });

    it('default different keys', () => {
        assertDeepStrictEqual([{id: 1, a: 1}, {id: 1, a: 2}, {id: 2, a: 3}].groupBy(), {
            1: [{id: 1, a: 1}, {id: 1, a: 2}],
            2: [{id: 2, a: 3}]
        });
    });

    it('default different keys out of order', () => {
        assertDeepStrictEqual([{id: 1, a: 1}, {id: 2, a: 3}, {id: 1, a: 2}].groupBy(), {
            1: [{id: 1, a: 1}, {id: 1, a: 2}],
            2: [{id: 2, a: 3}]
        });
    });

    it('string key', () => {
        assertDeepStrictEqual([{id: 1, a: 1}, {id: 2, a: 3}, {id: 1, a: 2}].groupBy("a"), {
            1: [{id: 1, a: 1}],
            2: [{id: 1, a: 2}],
            3: [{id: 2, a: 3}]
        });
    });

    it('identity key handler', () => {
        assertDeepStrictEqual([1,2,3].groupBy(id => id), {1: [1], 2: [2], 3: [3]});
    });

    it('basic key extractor', () => {
        assertDeepStrictEqual([{id: 1, a: 1}, {id: 2, a: 3}, {id: 1, a: 2}].groupBy(id => id.a), {
            1: [{id: 1, a: 1}],
            2: [{id: 1, a: 2}],
            3: [{id: 2, a: 3}]
        });
    });

    it('basic key extractor strings', () => {
        assertDeepStrictEqual([{id: 1, a: "a"}, {id: 2, a: "b"}, {id: 3, a: "b"}].groupBy(id => id.a), {
            "a": [{id: 1, a: "a"}],
            "b": [{id: 2, a: "b"}, {id: 3, a: "b"}],
        });
    });

    it('string value handler', () => {
        assertDeepStrictEqual([{id: 1, a: 1}, {id: 2, a: 3}, {id: 1, a: 2}].groupBy(null, "a"), {
            1: [1, 2],
            2: [3]
        });
    });

    it('basic value handler', () => {
        assertDeepStrictEqual([{id: 1, a: 1}, {id: 2, a: 3}, {id: 1, a: 2}].groupBy(null, id => id), {
            1: [{id: 1, a: 1}, {id: 1, a: 2}],
            2: [{id: 2, a: 3}]
        });
    });

    it('basic value handler sub key', () => {
        assertDeepStrictEqual([{id: 1, a: 1}, {id: 2, a: 3}, {id: 1, a: 2}].groupBy(null, id => id.a), {
            1: [1, 2],
            2: [3]
        });
    });

    it('basic value handler sub key strings', () => {
        assertDeepStrictEqual([{id: 1, a: "a"}, {id: 2, a: "b"}, {id: 1, a: "c"}].groupBy(null, id => id.a), {
            1: ["a", "c"],
            2: ["b"]
        });
    });

});
