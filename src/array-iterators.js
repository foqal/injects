import {IDENTITY, IDENTITY_NOT_NULL} from './identity';



/**
 * Given a value, will return a function. This function, when passed an object, will extract the value.
 * @method createValueAssigner
 * @param  {String|Function} key            If the key is a string, this key string will be used to extract the key from the object.
 *                                          If the key is a function, will simply return that function.
 *                                          If no value present, will return whatever is the defaultValue parameter.
 * @param  {Object}          defaultValue   The default to use when value is null.
 * @return {Function}       A function which extracts a field from a given object.
 */
function createValueAssigner(value, defaultValue=IDENTITY) {
    if (!value) {
        value = defaultValue;
    }

    if (typeof value === "string") {
        return item => item[value];
    }
    return value;
}


// Creates an array of items into a map keyed my id
//
// `[{id, name}]` to `{id: {id, name}}`
// @method createIdMap
// @param {Object[]}        this    The list of items to convert.
// @param {String|Func}     key     The name of the id field to fetch from or a function
//                                  to extract the key from the current item.
// @param {String|Func}     value   The optional field or function to extract as the value of the map.
// @returns {Object}                The map keyed by id.
Array.prototype.toIdMap = function(key="id", value=null) {
    const keyFetcher = createValueAssigner(key, "id");
    const assigner = createValueAssigner(value);
    return this.reduce((aggregator, item, index) => {
        const itemKey = keyFetcher(item, index);
        const current =  aggregator[itemKey];
        aggregator[itemKey] = assigner(item, current, index);
        return aggregator;
    }, Object.create(null));
};

// Creates an array of ids fetched from each item in the list.
//
// `[{id: 1}, {id: 2}]` to `[1, 2]`
// @method toIdList
// @param {Object[]}    this    The list of items to convert.
// @param {String}      key     The name of the id field to fetch for each item.
// @returns {Object[]}          The list of ids.
Array.prototype.toIdList = function(key) {
    const keyFetcher = createValueAssigner(key, "id");
    return this.map((item, index) => keyFetcher(item, index));
};

// Creates an array of the indexes of items in the list.
//
// @method toIndexList
// @param {Object[]}    this    The list of items to convert.
// @returns {Object[]}          The list of indexes.
Array.prototype.toIndexList = function() {
    return this.map((_, index) => index);
};


// Dedupes the current list using an array.
//
// @method dedupe
// @param {Object[]}    this    The list of items to dedupe
// @param {Func}        extractor   The optional method to use to extract the values that will be compared.
// @param {Func}        combiner    When a duplicate is found, this method is called to determine the resulting value to keep.
// @return {Object[]}           The deduped subset.
Array.prototype.dedupe = function(extractor, combiner) {

    if (!extractor) {
        extractor = IDENTITY;
    }
    if (!combiner) {
        combiner = IDENTITY;
    }

    const set = Object.create(null);
    return this.filter((item, index) => {
        const value = extractor(item);
        const previousIndex = set[value];
        if (previousIndex != null) {
            this[previousIndex] = combiner(this[previousIndex], item);
            return false;
        } else {
            set[value] = index;
        }

        return true;
    });
};



// Flattens a list of arrays into a single array.
// Takes an array such as `[[1, 2, 3], [4, 5, 6]]` and returns `[1, 2, 3, 4, 5, 6]`.
//
// @method flatten
// @param {Object[][]} this The list of lists to flatten
// @return {Object[]} The flattened list
Array.prototype.flatten = function() {
    return this.reduce((last, array) => {
        return array ? last.concat(array) : last;
    }, []);
};



// Takes an array, applies a map operation to it and combines the returning
// array of arrays into a single array.
//
// @method flatMap
// @param {Object[]} this The list to manipulate.
// @param {Func} handler The method to apply to each item in the list.
// @return {Object[]} The flattened list
Array.prototype.flatMap = function(handler) {
    return this.map(handler).flatten();
};


// Calls a handler on each item in the list and returns the list of items.
// This is like the forEach method, but this one returns the original list.
//
// @method forEachReturned
// @param {Object[]} this The list to manipulate.
// @param {Func} handler The method to apply to each item in the list.
// @return {Object[]} The mapped list.
Array.prototype.forEachReturned = function(handler) {
    return this.map((item, index) => {
        handler(item, index);
        return item;
    });
};

Array.prototype.offsetForEach = function(start, length, handler) {
    if (length == null || length > this.length) {
        length = this.length;
    }
    if (start == null || start < 0) {
        start = 0;
    }
    for (let i = start; i < length; i++) {
        handler(this[i], i);
    }
};


// Calls a handler on each item in the list if the item matches the filter.
// By default, filters out nulls.
//
// @method filterMap
// @param {Object[]} this The list to manipulate.
// @param {Func} handler The method to apply to each item in the list.
// @param {Func} filter The optional method to check. Default checks for null item.
// @return {Object[]} The mapped list.
Array.prototype.filterMap = function(handler, filter) {
    filter = filter || IDENTITY_NOT_NULL;
    handler = handler || IDENTITY;

    return this.reduce((list, item, index) => {
        if (filter(item, index)) {
            list.push(handler(item, index));
        }
        return list;
    }, []);
};


/**
 * Performs a map operation for a subset of the list starting with the given "start"
 * index and continuing for the given length. Returns the processed sublist.
 *
 * @method offsetMap
 * @param  {Number}     start       The index of where to start the map operation.
 * @param  {Number}     length      The number of items to map.
 * @param  {Function}   handler     The handler that will be called with each item in the map.
 *                                  Each item returned by the handler will be returned in the resulting map.
 * @return {Array}                  The processed sublist of size (length - start) with the processed sub list.
 */
Array.prototype.offsetMap = function(start, length, handler) {
    if (length == null || length > this.length) {
        length = this.length;
    }
    if (start == null || start < 0) {
        start = 0;
    }
    const collect = [];
    for (let i = start; i < length; i++) {
        collect.push(handler(this[i], i));
    }
    return collect;
};



// Takes the first items from the list based on the count provided
//
// @method limit
// @param {Object[]}    this    The list to manipulate.
// @param {Integer}        count   The number of items to return
// @return {Object[]}           The subset list.
Array.prototype.limit = function(count) {
    return this.slice(0, count);
};

// Takes the last items from the list based on the count provided
//
// @method last
// @param {Object[]}       this    The list to manipulate.
// @param {Integer}        count   The number of items to return
// @return {Object[]}              The subset list.
Array.prototype.last = function(count) {
    return this.slice(this.length - count);
};

// Skips the given number of elemens and returns the rest of the list.
//
// @method skip
// @param {Object[]}    this    The list to manipulate.
// @param {Integer}        count   The number of items to skip
// @return {Object[]}           The subset list.
Array.prototype.skip = function(index) {
    return this.slice(index);
};

// Finds the first element from the right given a specific predicate.
//
// @method findRight
// @param {Object[]}    this        The list to iterate.
// @param {Func}        predicate   Function to execute on each value in the array.
// @return {Object}               The found element.
Array.prototype.findRight = function(predicate) {
    for (let i = this.length - 1; i >= 0; i--) {
        const element = this[i];
        if (predicate(element, i)) {
            return element;
        }
    }
};

// Finds the first element's index from the right given a specific predicate.
//
// @method findIndexRight
// @param {Object[]}    this        The list to iterate.
// @param {Func}        predicate   Function to execute on each value in the array.
// @return {Integer}                The found element's index
Array.prototype.findIndexRight = function(predicate) {
    for (let i = this.length - 1; i >= 0; i--) {
        const element = this[i];
        if (predicate(element, i)) {
            return i;
        }
    }
};


// Returns a list of items that appear in both this list and the passed in list.
//
// @method union
// @param {Object[]}    this        The list to manipulate.
// @param {Object[]}    other       The list of entites to union with.
// @param {Func}        extractor   The optional method to use to extract the values that will be compares.
// @return {Object[]}               The subset list.
Array.prototype.union = function (other, extractor) {

    if (!extractor) {
        extractor = IDENTITY;
    }

    const otherSet = new Set(other.map(extractor));
    return this.filter((item, index) => otherSet.has(extractor(item, index)));
};

// Retuns the list of items that are not in the passed in list.
//
// @method exclude
// @param {Object[]}    this        The list to manipulate.
// @param {Object[]}    exclude     The list of entites to exclude.
// @param {Func}        extractor   The optional method to use to extract the values that will be compares.
// @return {Object[]}               The subset list.
Array.prototype.exclude = function (exclude, extractor) {

    if (!extractor) {
        extractor = IDENTITY;
    }

    const excludeSet = new Set(exclude.map(extractor));
    return this.filter((item, index) => excludeSet.has(extractor(item, index)));
};


/**
 * Creates a shallow copy of this array. If an extractor is provided, will only
 * returned the extracted items. (Performs a basic map operation).
 *
 * @method copy
 * @param  {Function} extractor The optional handler to call on each item.
 * @return {Array}              The copied list.
 */
Array.prototype.copy = function(extractor) {
    if (extractor) {
        return this.map(extractor);
    } else {
        return this.slice(0, this.length);
    }
};

Array.prototype.findComparing = function (comparer, extractor) {
    if (this.isEmpty) {
        return null;
    }

    if (!extractor) {
        extractor = IDENTITY;
    }

    let value = this.firstElement;
    let extracted = extractor(value);
    this.offsetForEach(1, null, (item, index) => {
        const current = extractor(item);
        if (!comparer(extracted, current, index)) {
            value = item;
            extracted = current;
        }
    });

    return value;
};

Array.prototype.findIndexComparing = function (comparer) {
    if (this.isEmpty) {
        return null;
    }
    return this.reduce((last, current, index) => comparer(this[last], current, index) ? last : index, 0);
};

Array.prototype.findValueComparing = function (extractor, comparer) {
    if (this.isEmpty) {
        return null;
    }
    extractor = extractor || IDENTITY;
    return this.reduce((last, current, index) => {
        const currentValue = extractor(current, index);
        if (index == 0) {
            return currentValue;
        } else {
            return comparer(last, currentValue, index) ? last : currentValue;
        }
    }, null);
};
