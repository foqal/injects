export{}

declare global {

    enum SortDirection {
        Ascending = 1,
        Descending = -1
    }

    type ItemCallback<T, TResult> = (object: T, index: number) => TResult;

    type ValueAssigner<T, TResult> = keyof T | ItemCallback<T, TResult>;
    type NullableValueAssigner<T, TResult> = keyof T | ItemCallback<T, TResult>;
    type NullableKeyValueAssigner<TKey, TValue, TResult> = keyof TKey | ItemCallback<TValue, TResult>;

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
        * @param  this    The list of items to convert.
        * @param  key     The name of the id field to fetch from or a function
        *                                  to extract the key from the current item.
        * @param  value   The optional field or function to extract as the value of the map.
        * @returns	The map keyed by id.
        */
        toIdMap(key?: NullableValueAssigner<T, string>): Record<string, T>;
        toIdMap<K extends keyof T>(key: NullableValueAssigner<T, string> | undefined | null, value: K): Record<string, T[K]>;
        toIdMap<TResult>(key: NullableValueAssigner<T, string> | undefined | null, value: ItemCallback<T, TResult>): Record<string, TResult>;


        /**
        * Creates a map of array values based on the given key. If no key specified uses the "id" field.
        *
        * `[{id, name1}, {id, name2}]` to `{id: [{id, name1}, {id, name2}]}`
        * @name groupBy
        * @param  this    The list to group
        * @param  key     The name of the id field to fetch from or a function
        *                                  to extract the key from the current item.
        * @param  value   The optional field or function to extract as the value of the array of the map.
        * @returns	The map having the given key as the id and the value being an array of extracted values.
        */
        groupBy(key?: NullableValueAssigner<T, string>): Record<string, T[]>;
        groupBy<K extends keyof T>(key: NullableValueAssigner<T, string> | undefined | null, value: K): Record<string, T[K][]>;
        groupBy<TResult>(key: NullableValueAssigner<T, string> | undefined | null, value: ItemCallback<T, TResult>): Record<string, TResult[]>;


        /**
        * Creates a map of counts by given key
        *
        * `[{id: "a", name1}, {id: "a", name2}]` to `{"a": 2}`
        * @name distribution
        * @param  this    The list to count distribution
        * @param  key     The name of the id field to fetch from or a function
        *                 to extract the key from the current item.
        * @returns	The map having the given key as the id and the value being the count of times this value appears.
        */
        distribution(key?: NullableValueAssigner<T, string>): Record<string, number>;


        /**
        * Creates an array of ids fetched from each item in the list.
        *
        * `[{id: 1}, {id: 2}]` to `[1, 2]`
        * @method toIdList
        * @param  this    The list of items to convert.
        * @param  key     The name of the id field to fetch for each item.
        * @returns	The list of ids.
        */
        toIdList(): (T extends {id: infer T} ? T : undefined)[];
        toIdList<K extends keyof T>(key: K): T[K][];
        toIdList<TResult>(key: ItemCallback<T, TResult>): TResult[];

        /**
        * Creates an array of the indexes of items in the list.
        *
        * @method toIndexList
        * @param  this    The list of items to convert.
        * @returns	The list of indexes.
        */
        toIndexList(): number[];

        /**
        * Dedupes the current list using an array.
        *
        * @method dedupe
        * @param  this        The list of items to dedupe
        * @param  extractor   The optional method to use to extract the values that will be compared.
        * @param  combiner    When a duplicate is found, this method is called to determine the resulting value to keep.
        *                                  If method not provided, will keep the first value found.
        * @returns	The de-duplicated subset.
        */
        dedupe(extractor?: NullableValueAssigner<T, string>): T[];
        dedupe<TResult>(extractor?: (item: T) => string, combiner?: (left: T, right: T) => TResult): TResult[];


        /**
        * Flattens a list of arrays into a single array.
        * Takes an array such as `[[1, 2, 3], [4, 5, 6]]` and returns `[1, 2, 3, 4, 5, 6]`.
        *
        * @method flatten
        * @param  this The list of lists to flatten
        * @returns	The flattened list
        */
        flatten(): T extends (infer A)[] ? A[] : T[];

        /**
        * Takes an array, applies a map operation to it and combines the returning
        * array of arrays into a single array.
        *
        * @method flatMap
        * @param  this The list to manipulate.
        * @param  handler The method to apply to each item in the list.
        * @returns	The flattened list
        */
        flatMap<TResult>(handler: (item: T) => TResult[]): TResult[];

        /**
        * Calls a handler on each item in the list and returns the list of items.
        * This is like the forEach method, but this one returns the original list.
        *
        * @method forEachReturned
        * @param  this The list to manipulate.
        * @param  handler The method to apply to each item in the list.
        * @return The mapped list.
        */
        forEachReturned(handler: (item: T) => void): T[];

        /**
        * Performs a forEach operation for a subset of the list starting with the given "start"
        * index and continuing for the given length.
        *
        * @method offsetMap
        * @param	start       The index of where to start the map operation.
        * @param	length      The number of items to map.
        * @param	handler     The handler that will be called with each item in the map.
        */
        offsetForEach(start: number | null, length: number | null, handler: (item: T) => T): void;

        /**
        * Performs a map operation for a subset of the list starting with the given "start"
        * index and continuing for the given length. Returns the processed sublist.
        *
        * @method offsetMap
        * @param	start       The index of where to start the map operation.
        * @param	length      The number of items to map.
        * @param	handler     The handler that will be called with each item in the map.
        *                               Each item returned by the handler will be returned in the resulting map.
        * @returns	The processed sublist of size (length - start) with the processed sub list.
        */
        offsetMap<TResult>(start: number | null, length: number | null, handler: NullableValueAssigner<T, TResult>): TResult[];

        /**
        * Combines the filter and map operation into a single iteration. First tests the filter. If the filter
        * matches, then calls map and returns the list of the mapped results.
        *
        * If no filter present, will filter out items which are not falsy.
        *
        * @method filterMap
        * @param  this        The list to manipulate.
        * @param  handler     The method to apply to each item in the list.
        * @param  filter      The optional method to check. Default checks for null item.
        * @returns	The mapped list.
        */
        filterMap<TResult = T>(mapper: NullableValueAssigner<Exclude<T, undefined | null>, TResult>): TResult[];
        filterMap<TResult = T>(mapper: NullableValueAssigner<T, TResult>, filter: NullableValueAssigner<T, boolean>): TResult[];

        /**
        * Combines the filter and map operation into a single iteration. First it calls map on an item.
        * Next if the resulting item matches the filter, it is added to the resulting list.
        *
        * If no filter present, will filter out items which are not falsy.
        *
        * @method mapFilter
        * @param  this        The list to iterate
        * @param  handler     The method to apply to each item in the list.
        * @param  filter      The optional method to check. Default checks for null item.
        * @returns	The mapped list.
        */
        mapFilter<TResult = T>(mapper: NullableValueAssigner<T, TResult>): Exclude<TResult, undefined | null>[];
        mapFilter<TResult = T>(mapper: NullableValueAssigner<T, TResult>, filter: NullableValueAssigner<TResult, boolean>): TResult[];



        /**
        * Removes all elements that evaluate to falsy such as null, false, 0, etc
        * @method filterFalsy
        * @param  this        The list to filter from
        * @returns	The filtered list
        */
        filterFalsy(): Exclude<T, undefined | null | false | 0 | "">[];

        /**
        * Removes all null elements
        * @method filterNull
        * @param  this        The list to filter from
        * @returns	The filtered list
        */
        filterNull(): Exclude<T, undefined | null>[];




        /**
        * Takes the first items from the list based on the count provided
        *
        * @method limit
        * @param  this    The list to manipulate.
        * @param  count   The number of items to return
        * @returns	The subset list.
        */
        limit(count: number): T[];

        /**
        * Takes the last items from the list based on the count provided
        *
        * @method last
        * @param  this    The list to manipulate.
        * @param  count   The number of items to return
        * @returns	The subset list.
        */
        last(count: number): T[];

        /**
        * Skips the given number of elemens and returns the rest of the list.
        *
        * @method skip
        * @param  this    The list to manipulate.
        * @param  count   The number of items to skip
        * @returns	The subset list.
        */
        skip(index: number): T[];

        /**
        * Finds the first element from the right given a specific predicate.
        *
        * @method findRight
        * @param  this        The list to iterate.
        * @param  predicate   Function to execute on each value in the array.
        * @returns	The found element.
        */
        findRight(predicate: ItemCallback<T, boolean>): T;

        /**
        * Finds the first element's index from the right given a specific predicate.
        *
        * @method findIndexRight
        * @param  this        The list to iterate.
        * @param  predicate   Function to execute on each value in the array.
        * @returns	The found element's index
        */
        findIndexRight(predicate: ItemCallback<T, boolean>): number;


        findComparing<TExtracted>(comparer: (left: TExtracted, right: TExtracted, index: number) => boolean, extractor?: NullableValueAssigner<T, TExtracted>): T;


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
        findValueComparing<TExtracted>(comparer: ((left: TExtracted, right: TExtracted, index: number) => boolean) | null, extractor: NullableValueAssigner<T, TExtracted>): TExtracted;


        /**
        * Returns a list of items that appear in both this list and the passed in list.
        *
        * @method union
        * @param  this        The list to manipulate.
        * @param  other       The list of entites to union with.
        * @param  extractor   The optional method or string to use to extract the values that will be compared.
        * @returns	The subset list.
        */
        union<TOther, TResult>(other: TOther[], extractor?: NullableKeyValueAssigner<T & TOther, T | TOther, TResult>): T[];

        /**
        * Retuns the list of items that are not in the passed in list.
        *
        * @method exclude
        * @param  this        The list to manipulate.
        * @param  exclude     The list of entites to exclude.
        * @param  extractor   The optional method or string to use to extract the values that will be compared.
        * @returns	The subset list.
        */
        exclude<TOther, TResult>(exclude: TOther[], extractor?: NullableKeyValueAssigner<T & TOther, T | TOther, TResult>): T[];



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
        * @param  this        The list to sort.
        * @param  ...keys     The list containing the key to sort by. See description for more detail,
        * @returns	The sorted list.
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
        * @param  this        The list to sort.
        * @param  ...keys     The list containing the key to sort by. See description for more detail,
        * @returns	The sorted list.
        */
        sortByDescending<TResult>(...keys: SortKey<T, TResult>[]): T[];


        /**
        * Creates a shallow copy of this array. If an extractor is provided, will only
        * returned the extracted items. (Performs a basic map operation).
        * @method copy
        * @param	extractor The optional handler to call on each item.
        * @returns	The copied list.
        */
        copy<TResult>(extractor?: ItemCallback<T, TResult>): TResult[];

        /**
        * Checks whether the current array and the given array are equals by comparing pairwise equality.
        * If elements have their own equals method, will use the equals method to compare elements. This allows
        * for a deep equals operator to work.
        *
        * @method equals
        * @param	other        The array to compare with this current array.
        * @returns	Wether the arrays are equal or not.
        */
        equals(other: T[]): boolean;
    }
}
