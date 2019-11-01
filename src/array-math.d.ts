export{}

declare global {
    interface PermutationOptions {
        repeating: boolean
    }

    export interface Array<T> {

        max<TExtract>(comparer?: (left: TExtract, right: TExtract,  index: number) => boolean, extractor?: (item: T, index: number) => TExtract): T;

        maxValue<TExtract>(extractor: (item: T, index: number) => TExtract): TExtract;

        min<TExtract>(comparer?: (left: TExtract, right: TExtract,  index: number) => boolean, extractor?: (item: T, index: number) => TExtract): T;

        minValue<TExtract>(extractor: (item: T, index: number) => TExtract): TExtract;



        // Counts the number of items that match a condition. If no condition present, will count the number of items that
        // are not falsy.
        //
        // @method count
        // @param {Object[]}        this     The list to iterate
        // @param {Function}        handler  Will take the element and index and return true if to include in the count.
        // @return {Number}                  The number of items matching the condition
        count(handler?: (item: T, index: number) => boolean): number;


        sum(extractor?: (item: T, index: number) => number): number;


        product(extractor?: (item: T, index: number) => number): number;


        average(extractor?: (item: T, index: number) => number): number;


        median(extractor?: (item: T, index: number) => number): number;


        variance(extractor?: (item: T, index: number) => number): number;





        /**
         * Returns all permutations of a given size.
         *
         * @method permutations
         * @param  {Number}         size     The maximum size of a permutation.
         * @param  {Object}         options  If repeating is provided and is true, allows
         *                                   repeating permutations.
         * @return {Array[]}          Array of
         */
        permutations(size: number, options?: PermutationOptions): Array<Array<T>>;


        // Creates all combinations of a given size from the current list of items.
        //
        // Modified from https://gist.github.com/axelpale/3118596
        // @method combinations
        // @param {Object[]}        this    The list of items to create combinations from.
        // @param {Integer}         combinationSize     The name of the id field to fetch and aggregate by.
        // @returns {Object}                The map keyed by id.
        combinations(combinationSize: number): Array<Array<T>>;
    }
}
