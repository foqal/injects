export{}

declare global {
    export interface Array<T> {


        /**
         * Takes a list and creates sub-lists where the max size is no greater than splitSize.
         * @method split
         * @param  {Number}         splitSize   The max sub list size to return.
         * @return {Array[]}             An array of sub-lists of size [splitSize].
         * @example
         * > [1,2,3,4,5].split(2)
         * returns
         * > [[1, 2], [3, 4], [5]]
         */
        split(splitSize: number) : T[][];

        /**
         * Counts the number of times that two consecutive values are not equal.
         * @method switches
         * @param  {Function}   comparer  A method that given a left value, right value
         *                                and current index should return if left and right are
         *                                cosidered equal.
         * @return {Number}               The number of times that two values change.
         * @example
         * > [1, 1, 2, 2, 2, 2, 3, 3].switches((a, b) => a == b);
         * returns
         * > 3 //Switches once from null to 1, once from 1 to 2, and once from 2 to 3.
         */
        switches(comparer?: (left: T, right: T) => boolean): number

        /**
         * Counts the number of differences between the current list and a given second list.
         * @method countDiffs
         * @param  {Array}    other   The second list to compare to.
         * @param  {Function} compare The handler which determines if two items are equal or not.
         * @return {Number}           Returns the number of different items between two lists.
         */
        countDiffs<TOther>(other: Array<TOther>, compare?: (left: T, right: TOther) => number): number;


        /**
         * Takes an array and returns where the current array and given array are different.
         * isEqual Handler parameters
         *  * leftValue - The value in the current list.
         *  * rightValue - The value in the right list.
         *  * leftIndex - The index in the current list.
         *  * rightIndex - The index in the right list.
         *
         * @method diff
         * @param  {Array}    right         The second list to diff against
         * @param  {Function} isEqual       The handler which takes the values and should return if they are equal or not.
         * @param  {Number}   maxLookahead  The maximum number of items to look for a equal line if the rows don't match.
         * @return {Array}                 Returns the list of differences.
         */
        diff<TOther>(right: Array<TOther>, isEqual?: (leftValue: T, rightValue: TOther, leftIndex: number, rightIndex: number) => boolean, maxLookahead?: number): [T, TOther, number, number][];
    }
}
