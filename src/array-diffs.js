
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
Array.prototype.split = function (splitSize) {
    if (splitSize < 1) {
        throw new Error("Split size can not be less than 1");
    }
    if (this.isEmpty) {
        return [];
    }
    return this.reduce((list, current) => {
        let lastSplit = list[list.length - 1];
        if (lastSplit == null || lastSplit.length == splitSize) {
            lastSplit = [];
            list.push(lastSplit);
        }
        lastSplit.push(current);
        return list;
    }, []);
};


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
Array.prototype.switches = function (comparer) {
    return this.reduce((aggregate, current, index) => {
        if (aggregate.last == null || !comparer(current, aggregate.last, index)) {
            aggregate.count ++;
            aggregate.last = current;
        }

        return aggregate;
    }, {count: 0}).count;
};


/**
 * Counts the number of differences between the current list and a given second list.
 * @method countDiffs
 * @param  {Array}    other   The second list to compare to.
 * @param  {Function} compare The handler which determines if two items are equal or not.
 * @return {Number}           Returns the number of different items between two lists.
 */
Array.prototype.countDiffs = function(other, compare) {
    const length1 = this.length;
    const length2 = other.length;

    if (length1 == 0 || length2 == 0) {
        return 0;
    }

    let last = 0;
    let switches = 1;

    let index1 = 0;
    let index2 = 0;
    while (index1 < length1 && index2 < length2) {
        const value = compare(this[index1], other[index2]);
        if (value < 0) {
            index1++;
        } else if (value > 0) {
            index2++;
        } else {
            index1++;
            index2++;
        }

        if ((last > 0 && value < 0) ||
            (last < 0 && value > 0)) {
            switches++;
        }

        last = value;
    }

    return switches;
};
