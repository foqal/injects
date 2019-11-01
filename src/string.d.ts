
export{}

declare global {

    interface ExtractSymbolOptions {
        matchIndex: number;
        replaceIndex: number;
    }

    interface ExtractSymbolResult {
        symbols: string[];
        text: string

    }

    export interface String {

        /**
         * Uses a RegExp to find matches in a string and returns those as a list of symbols. Additionally returns a
         * new text value which is the text after removing the symbols.
         * @param  {RegExp} regexp       The regex to use to extract matches.
         * @param  {Object} options      Additional options to replace and match indexes.
         * @param  {Number} options.matchIndex   Once a match is found, uses this RegExp group index in the match to add to the
         *                               symbols list. By default this is set to the first index.
         * @param  {Number} options.replaceIndex Once a match is found, this RegExp group is removed from the original text.
         * @return {Object}              Returns an object containing a symbols list of items extracted and a new text
         *                               string with the matched values removed.
         */
        extractSymbolsWithRegExp(regexp: RegExp, options?: ExtractSymbolOptions): ExtractSymbolResult;



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
        createBlurb(length?: number, minBlurb?: number): string;

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
        createBlurbSingleLine(length?: number): string;

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
        indexOfWithSet(characterSet: string | RegExp | Set<String>, start?: number): number;


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
         lastIndexOfWithSet(characterSet: string | RegExp | Set<String>, end?: number): number;



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
         * @param  {Number} paragraphLineWidth   This is the width to use for the first line in a paragraph. If not set,
         *                                      will default to regular width.

         * @return {String}                     The cut string rejoined with new lines and padding.
         */
        justify(width: number, textPadding?: string, paragraphPadding?: string, paragraphLineWidth?: number): string;



        /**
         * Capitalizes the string. (Makes the first character capital). If presented with a splitter,
         * the string will first be split up by the splitter, capitalized, and rejoined.
         *
         * If a splitter is present, and no joiner, the string will be rejoined with
         * the original character that split it. If a joiner is present, the string will
         * be rejoined with this character. For example if "hello world" is split by spaces
         * and the joiner is "-", the final result will be "Hello-World".
         *
         * @name  capitalize
         * @param  {RegExp|String}  splitter        The string or RegExp used to split up the string before capitalizing.
         * @param  {String}         joiner          The string to join the expression after capitalizing.
         * @return {String}                         Returns the capitalized string.
         */
        capitalize(splitter?: string|RegExp, joiner?: string): string;
    }
}
