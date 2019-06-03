import {IDENTITY, IDENTITY_NOT_NULL} from './identity';

//Default sort order directions
const SORT_DIRECTION = {
    //Gets multiplied by the difference when sorting to sort in ascending order
    ASCENDING: 1,

    //Gets multiplied by the difference when sorting to sort in descending order
    DESCENDING: -1
};
exports.SortDirection = SORT_DIRECTION;


// Given a value, will return a function. This function, when passed an object, will extract the value.
// @method createValueAssigner
// @param  {String|Function} key            If the key is a string, this key string will be used to extract the key from the object.
//                                        If the key is a function, will simply return that function.
//                                        If no value present, will return whatever is the defaultValue parameter.
// @param  {Object}          defaultValue   The default to use when value is null.
// @return {Function}       A function which extracts a field from a given object.
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


// Creates a map of array values based on the given key. If no key specified uses the "id" field.
//
// `[{id, name1}, {id, name2}]` to `{id: [{id, name1}, {id, name2}]}`
// @name groupBy
// @param {Object[]}        this    The list to group
// @param {String|Func}     key     The name of the id field to fetch from or a function
//                                  to extract the key from the current item.
// @param {String|Func}     value   The optional field or function to extract as the value of the array of the map.
// @returns {Object}                The map having the given key as the id and the value being an array of extracted values.
Array.prototype.groupBy = function(key="id", value=null) {
    const assigner = createValueAssigner(value);
    return this.toIdMap(key, (item, current) => {
        const value = assigner(item);
        if (current) {
            current.push(value);
            return current;
        } else {
            return [value];
        }
    });
};



// Creates a map of counts by given key
//
// `[{id: "a", name1}, {id: "a", name2}]` to `{"a": 2}`
// @name distribution
// @param {Object[]}        this    The list to count distribution
// @param {String|Func}     key     The name of the id field to fetch from or a function
//                                  to extract the key from the current item.
// @returns {Object}                The map having the given key as the id and the value being the count of times this value appears.
Array.prototype.distribution = function(key="id") {
    return this.toIdMap(key, (item, current) => {
        current = (current || 0) + 1;
        return current;
    });
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
// @param {Object[]}    this        The list of items to dedupe
// @param {Func}        extractor   The optional method to use to extract the values that will be compared.
// @param {Func}        combiner    When a duplicate is found, this method is called to determine the resulting value to keep.
//                                  If method not provided, will keep the first value found.
// @return {Object[]}               The de-duplicated subset.
Array.prototype.dedupe = function(extractor, combiner) {

    if (!extractor) {
        extractor = IDENTITY;
    }
    if (!combiner) {
        combiner = IDENTITY;
    }

    const set = Object.create(null);
    const newList = [];
    this.forEach(item => {
        const value = extractor(item);
        const previousIndex = set[value];
        if (previousIndex != null) {
            newList[previousIndex] = combiner(newList[previousIndex], item);

        } else {
            set[value] = newList.length;
            newList.push(item);
        }
    });
    return newList;
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


// Performs a forEach operation for a subset of the list starting with the given "start"
// index and continuing for the given length.
//
// @method offsetMap
// @param  {Number}     start       The index of where to start the map operation.
// @param  {Number}     length      The number of items to map.
// @param  {Function}   handler     The handler that will be called with each item in the map.
Array.prototype.offsetForEach = function(start, length, handler) {
    if (!handler) {
        throw new Error("Handle can not be null");
    }
    if (start == null || start < 0) {
        start = 0;
    }
    if (length == null || length > this.length) {
        length = this.length;
    } else {
        length = Math.min(this.length, start + length);
    }
    for (let i = start; i < length; i++) {
        handler(this[i], i);
    }
};


// Combines the filter and map operation into a single iteration. First tests the filter. If the filter
// matches, then calls map and returns the list of the mapped results.
//
// If no filter present, will filter out items which are not falsy.
//
// @method filterMap
// @param {Object[]}    this        The list to manipulate.
// @param {Func}        handler     The method to apply to each item in the list.
// @param {Func}        filter      The optional method to check. Default checks for null item.
// @return {Object[]} The mapped list.
Array.prototype.filterMap = function(handler, filter) {
    handler = handler || IDENTITY;
    filter = filter || IDENTITY;

    return this.reduce((list, item, index) => {
        if (filter(item, index)) {
            list.push(handler(item, index));
        }
        return list;
    }, []);
};


// Combines the filter and map operation into a single iteration. First it calls map on an item.
// Next if the resulting item matches the filter, it is added to the resulting list.
//
// If no filter present, will filter out items which are not falsy.
//
// @method mapFilter
// @param {Object[]}    this        The list to iterate
// @param {Func}        handler     The method to apply to each item in the list.
// @param {Func}        filter      The optional method to check. Default checks for null item.
// @return {Object[]} The mapped list.
Array.prototype.mapFilter = function(handler, filter) {
    handler = handler || IDENTITY;
    filter = filter || IDENTITY;

    return this.reduce((list, item, index) => {
        const value = handler(item, index);
        if (filter(value, index)) {
            list.push(value);
        }
        return list;
    }, []);
};



// Removes all elements that evaluate to falsy such as null, false, 0, etc
// @method filterFalsy
// @param {Object[]}    this        The list to filter from
// @return {Object[]} The filtered list
Array.prototype.filterFalsy = function() {
    return this.filter(IDENTITY);
};

// Removes all null elements
// @method filterNull
// @param {Object[]}    this        The list to filter from
// @return {Object[]} The filtered list
Array.prototype.filterNull = function() {
    return this.filter(IDENTITY_NOT_NULL);
};



// Performs a map operation for a subset of the list starting with the given "start"
// index and continuing for the given length. Returns the processed sublist.
//
// @method offsetMap
// @param  {Number}     start       The index of where to start the map operation.
// @param  {Number}     length      The number of items to map.
// @param  {Function}   handler     The handler that will be called with each item in the map.
//                               Each item returned by the handler will be returned in the resulting map.
// @return {Array}                  The processed sublist of size (length - start) with the processed sub list.
Array.prototype.offsetMap = function(start, length, handler) {
    handler = handler || IDENTITY;
    if (start == null || start < 0) {
        start = 0;
    }
    if (length == null || length > this.length) {
        length = this.length;
    } else {
        length = Math.min(this.length, start + length);
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
    return this.slice(Math.max(0, this.length - count));
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
// @param {Func|String} extractor   The optional method or string to use to extract the values that will be compared.
// @return {Object[]}               The subset list.
Array.prototype.union = function (other, extractor=IDENTITY) {
    const valueExtractor = createValueAssigner(extractor);
    const otherSet = new Set(other.map(valueExtractor));
    return this.filter((item, index) => otherSet.has(valueExtractor(item, index)));
};

// Retuns the list of items that are not in the passed in list.
//
// @method exclude
// @param {Object[]}    this        The list to manipulate.
// @param {Object[]}    exclude     The list of entites to exclude.
// @param {Func|String} extractor   The optional method or string to use to extract the values that will be compared.
// @return {Object[]}               The subset list.
Array.prototype.exclude = function (exclude, extractor=IDENTITY) {
    const valueExtractor = createValueAssigner(extractor);
    const excludeSet = new Set(exclude.map(valueExtractor));
    return this.filter((item, index) => !excludeSet.has(valueExtractor(item, index)));
};


// Called by sortBy and sortByDescending to do the copy and actual sort of the list.
//
// The keys define how to sort. They are a list of:
//  * A String used to identify the name of the key in the object. The sort order is based on defaultDirection.
//  * A Function used to extract the value to sort by. The sort order is based on defaultDirection.
//  * An object containing a key and direction. The key is also a String or Function as previously defined. The
//    direction specifies the sort order using the SortDirection values. (1 or -1)
//
// @method sortBy
// @param {Object[]}            list        The list to sort.
// @param {String|Func|Object}  ...keys     The list containing the key to sort by. See description for more detail,
// @param {Number}     defaultDirection     The default sort order if no direction present.
// @return {Object[]}                       The sorted list.
function sort(list, keys, defaultDirection) {
    if (keys.isEmpty) {
        keys.push("id");
    }
    const fetchers = keys.map(key => {
        const type = typeof key;
        if (type == "string" || type == "function") {
            return {
                fetcher: createValueAssigner(key),
                direction: defaultDirection
            };
        } else {
            return {
                fetcher: createValueAssigner(key.key),
                direction: key.direction
            };
        }
    });
    const length = fetchers.length;

    return list.copy().sort((a, b) => {
        for (let i = 0; i < length; i++) {
            const {direction, fetcher} = fetchers[i];
            const value = direction * (fetcher(a) - fetcher(b));
            if (Math.abs(value) > Number.EPSILON) {
                return value;
            }
        }

        return 0;
    });
}


// Creates a copy of the current array and sorts by the given list in a ascending order.
//
// The keys define how to sort. They are a list of:
//  * A String used to identify the name of the key in the object. The sort order is ascending
//  * A Function used to extract the value to sort by. The sort order is based on ascending.
//  * An object containing a key and direction. The key is also a String or Function as previously defined. The
//    direction specifies the sort order using the SortDirection values. (1 or -1)
//
// @method sortBy
// @param {Object[]}            this        The list to sort.
// @param {String|Func|Object}  ...keys     The list containing the key to sort by. See description for more detail,
// @return {Object[]}                       The sorted list.
Array.prototype.sortBy = function (...keys) {
    return sort(this, keys, SORT_DIRECTION.ASCENDING);
};


// Creates a copy of the current array and sorts by the given list in a descending order.
//
// The keys define how to sort. They are a list of:
//  * A String used to identify the name of the key in the object. The sort order is descending
//  * A Function used to extract the value to sort by. The sort order is based on descending.
//  * An object containing a key and direction. The key is also a String or Function as previously defined. The
//    direction specifies the sort order using the SortDirection values. (1 or -1)
//
// @method sortByDescending
// @param {Object[]}            this        The list to sort.
// @param {String|Func|Object}  ...keys     The list containing the key to sort by. See description for more detail,
// @return {Object[]}                       The sorted list.
Array.prototype.sortByDescending = function (...keys) {
    return sort(this, keys, SORT_DIRECTION.DESCENDING);
};


// Creates a shallow copy of this array. If an extractor is provided, will only
// returned the extracted items. (Performs a basic map operation).

// @method copy
// @param  {Function} extractor The optional handler to call on each item.
// @return {Array}              The copied list.
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


// Checks whether the current array and the given array are equals by comparing pairwise equality.
// If elements have their own equals method, will use the equals method to compare elements. This allows
// for a deep equals operator to work.
//
// @method equals
// @param  {Array} other        The array to compare with this current array.
// @return {Boolean}              Wether the arrays are equal or not.
Array.prototype.equals = function(other) {
    if (!other || !(other instanceof Array) || this.length != other.length) {
        return false;
    }

    return this.every((element, index) => {
        const otherValue = other[index];
        if (element.equals && typeof element.equals === "function") {
            return element.equals(otherValue);
        }
        return otherValue === element;
    });
};
