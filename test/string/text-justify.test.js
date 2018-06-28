import assert from 'assert';
import '../../src';

describe('text justify', () => {

    it('string length empty', () => {
        assert.strictEqual("".justify(10), "");
    });

    it('justify length empty', () => {
        assert.throws(() => "".justify(0));
    });

    it('justify length greater', () => {
        assert.strictEqual("hello world".justify(100), "hello world");
    });

    it('justify length at border - 1', () => {
        assert.strictEqual("hello world".justify(4), "hel-\nlo\nwor-\nld");
    });

    it('justify length at border', () => {
        assert.strictEqual("hello world".justify(5), "hello\nworld");
    });

    it('justify length at border + 1', () => {
        assert.strictEqual("hello world".justify(6), "hello\nworld");
    });

    it('justify really long phrase', () => {
        assert.strictEqual("Supercalifragilisticexpialidocious".justify(8), "Superca-\nlifragi-\nlistice-\nxpialid-\nocious");
    });

    it('phrase with spaces', () => {
        assert.strictEqual("hello world how are you doing?".justify(8), "hello\nworld\nhow are\nyou\ndoing?");
    });

    it('phrase with spaces', () => {
        assert.strictEqual("hello world how are you doing?".justify(10), "hello\nworld how\nare you\ndoing?");
    });

    it('phrase with spaces at border', () => {
        assert.strictEqual("hello world how are you doing?".justify(11), "hello world\nhow are\nyou doing?");
    });

    it('phrase with new lines and short', () => {
        assert.strictEqual("hello world\nhow are\nyou doing?".justify(6), "hello\nworld\n\nhow\nare\n\nyou\ndoing?");
    });

    it('padding', () => {
        assert.strictEqual("hello world".justify(6, "\t"), "\thello\n\tworld");
    });

    it('padding long words', () => {
        assert.strictEqual("Supercalifragilisticexpialidocious".justify(8, "\t\t"), "\t\tSuperca-\n\t\tlifragi-\n\t\tlistice-\n\t\txpialid-\n\t\tocious");
    });

    it('padding new lines and short', () => {
        assert.strictEqual("hello world\nhow are\nyou doing?".justify(6, "\t"), "\thello\n\tworld\n\n\thow\n\tare\n\n\tyou\n\tdoing?");
    });

    it('paragraph padding', () => {
        assert.strictEqual("hello world\nhow are\nyou doing?".justify(6, "\t", "\t\t"), "\t\thello\n\tworld\n\n\t\thow\n\tare\n\n\t\tyou\n\tdoing?");
    });

    it('first line width', () => {
        assert.strictEqual("hello world\nhow are\nyou doing?".justify(4, "", null, 12), "hello world\n\nhow are\n\nyou doing?");
    });

    it('first line width smaller', () => {
        const lyrics = [
            "Daddy's flown across the ocean",
            "Leaving just a memory",
            "Snapshot in the family album",
            "Daddy what else did you leave for me?",
            "Daddy, what'd'ja leave behind for me?!?",
            "All in all it was just a brick in the wall.",
            "All in all it was all just bricks in the wall."
        ];
        const expected = [
            "Daddy's",
            "flown across the ocean",
            "",
            "Leaving just a memory",
            "",
            "Snapshot in",
            "the family album",
            "",
            "Daddy what",
            "else did you leave for",
            "me?",
            "",
            "Daddy,",
            "what'd'ja leave behind",
            "for me?!?",
            "",
            "All in all",
            "it was just a brick in",
            "the wall.",
            "",
            "All in all",
            "it was all just bricks",
            "in the wall.",
        ].join("\n");
        assert.strictEqual(lyrics.join("\n").justify(25, "", null, 12), expected);
    });


    it('first line width smaller with padding', () => {
        const lyrics = [
            "Daddy's flown across the ocean",
            "Leaving just a memory",
            "Snapshot in the family album",
            "Daddy what else did you leave for me?",
            "Daddy, what'd'ja leave behind for me?!?",
            "All in all it was just a brick in the wall.",
            "All in all it was all just bricks in the wall."
        ];
        const expected = [
            "    Daddy's flown across",
            "  the ocean",
            "",
            "    Leaving just a memory",
            "",
            "    Snapshot in the",
            "  family album",
            "",
            "    Daddy what else did",
            "  you leave for me?",
            "",
            "    Daddy, what'd'ja",
            "  leave behind for me?!?",
            "",
            "    All in all it was",
            "  just a brick in the",
            "  wall.",
            "",
            "    All in all it was all",
            "  just bricks in the",
            "  wall."
        ].join("\n");
        assert.strictEqual(lyrics.join("\n").justify(25, "  ", "    ", 21), expected);
    });

    it('first line width and cut', () => {
        assert.strictEqual("Supercalifragilisticexpialidocious".justify(8, "", "", 12), "Supercalifr-\nagilist-\nicexpia-\nlidocio-\nus");
    });


});
