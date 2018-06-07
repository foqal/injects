import assert from 'assert';
import '../../src';

describe('create blurb single line', () => {

    it('length edge case: 0', () => {
        assert.equal("hello world".createBlurbSingleLine(0), "");
    });
    it('length edge case word border-1', () => {
        assert.equal("hello world how".createBlurbSingleLine(10), "hello...");
    });

    it('length edge case word border', () => {
        assert.equal("hello world how".createBlurbSingleLine(11), "hello world...");
    });

    it('length edge case word border + 1', () => {
        assert.equal("hello world how".createBlurbSingleLine(12), "hello world...");
    });


    it('length case new line border', () => {
        assert.equal("hello world\nhow are you".createBlurbSingleLine(12), "hello world...");
    });

    it('length case new line border', () => {
        assert.equal("hello world\nhow are you\nI am good".createBlurbSingleLine(22), "hello world. How are...");
    });

    it('length case new line border+1', () => {
        assert.equal("hello world\nhow are you\nI am good".createBlurbSingleLine(25), "hello world. How are you...");
    });

    it('length case new line border past', () => {
        assert.equal("hello world\nhow are you".createBlurbSingleLine(100), "hello world. How are you");
    });

    it('punctuation !', () => {
        assert.equal("hello world!\nHow are you".createBlurbSingleLine(100), "hello world! How are you");
    });

    it('punctuation .', () => {
        assert.equal("hello world.\nHow are you".createBlurbSingleLine(100), "hello world. How are you");
    });
});

