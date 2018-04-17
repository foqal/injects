# Injects
Adds a bunch of tools to help with array and string operations.

![CircleCI](https://img.shields.io/circleci/project/github/foqal/injects.svg)

# Install
```npm
npm install native-injects
```
in your code
```javascript
require('native-injects');
```
or
```javascript
import 'native-injects';
```

# Methods

## Array Methods

### Iterators

#### toIdMap()
Converts a list to an object keyed by a given id.
```Javascript
const list = [
    {id: 1, value: "Hello"},
    {id: 2, value: "World"}
]
console.log(list.toIdMap("id")); //"id" is the optional since its the default. 
// {
//   1: { id: 1, value: "Hello"},
//   2: { id: 2, value: "World"}
// }
```


#### toIdList()
Converts a list of objects to a list of raw values extracted from the list.
```Javascript
const list = [
    {id: 1, value: "Hello"},
    {id: 2, value: "World"}
]
console.log(list.toIdList("id")); //"id" is the optional since its the default.
//Prints 
// [1, 2]
```


#### toIndexList()
Creates a list of incrementing values the same size as the original list
```Javascript
const list = ["a", "b", "c", "e", "a", "z"]
console.log(list.toIndexList()); 
// [1, 2, 3, 4, 5, 6]
```

#### dedupe()
Removes duplicates from the original list
```Javascript
const list = [1, 1, 2, 3, 1]
console.log(list.dedupe()); 
// [1, 2, 3]
```
Can work on objects if a handler is provided.
```Javascript
const list = [{id: 1}, {id: 2}, {id: 3}, {id: 1}, {id: 1}]
console.log(list.dedupe(o => o.id)); 
// [{id: 1}, {id: 2}, {id: 3}]
```
Can override which object is kept with the second pararmeter.
```Javascript
const list = [
    {id: 1, v: 10.0}, 
    {id: 1, v: 20.0}
]
const extractor = o => i.id;
const combiner = (a, b) => a.v > b.v ? a : b;
console.log(list.dedupe(extractor, combiner)); 
// [
//    {id: 1, v: 10} 
// ]
```

#### flatten()
Flattens a list of lists into 1 dimension.
```Javascript
const list = [[1,2], [3,4]]
console.log(list.flatten()); 
// [1, 2, 3, 4]
```

#### flatMap()
Takes an array, applies a map operation to it and combines the returning array of arrays into a flattened array.

#### forEachReturned()
Calls a handler on each item in the list and returns the list of items. This is like the forEach method, but this one returns the original list.

#### offsetForEach()


#### filterMap()


#### offsetMap()
Performs a map operation for a subset of the list starting with the given "start" index and continuing for the given length. Returns the processed sublist.

#### limit()
Takes the first items from the list based on the count provided.

#### last()
Takes the last items from the list based on the count provided

#### skip()
Skips the given number of elemens and returns the rest of the list.

#### findRight()
Finds the first element from the right given a specific predicate.

#### findIndexRight()
Finds the first element's index from the right given a specific predicate.

#### union()
Returns a list of items that appear in both this list and the passed in list.

#### exclude()
Retuns the list of items that are not in the passed in list.

#### copy()
Creates a shallow copy of this array. If an extractor is provided, will only returned the extracted items. (Performs a basic map operation).

#### findComparing()

#### findIndexComparing()

#### findValueComparing()


### Math
Standard list math operations

#### max()
Returns the largest item in the list.
```Javascript
[1,2,3,4,5].max(); //returns 5

//Can provide a custom comparer which will see which object is bigger left or right.
[{v: 1}, {v: 2}, {v: 3}].max((a, b) => a.v > b.v); // returns {v: 3}

//Can provide a handler to extract the value that gets compared
[{v: 1}, {v: 2}, {v: 3}].max(null, obj => obj.v); //returns {v: 3}

```

#### maxValue()

#### min()

#### minValue()

#### count()

#### sum()

#### product()

#### average()

#### median()

#### variance()

#### permutations()
Returns all permutations of a given size.

#### combinations()
Creates all combinations of a given size from the current list of items.

### Diffs
Standard functions to help calculate differences and splits.

#### split()
Takes a list and creates sub-lists where the max size is no greater than splitSize.
```Javascript
[1,2,3,4,5].split(2) // returns [[1, 2], [3, 4], [5]]
```

#### switches()
Counts the number of times that two consecutive values are not equal.
```Javascript
//Switches once from null to 1, once from 1 to 2, and once from 2 to 3.
[1, 1, 2, 2, 2, 2, 3, 3].switches((a, b) => a == b); // returns 3
```

#### countDiffs()
Counts the number of differences between the current list and a given second list.
```Javascript
//
[1, 1, 2, 3].coundDiffs([1, 2, 3]); // returns 2
```

## Promises
#### mapConcurrent()
Process each item in the list and assumes that the given handler is a promise.
Will resolve all promises once all sub-promises are also resolved. If an error
occurs the entire list will throw.

Can also operate in one of two ways. If given a concurrency value (by default 10)
will only run that number of promises at once. Once one of those promises completes,
the handler will start the next promise until all are completed. For example, if reading
a list of files, you may only want to read 5 files at a time even if you have a list of 100.
Once a file is done reading, the next one in the list of 100 will start processing.

If the concurrency value is -1, will start all sub-promises at the same time.

```Javascript
const listIndexes = new Array(100).fill(1).toIndexList(); //creates an array from 0 to 99.
const data = await listIndexes.mapConcurrent(async fileIndex => await fetch(url + fileIndex));
// Data will complete once all the fetch operations are complete for the 100 urls. Because the default
// concurrency parameter is 10, will only fetch 10 items at a time instead of getting all 100 at once.
```

#### mapPromise()

#### forEachConcurrent()

#### forEachPromise()


## String Methods

#### extractSymbolsWithRegExp()
Uses a RegExp to find matches in a string and returns those as a list of symbols. Additionally returns a 
new text value which is the text after removing the symbols.
```Javascript
const {text, symbols} = "hello <world>".extractSymbolsWithRegExp(/<([^>]+)>/g);
```




#License
ISC License (ISC)
Copyright 2018 Foqal inc

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
