import assert from 'assert';
import '../../src';

describe('create blurb with length', () => {

    it('length edge case: 0', () => {
        assert.strictEqual("hello world".createBlurb(0), "");
    });
    it('length edge case word border-1', () => {
        assert.strictEqual("hello world how".createBlurb(10), "hello...");
    });

    it('length edge case word border', () => {
        assert.strictEqual("hello world how".createBlurb(11), "hello world...");
    });

    it('length edge case word border + 1', () => {
        assert.strictEqual("hello world how".createBlurb(12), "hello world...");
    });


    it('length case new line border', () => {
        assert.strictEqual("hello world\nhow are you".createBlurb(12), "hello world...");
    });

    it('length case new line border+1', () => {
        assert.strictEqual("hello world\nhow are you".createBlurb(13), "hello world...");
    });

    it('length case new line border past', () => {
        assert.strictEqual("hello world\nhow are you".createBlurb(100), "hello world...");
    });
});


describe('create blurb with min', () => {

    it('length edge case: 0', () => {
        assert.strictEqual("hello world".createBlurb(0, 0), "");
    });
    it('length edge case word border-1', () => {
        assert.strictEqual("hello world how".createBlurb(10, 10), "hello...");
    });

    it('length edge case word border', () => {
        assert.strictEqual("hello world how".createBlurb(11, 11), "hello world...");
    });

    it('length edge case word border + 1', () => {
        assert.strictEqual("hello world how".createBlurb(12, 12), "hello world...");
    });


    it('length new line border', () => {
        assert.strictEqual("hello world\nhow are you".createBlurb(12, 12), "hello world...");
    });

    it('length new line border+1', () => {
        assert.strictEqual("hello world\nhow are you".createBlurb(13, 13), "hello world...");
    });

    it('length new line border past', () => {
        assert.strictEqual("hello world\nhow are you.".createBlurb(100, 100), "hello world\nhow are you.");
    });


    it('different min blurb', () => {
        assert.strictEqual("hello world\nhow are you\nI am good".createBlurb(30, 24), "hello world\nhow are you...");
    });
});
