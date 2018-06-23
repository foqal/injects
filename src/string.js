
String.prototype.extractSymbolsWithRegExp = function (regexp) {
    let text = this;
    let match = regexp.exec(text);
    const symbols = [];
    while (match) {
        const item = match[1];
        symbols.push(item);
        match = regexp.exec(this);
    }
    text = text.replace(regexp, "");

    return {symbols, text};
};

const IS_WHITESPACE_REGEX = /[ \n]/;

const WHITESPACE_SET = new Set([" ", "\n", "\t"]);

/**
 * Returns a shorter version of the string trying to cut the length at new line and space characters.
 * @example
 * "hello world\nhow are you".createBlurb(13)` will return `"hello world..."`
 *
 * @method createBlurb
 * @param  {Number} length      The max length of the blurb. The final length might be up to 3
 *                              characters more (...) than this length.
 * @param  {Number} minBlurb    If when creating a blurb, the text finds a new line, it will automatically
 *                              stop there. If you give a minBlurb, then it will keep going and include
 *                              new lines until reaching a min blurb length.
 * @return {String}             The shortened version of the string.
 */
String.prototype.createBlurb = function (length=100, minBlurb=null) {
    const text = this;
    if (length == 0) {
        return "";
    }

    let endBlurb = text.indexOf("\n");
    if (minBlurb) {
        endBlurb = (minBlurb > text.length) ? text.length : minBlurb;
    }

    if (endBlurb < 0 || endBlurb > length) {
        endBlurb = length;
    }

    if (endBlurb < text.length && !IS_WHITESPACE_REGEX.test(text[endBlurb])) {
        while (endBlurb >= 0 && !WHITESPACE_SET.has(text[endBlurb])) {
            endBlurb--;
        }
    }

    let trimmed = text.substr(0, endBlurb).trim();
    if (text.length > endBlurb) {
        trimmed += trimmed[trimmed.length - 1] === "." ? ".." : "...";
    }
    return trimmed;
};

/**
 * Returns a shorter version of the string trying to cut the length at space characters. Will also replace
 * all newline characters with a " " or a ". " if a period is not aleady there.
 * @example
 * `"hello world\nhow are you\nI am good".createBlurbSingleLine(25)` will return `""hello world. how are you..."`
 *
 * @method createBlurb
 * @param  {Number} length      The max length of the blurb. The final length might be up to 3
 *                              characters more (...) than this length.
 * @return {String}             The shortened version of the string.
 */
String.prototype.createBlurbSingleLine = function (length=100) {
    let text = this.substr(0, length + 1);
    text = text.replace(/\n+./g, (character, index) => {
        const next = character[character.length - 1].trim();

        if (index === 0 || index === length) {
            return "" + next;
        }

        const last = text[index - 1];
        if ((last >= 'a' && last <= 'z') || (last >= 'A' && last <= 'Z')) {
            return ". " + next.toUpperCase();
        }

        return " " + next;
    });

    return text.createBlurb(length);
};
