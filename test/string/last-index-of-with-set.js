import assert from 'assert';
import '../../src';


describe('lastIndexOfWithSet', () => {

    function runForEachType(name, input, set, regex, string, index, expected) {

        if (set) {
            it(`${name} - set`, () => {
                assert.strictEqual(input.lastIndexOfWithSet(set, index), expected);
            });
        }

        if (regex) {
            it(`${name} - regex`, () => {
                assert.strictEqual(input.lastIndexOfWithSet(regex, index), expected);
            });
        }

        if (string) {
            it(`${name} - string`, () => {
                assert.strictEqual(input.lastIndexOfWithSet(string, index), expected);
            });
        }

    }

    describe('character set no index', () => {
        runForEachType("length 0", "", new Set([" "]), / /, " ", null, -1);
        runForEachType("empty set 0", "hello world", new Set(), null, "", null, -1);
        runForEachType("character doesn't exist", "hello world", new Set(["\t"]), /\t/, "\t", null, -1);
        runForEachType("find character", "hello world", new Set([" "]), / /, " ", null, 5);
        runForEachType("find character 2 in set", "hello\tworld how", new Set([" ", "\t"]), /[ \t]/, null, null, 11);
        runForEachType("find first character", "hello world how", new Set([" "]), /[ ]/, " ", null, 11);
    });


    describe('character set with index', () => {
        runForEachType("length 0", "", new Set([" "]), / /, " ", 10, -1);
        runForEachType("empty set 0", "hello world", new Set([]), null, "", 11, -1);
        runForEachType("character doesn't exist", "hello world", new Set(["\t"]), /\t/, "\t", 12, -1);
        runForEachType("character doesn't exist, offset", "hello world", new Set(["\t"]), /\t/, "\t", 5, -1);
        runForEachType("find character", "hello world", new Set([" "]), / /, " ", 11, 5);
        runForEachType("find character at border", "hello world", new Set([" "]), / /, " ", 5, 5);
        runForEachType("find last character", "hello\tworld how", new Set([" ", "\t"]), /[ \t]/, null, 12, 11);
        runForEachType("find last character at border", "hello\tworld how", new Set([" ", "\t"]), /[ \t]/, null, 11, 11);

        runForEachType("find character 2 in set", "hello\tworld how", new Set([" ", "\t"]), /[ \t]/, null, 12, 11);
        runForEachType("find character 2 in set find second", "hello\tworld how", new Set([" ", "\t"]), /[ \t]/, null, 10, 5);

        runForEachType("not find character past border", "hello world", new Set([" "]), / /, " ", 4, -1);
    });

});
