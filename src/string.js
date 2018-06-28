
const IS_WHITESPACE_REGEX = /[ \n]/;

const WHITESPACE_SET = new Set([" ", "\n", "\t"]);

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

function createMatcher(characterSet) {
    if (typeof characterSet === "string") {
        return char => char == characterSet;
    } else if (characterSet instanceof RegExp) {
        return char => characterSet.test(char);
    } else if (characterSet instanceof Set) {
        return char => characterSet.has(char);
    } else {
        throw new Error("Can't create character set matcher. No type given.");
    }
}

/**
 * Returns the index of one of the characters that matches the given set or regex. This works
 * like the String.prototype.indexOf method but instead of looking for a single character, will
 * look for one of the characters in a set or a matching regex.
 *
 * @name  indexOfWithSet
 * @param  {Set|RegExp|String}  characterSet This can be either a Set of characters which will look for a match,
 *                                           a RegExp which will be used to test, or a string which will look for
 *                                           an exact match.
 * @param  {Number}             end          The last place where to start looking for a matching character.
 * @return {Number}                          Returns the location of one of the matching characters or -1 if not found.
 */
String.prototype.indexOfWithSet = function (characterSet, start) {
    const matcher = createMatcher(characterSet);
    start = start == null ? 0 : start;

    for (let end = this.length; start < end; start++) {
        if (matcher(this[start])) {
            return start;
        }
    }
    return -1;
};


/**
 * Returns the last index of one of the characters that matches the given set or regex. This works
 * like the String.prototype.lastIndexOf method but instead of looking for a single character, will
 * look for one of the characters in a set or a matching regex.
 *
 * @name  lastIndexOfWithSet
 * @param  {Set|RegExp|String}  characterSet This can be either a Set of characters which will look for a match,
 *                                           a RegExp which will be used to test, or a string which will look for
 *                                           an exact match.
 * @param  {Number}             end          The last place where to start looking for and interating to 0.
 * @return {Number}                          Returns the location of one of the matching characters or -1 if not found.
 */
String.prototype.lastIndexOfWithSet = function (characterSet, end) {
    end = end == null ? this.length : end;

    const matcher = createMatcher(characterSet);
    for (; end >= 0; end--) {
        if (matcher(this[end])) {
            return end;
        }
    }
    return -1;
};


/**
 * Cuts the given text into substrings of up to a given length or smaller. If a line is longer than the required
 * width, will cut near the end and will insert a hyphen. If a text already has new lines, will replace those with
 * two newlines and will insert paragraphPadding.
 *
 * @name justify
 * @param  {Number} width               The max length of a single line of text.
 * @param  {String} textPadding         This padding text will be inserted before each line.
 * @param  {String} paragraphPadding    This padding text will be inserted before each paragraph. If not explicitly set,
 *                                      will default to textPadding.
 * @param  {String} paragraphLineWidth   This is the width to use for the first line in a paragraph. If not set,
 *                                      will default to regular width.

 * @return {String}                     The cut string rejoined with new lines and padding.
 */
String.prototype.justify = function (width, textPadding="", paragraphPadding=null, paragraphLineWidth=null) {
    if (width <= 0) {
        throw new Error(`Invalid width: ${width}. Has to be greater than 0.`);
    }

    if (!paragraphPadding) {
        paragraphPadding = textPadding;
    }
    if (!paragraphLineWidth) {
        paragraphLineWidth = width;
    }
    return paragraphPadding + this.split("\n").map(line => {
        if (width > line.length) {
            return [line];
        }
        let lastEnd = 0;
        let currentWidth = paragraphLineWidth;
        let end = currentWidth >= line.length ? line.length : line.lastIndexOfWithSet(WHITESPACE_SET, currentWidth);
        const lines = [];
        let suffix = "";
        while (lastEnd < line.length) {
            if (end < 0) {
                end = lastEnd + currentWidth - 1;
                suffix = end < line.length ? "-" : "";
            }

            lines.push(line.substr(lastEnd, end - lastEnd).trim() + suffix);
            suffix = "";

            lastEnd = end;
            currentWidth = width;
            end = end + width > line.length ? line.length : line.lastIndexOfWithSet(WHITESPACE_SET, end + width);

            if (end === lastEnd) {
                lastEnd ++;
                end = lastEnd + width;
            } else if (end < lastEnd) {
                end = -1;
            } else {
                end ++;
            }

        }
        if (lastEnd < line.length) {
            lines.push(line.substr(lastEnd).trim());
        }
        return lines.join("\n" + textPadding);
    }).join("\n\n" + paragraphPadding);
};
