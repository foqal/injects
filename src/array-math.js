import {IDENTITY} from './identity';

Array.prototype.max = function (comparer, extractor) {
    if (!comparer) {
        comparer = (a, b) => a > b;
    }
    return this.findComparing(comparer, extractor);
};

Array.prototype.maxValue = function (extractor) {
    return this.findValueComparing(extractor, (a, b) => a > b);
};

Array.prototype.min = function (comparer, extractor) {
    if (!comparer) {
        comparer = (a, b) => a < b;
    }
    return this.findComparing(comparer, extractor);
};

Array.prototype.minValue = function (extractor) {
    return this.findValueComparing(extractor, (a, b) => a < b);
};


// Counts the number of items that match a condition. If no condition present, will count the number of items that
// are not falsy.
//
// @method count
// @param {Object[]}        this     The list to iterate
// @param {Function}        handler  Will take the element and index and return true if to include in the count.
// @return {Number}                  The number of items matching the condition
Array.prototype.count = function(handler) {
    if (!handler) {
        handler = IDENTITY;
    }
    return this.reduce((current, element, index) => {
        return current + (handler(element, index) ? 1 : 0);
    }, 0);
};


Array.prototype.sum = function (extractor) {
    if (this.isEmpty) {
        return 0;
    }
    if (!extractor) {
        extractor = IDENTITY;
    }
    return this.reduce((aggregate, current, index) => aggregate + extractor(current, index), 0);
};

Array.prototype.product = function (extractor) {
    if (this.isEmpty) {
        return 0;
    }
    if (!extractor) {
        extractor = IDENTITY;
    }
    return this.reduce((aggregate, current, index) => aggregate * extractor(current, index), 1);
};

Array.prototype.average = function (extractor) {
    const length = this.length;
    if (length == 0) {
        throw new Error("No elements to calculate average");
    }

    return this.sum(extractor) * 1.0 / length;
};

Array.prototype.median = function (extractor) {
    const length = this.length;
     if (length == 0) {
        throw new Error("No elements to calculate median");
    }

    const sorted = this.copy(extractor).sort();
    const ceilValue = sorted[Math.ceil(length / 2) - 1];

    if (length % 2 == 0) {
        return (ceilValue + sorted[Math.ceil(length / 2)]) / 2.0;
    } else {
        return ceilValue;

    }
};

Array.prototype.variance = function (extractor) {
    const length = this.length;
    if (length == 0) {
        return 0;
    }

    if (!extractor) {
        extractor = IDENTITY;
    }
    const average = this.average(extractor);

    return this.sum((item, index) => Math.pow(average - extractor(item, index), 2));
};




/**
 * Returns all permutations of a given size.
 *
 * @method permutations
 * @param  {Number}         size     The maximum size of a permutation.
 * @param  {Object}         options  If repeating is provided and is true, allows
 *                                   repeating permutations.
 * @return {Array[]}          Array of
 */
Array.prototype.permutations = function (size, options) {
    if (size < 1) {
        throw new Error("Permutation size can not be less than 1");
    }
    if (this.isEmpty) {
        return [];
    }

    options = options || {
        repeating: false
    };

    if (size == 1) {
        return this.map(item => [item]);
    }

    return this.permutations(size - 1, options).flatMap(combination => {
        let list = this;

        if (!options.repeating) {
            list = list.filter(item => !combination.some(comboItem => comboItem == item));
        }

        return list.map(item => combination.concat([item]));
    });
};


// Creates all combinations of a given size from the current list of items.
//
// Modified from https://gist.github.com/axelpale/3118596
// @method combinations
// @param {Object[]}        this    The list of items to create combinations from.
// @param {Integer}          combinationSize     The name of the id field to fetch and aggregate by.
// @returns {Object}                The map keyed by id.
Array.prototype.combinations = function (combinationSize) {
    if (combinationSize < 1) {
        throw new Error("Combination size can not be less than 1");
    }

    const length = this.length;
    if (length == 0) {
        return [];
    }

    if (combinationSize == null) {
        let all = [];
        for (let i = 1; i <= length; i++) {
            all = all.concat(this.combinations(i));
        }
        return all;
    }

    if (combinationSize == length) {
        return [this];
    }


    if (combinationSize == 1) {
        return this.map(item => [item]);
    }

    const combinations = [];
    for (let i = 0; i < length - combinationSize + 1; i++) {
        const head = this.slice(i, i + 1);
        const tailcombs = this.slice(i + 1).combinations(combinationSize - 1);
        tailcombs.forEach(item => combinations.push(head.concat(item)));
    }
    return combinations;
};
