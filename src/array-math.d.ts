export{}

declare global {
    interface PermutationOptions {
        repeating: boolean
    }

    export interface Array<T> {

        max<TExtract>(comparer?: (left: TExtract, right: TExtract,  index: number) => boolean, extractor?: ItemCallback<T, TExtract>): T;

        maxValue<TExtract>(extractor: ItemCallback<T, TExtract>): TExtract;

        min<TExtract>(comparer?: (left: TExtract, right: TExtract,  index: number) => boolean, extractor?: ItemCallback<T, TExtract>): T;

        minValue<TExtract>(extractor: ItemCallback<T, TExtract>): TExtract;



        // Counts the number of items that match a condition. If no condition present, will count the number of items that
        // are not falsy.
        //
        // @method count
        // @param	this     The list to iterate
        // @param	handler  Will take the element and index and return true if to include in the count.
        // @returns	The number of items matching the condition
        count(handler?: ItemCallback<T, boolean>): number;


        sum(extractor?: ItemCallback<T, number>): number;


        product(extractor?: ItemCallback<T, number>): number;


        average(extractor?: ItemCallback<T, number>): number;


        median(extractor?: ItemCallback<T, number>): number;


        variance(extractor?: ItemCallback<T, number>): number;





        /**
         * Returns all permutations of a given size.
         *
         * @method permutations
         * @param	size     The maximum size of a permutation.
         * @param	options  If repeating is provided and is true, allows
         *                                   repeating permutations.
         * @returns	Array of
         */
        permutations(size: number, options?: PermutationOptions): Array<Array<T>>;


        // Creates all combinations of a given size from the current list of items.
        //
        // Modified from https://gist.github.com/axelpale/3118596
        // @method combinations
        // @param	this    The list of items to create combinations from.
        // @param	combinationSize     The name of the id field to fetch and aggregate by.
        // @returns The map keyed by id.
        combinations(combinationSize: number): Array<Array<T>>;
    }
}
