
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
Array.prototype.mapConcurrent = async function (callback, concurrency = 10) {

    let index = 0;
    const end = this.length;

    if (concurrency == -1) {
        concurrency = end;
    }

    const results = [];

    const start = async () => {
        if (index >= end) {
            return;
        }
        const item = this[index];
        const currentIndex = index;
        index++;
        const returned = await callback(item, currentIndex);
        results.push(returned);
        return start();
    };

    const promises = [];
    for (let i = 0; i < concurrency; i++) {
        promises.push(start());
    }

    await Promise.all(promises);
    return results;
};

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
Array.prototype.mapPromise = async function (callback) {
    return this.mapConcurrent(callback, 1);
};

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
Array.prototype.forEachConcurrent = async function (callback, concurrency = 10) {
    await this.mapConcurrent(callback, concurrency);
};


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
Array.prototype.forEachPromise = async function (callback) {
    return this.forEachConcurrent(callback, 1);
};
