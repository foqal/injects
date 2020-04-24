export{}

declare global {

    enum SortDirection {
        Ascending = 1,
        Descending = -1
    }

    type ItemCallback<T, TResult> = (object: T, index: number) => TResult;

    type ValueAssigner<T, TResult> = keyof T | ItemCallback<T, TResult>;
    type NullableValueAssigner<T, TResult> = keyof T | ItemCallback<T, TResult>;

    interface SortKeyDescriptor<T> {
        key: keyof T;
        direction: SortDirection;
    }
    type SortKey<T, TResult> = keyof T | SortKeyDescriptor<T> | NullableValueAssigner<T, TResult>;

    export interface Array<T> {


        /**
        * Creates an array of items into a map keyed my id
        *
        * `[{id, name}]` to `{id: {id, name}}`
        * @method toIdMap
        * @param {Object[]}        this    The list of items to convert.
        * @param {String|Func}     key     The name of the id field to fetch from or a function
        *                                  to extract the key from the current item.
        * @param {String|Func}     value   The optional field or function to extract as the value of the map.
        * @returns {Object}                The map keyed by id.
        */
        toIdMap<TResult>(key?: NullableValueAssigner<T, string>, value?: NullableValueAssigner<T, TResult>): Record<string, TResult>;


        /**
        * Creates a map of array values based on the given key. If no key specified uses the "id" field.
        *
        * `[{id, name1}, {id, name2}]` to `{id: [{id, name1}, {id, name2}]}`
        * @name groupBy
        * @param {Object[]}        this    The list to group
        * @param {String|Func}     key     The name of the id field to fetch from or a function
        *                                  to extract the key from the current item.
        * @param {String|Func}     value   The optional field or function to extract as the value of the array of the map.
        * @returns {Object}                The map having the given key as the id and the value being an array of extracted values.
        */
        groupBy<TResult>(key?: NullableValueAssigner<T, string>, value?: NullableValueAssigner<T, TResult>): Record<string, TResult[]>;


        /**
        * Creates a map of counts by given key
        *
        * `[{id: "a", name1}, {id: "a", name2}]` to `{"a": 2}`
        * @name distribution
        * @param {Object[]}        this    The list to count distribution
        * @param {String|Func}     key     The name of the id field to fetch from or a function
        *                                  to extract the key from the current item.
        * @returns {Object}                The map having the given key as the id and the value being the count of times this value appears.
        */
        distribution(key?: NullableValueAssigner<T, string>): Record<string, number>;


        /**
        * Creates an array of ids fetched from each item in the list.
        *
        * `[{id: 1}, {id: 2}]` to `[1, 2]`
        * @method toIdList
        * @param {Object[]}    this    The list of items to convert.
        * @param {String}      key     The name of the id field to fetch for each item.
        * @returns {Object[]}          The list of ids.
        */
        toIdList<TResult>(key?: NullableValueAssigner<T, TResult>): TResult[];

        /**
        * Creates an array of the indexes of items in the list.
        *
        * @method toIndexList
        * @param {Object[]}    this    The list of items to convert.
        * @returns {Object[]}          The list of indexes.
        */
        toIndexList(): number[];

        /**
        * Dedupes the current list using an array.
        *
        * @method dedupe
        * @param {Object[]}    this        The list of items to dedupe
        * @param {Func}        extractor   The optional method to use to extract the values that will be compared.
        * @param {Func}        combiner    When a duplicate is found, this method is called to determine the resulting value to keep.
        *                                  If method not provided, will keep the first value found.
        * @return {Object[]}               The de-duplicated subset.
        */
        dedupe<TResult>(extractor?: (item: T) => string, combiner?: (left: T, right: T) => TResult): TResult[];


        /**
        * Flattens a list of arrays into a single array.
        * Takes an array such as `[[1, 2, 3], [4, 5, 6]]` and returns `[1, 2, 3, 4, 5, 6]`.
        *
        * @method flatten
        * @param {Object[][]} this The list of lists to flatten
        * @return {Object[]} The flattened list
        */
        flatten<TResult>(): TResult[];

        /**
        * Takes an array, applies a map operation to it and combines the returning
        * array of arrays into a single array.
        *
        * @method flatMap
        * @param {Object[]} this The list to manipulate.
        * @param {Func} handler The method to apply to each item in the list.
        * @return {Object[]} The flattened list
        */
        flatMap<TResult>(handler: (item: T) => TResult[]): TResult[];

        /**
        * Calls a handler on each item in the list and returns the list of items.
        * This is like the forEach method, but this one returns the original list.
        *
        * @method forEachReturned
        * @param {Object[]} this The list to manipulate.
        * @param {Func} handler The method to apply to each item in the list.
        * @return {Object[]} The mapped list.
        */
        forEachReturned(handler: (item: T) => T): T[];

        /**
        * Performs a forEach operation for a subset of the list starting with the given "start"
        * index and continuing for the given length.
        *
        * @method offsetMap
        * @param  {Number}     start       The index of where to start the map operation.
        * @param  {Number}     length      The number of items to map.
        * @param  {Function}   handler     The handler that will be called with each item in the map.
        */
        offsetForEach(start: number | null, length: number | null, handler: (item: T) => T): void;

        /**
        * Performs a map operation for a subset of the list starting with the given "start"
        * index and continuing for the given length. Returns the processed sublist.
        *
        * @method offsetMap
        * @param  {Number}     start       The index of where to start the map operation.
        * @param  {Number}     length      The number of items to map.
        * @param  {Function}   handler     The handler that will be called with each item in the map.
        *                               Each item returned by the handler will be returned in the resulting map.
        * @return {Array}                  The processed sublist of size (length - start) with the processed sub list.
        */
        offsetMap(start: number | null, length: number | null, handler: (item: T) => T): T[];

        /**
        * Combines the filter and map operation into a single iteration. First tests the filter. If the filter
        * matches, then calls map and returns the list of the mapped results.
        *
        * If no filter present, will filter out items which are not falsy.
        *
        * @method filterMap
        * @param {Object[]}    this        The list to manipulate.
        * @param {Func}        handler     The method to apply to each item in the list.
        * @param {Func}        filter      The optional method to check. Default checks for null item.
        * @return {Object[]} The mapped list.
        */
        filterMap<TResult>(mapper?: (item: T) => TResult, filter?: (item: T) => boolean): TResult[];

        /**
        * Combines the filter and map operation into a single iteration. First it calls map on an item.
        * Next if the resulting item matches the filter, it is added to the resulting list.
        *
        * If no filter present, will filter out items which are not falsy.
        *
        * @method mapFilter
        * @param {Object[]}    this        The list to iterate
        * @param {Func}        handler     The method to apply to each item in the list.
        * @param {Func}        filter      The optional method to check. Default checks for null item.
        * @return {Object[]} The mapped list.
        */
        mapFilter<TResult>(mapper?: (item: T) => TResult, filter?: (item: TResult) => boolean): TResult[];



        /**
        * Removes all elements that evaluate to falsy such as null, false, 0, etc
        * @method filterFalsy
        * @param {Object[]}    this        The list to filter from
        * @return {Object[]} The filtered list
        */
        filterFalsy(): Exclude<T, undefined | null | false | 0 | "">[];

        /**
        * Removes all null elements
        * @method filterNull
        * @param {Object[]}    this        The list to filter from
        * @return {Object[]} The filtered list
        */
        filterNull(): Exclude<T, undefined | null>[];




        /**
        * Takes the first items from the list based on the count provided
        *
        * @method limit
        * @param {Object[]}    this    The list to manipulate.
        * @param {Integer}        count   The number of items to return
        * @return {Object[]}           The subset list.
        */
        limit(count: number): T[];

        /**
        * Takes the last items from the list based on the count provided
        *
        * @method last
        * @param {Object[]}       this    The list to manipulate.
        * @param {Integer}        count   The number of items to return
        * @return {Object[]}              The subset list.
        */
        last(count: number): T[];

        /**
        * Skips the given number of elemens and returns the rest of the list.
        *
        * @method skip
        * @param {Object[]}    this    The list to manipulate.
        * @param {Integer}        count   The number of items to skip
        * @return {Object[]}           The subset list.
        */
        skip(index: number): T[];

        /**
        * Finds the first element from the right given a specific predicate.
        *
        * @method findRight
        * @param {Object[]}    this        The list to iterate.
        * @param {Func}        predicate   Function to execute on each value in the array.
        * @return {Object}               The found element.
        */
        findRight(predicate: ItemCallback<T, boolean>): T;

        /**
        * Finds the first element's index from the right given a specific predicate.
        *
        * @method findIndexRight
        * @param {Object[]}    this        The list to iterate.
        * @param {Func}        predicate   Function to execute on each value in the array.
        * @return {Integer}                The found element's index
        */
        findIndexRight(predicate: ItemCallback<T, boolean>): number;


        findComparing<TExtracted>(comparer: (left: TExtracted, right: TExtracted, index: number) => boolean, extractor?: ItemCallback<T, TExtracted>): T;


        findIndexComparing(comparer: (left: T, right: T, index: number) => boolean): number

        /**
         * Uses the extractor to extract a value from each item in the list, then uses the comparer to compare extracted values to eachother. Will then
         * return the item that was last selected by the comparer.
         *
         * This is useful for finding a finding a value with a specific property. For example, finding the min value in a list.
         *
         * @method findValueComparing
         * @param  extractor The method used to extract the values being compared.
         * @param  comparer  The comparer which takes two extracted values. Will continue comparing the one that
         *                   returns true, and will stop comparing the value for false.
         * @return           The last item which was had a value of true when in the first parameter.
         */
        findValueComparing<TExtracted>(comparer: ((left: TExtracted, right: TExtracted, index: number) => boolean) | null, extractor: ItemCallback<T, TExtracted>): TExtracted;


        /**
        * Returns a list of items that appear in both this list and the passed in list.
        *
        * @method union
        * @param {Object[]}    this        The list to manipulate.
        * @param {Object[]}    other       The list of entites to union with.
        * @param {Func|String} extractor   The optional method or string to use to extract the values that will be compared.
        * @return {Object[]}               The subset list.
        */
        union<TOther, TResult>(other: TOther[], extractor?: ItemCallback<T | TOther, TResult>): TResult[];

        /**
        * Retuns the list of items that are not in the passed in list.
        *
        * @method exclude
        * @param {Object[]}    this        The list to manipulate.
        * @param {Object[]}    exclude     The list of entites to exclude.
        * @param {Func|String} extractor   The optional method or string to use to extract the values that will be compared.
        * @return {Object[]}               The subset list.
        */
        exclude<TOther, TResult>(exclude: TOther[], extractor?: ItemCallback<T | TOther, TResult>): TResult[];



        /**
        * Creates a copy of the current array and sorts by the given list in a ascending order.
        *
        * The keys define how to sort. They are a list of:
        *  * A String used to identify the name of the key in the object. The sort order is ascending
        *  * A Function used to extract the value to sort by. The sort order is based on ascending.
        *  * An object containing a key and direction. The key is also a String or Function as previously defined. The
        *    direction specifies the sort order using the SortDirection values. (1 or -1)
        *
        * @method sortBy
        * @param {Object[]}            this        The list to sort.
        * @param {String|Func|Object}  ...keys     The list containing the key to sort by. See description for more detail,
        * @return {Object[]}                       The sorted list.
        */
        sortBy<TResult>(...keys: SortKey<T, TResult>[]): T[];

        /**
        * Creates a copy of the current array and sorts by the given list in a descending order.
        *
        * The keys define how to sort. They are a list of:
        *  * A String used to identify the name of the key in the object. The sort order is descending
        *  * A Function used to extract the value to sort by. The sort order is based on descending.
        *  * An object containing a key and direction. The key is also a String or Function as previously defined. The
        *    direction specifies the sort order using the SortDirection values. (1 or -1)
        *
        * @method sortByDescending
        * @param {Object[]}            this        The list to sort.
        * @param {String|Func|Object}  ...keys     The list containing the key to sort by. See description for more detail,
        * @return {Object[]}                       The sorted list.
        */
        sortByDescending<TResult>(...keys: SortKey<T, TResult>[]): T[];


        /**
        * Creates a shallow copy of this array. If an extractor is provided, will only
        * returned the extracted items. (Performs a basic map operation).
        * @method copy
        * @param  {Function} extractor The optional handler to call on each item.
        * @return {Array}              The copied list.
        */
        copy<TResult>(extractor?: ItemCallback<T, TResult>): TResult[];

        /**
        * Checks whether the current array and the given array are equals by comparing pairwise equality.
        * If elements have their own equals method, will use the equals method to compare elements. This allows
        * for a deep equals operator to work.
        *
        * @method equals
        * @param  {Array} other        The array to compare with this current array.
        * @return {Boolean}              Wether the arrays are equal or not.
        */
        equals(other: T[]): boolean;
    }
}
