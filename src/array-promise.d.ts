export{}

declare global {


    export interface Array<T> {
        /**
         * Process each item in the list and assumes that the given handler is a promise.
         * Will resolve all promises once all sub-promises are also resolved. If an error
         * occurs the entire list will throw.
         *
         * Can also operate in one of two ways. If given a concurrency value (by default 10)
         * will only run that number of promises at once. Once one of those promises completes,
         * the handler will start the next promise until all are completed. For example, if reading
         * a list of files, you may only want to read 5 files at a time even if you have a list of 100.
         * Once a file is done reading, the next one in the list of 100 will start processing.
         *
         * If the concurrency value is -1, will start all sub-promises at the same time.
         *
         * @method mapConcurrent
         * @param  {Function} callback         The async handler to call to process a single item.
         * @param  {Number}   [concurrency=10] The number of promises to start at a time.
         * @return {Promise}                   A promise that when fully resolved will return the
         *                                     list of items that were returned from each async
         *                                     handler call.
         */
        mapConcurrent<TMapped>(callback: (item: T, index: number) => Promise<TMapped>, concurrency?: number): Promise<Array<TMapped>>;

        /**
         * For the given list, will call the async callback handler one at a time to process
         * each item in the list. Once each item has been processed, the returned Promise will
         * resolve.
         *
         * @method mapPromise
         * @param  {Function} callback  The async handler to call for each item.
         * @return {Promise}            A promise that will resolve once all items have been processed
         *                              by the async callback. The result is the array of results from
         *                              each asynch callback.
         */
        mapPromise<TMapped>(callback: (item: T, index: number) => Promise<TMapped>): Promise<Array<TMapped>>;


        /**
         * Process each item in the list and assumes that the given handler is a promise.
         * Will resolve all promises once all sub-promises are also resolved. If an error
         * occurs the entire list will throw.
         *
         * Can also operate in one of two ways. If given a concurrency value (by default 10)
         * will only run that number of promises at once. Once one of those promises completes,
         * the handler will start the next promise until all are completed. For example, if reading
         * a list of files, you may only want to read 5 files at a time even if you have a list of 100.
         * Once a file is done reading, the next one in the list of 100 will start processing.
         *
         * If the concurrency value is -1, will start all sub-promises at the same time.
         *
         * @method forEachConcurrent
         * @param  {Function} callback         The async handler to call to process a single item.
         * @param  {Number}   [concurrency=10] The number of promises to start at a time.
         * @return {Promise}                   A promise that will only resolve once all child promises are also
         *                                     resolved.
         */
        forEachConcurrent<TMapped>(callback: (item: T, index: number) => Promise<TMapped>, concurrency?: number): Promise<void>;



        /**
         * For the given list, will call the async callback handler one at a time to process
         * each item in the list. Once each item has been processed, the returned Promise will
         * resolve.
         *
         * @method forEachPromise
         * @param  {Function} callback  The async handler to call for each item.
         * @return {Promise}            A promise that will only resolve once all child promises are also
         *                              resolved.
         */
         forEachConcurrent<TMapped>(callback: (item: T, index: number) => Promise<TMapped>): Promise<void>;

    }
}
