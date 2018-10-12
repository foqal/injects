import assert from 'assert';
import '../../../src';

function assertDeepStrictEqual(actual, expected) {
    const start = Object.create(null);
    const expect = Object.assign(start, expected);
    assert.deepStrictEqual(actual, expect);
}

describe('distribution', () => {


    it('empty - no handler', () => {
        assertDeepStrictEqual([].distribution(), {});
    });

    it('empty - dont call handler', () => {
        [].distribution(() => {
            throw new Error("Should not be called.");
        });
    });

    it('default', () => {
        const actual = [{id: 1, a: 1}, {id: 1, a: 2}].distribution();
        assertDeepStrictEqual(actual, {1: 2});

    });

    it('default different keys', () => {
        assertDeepStrictEqual([{id: 1, a: 1}, {id: 1, a: 2}, {id: 2, a: 3}].distribution(), {
            1: 2,
            2: 1
        });
    });

    it('default different keys out of order', () => {
        assertDeepStrictEqual([{id: 1, a: 1}, {id: 2, a: 3}, {id: 1, a: 2}].distribution(), {
            1: 2,
            2: 1
        });
    });

    it('string key', () => {
        assertDeepStrictEqual([{id: 1, a: 1}, {id: 2, a: 3}, {id: 1, a: 2}].distribution("a"), {
            1: 1,
            2: 1,
            3: 1
        });
    });

    it('identity key handler', () => {
        assertDeepStrictEqual([1,2,3].distribution(id => id), {1: 1, 2: 1, 3: 1});
    });

    it('basic key extractor', () => {
        assertDeepStrictEqual([{id: 1, a: 1}, {id: 2, a: 3}, {id: 1, a: 2}].distribution(id => id.a), {
            1: 1,
            2: 1,
            3: 1
        });
    });

    it('basic key extractor strings', () => {
        assertDeepStrictEqual([{id: 1, a: "a"}, {id: 2, a: "b"}, {id: 3, a: "b"}].distribution(id => id.a), {
            "a": 1,
            "b": 2,
        });
    });
});
