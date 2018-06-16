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

## Array Properties

#### isEmpty
Returns true if the list is empty, else false.
```Javascript
console.log([].isEmpty);
// true

console.log([1, 2, 3].isEmpty);
// false
```

#### firstElement
Returns the first element in the array or null if empty.
```Javascript
console.log([].firstElement);
// null

console.log([1, 2, 3].firstElement);
// 1
```


#### lastElement
Returns the last element in the array or null if empty.
```Javascript
console.log([].lastElement);
// null

console.log([1, 2, 3].lastElement);
// 3
```

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
Combines the filter and map operation into a single iteration. First tests the filter. If the filter
matches, then calls map and returns the list of the mapped results.
```Javascript
const list = [0, 1, 2, 3, 4];
const mapper = (value, index) => value * index;
const filter = value => value != 3;
console.log(list.filterMap(mapper, filter));
// [0, 1, 4, 16]
```

If no filter present, will filter out items which are not falsy.
```Javascript
const list = [0, 1, 2, null, 3, 4, false];
const mapper = (value, index) => value * index;
console.log(list.filterMap(mapper, null));
// Since 0, null, and false are falsy, will be filtered out.
// [1, 4, 12, 20]
```


#### mapFilter()
Combines the filter and map operation into a single iteration. First it calls map on an item.
Next if the resulting item matches the filter, it is added to the resulting list.
```Javascript
const list = ['a', 'b', 'c', 'd']
const mapper = (value, index) => value + index;
const filter = value => value != 'b1';
console.log(list.mapFilter(mapper, filter));
// ['a0', 'c2', 'd3']
```

If no filter present, will filter out items which are not falsy.
```Javascript
const list = [0, 1, 2, 3];
console.log(list.mapFilter(() => null, null));
// Since each item maps to null which is falsy, will return an empty list.
// []
```




#### offsetMap()
Performs a map operation for a subset of the list starting with the given "start" index and continuing for the given length. Returns the processed sublist.

#### limit()
Takes the first items from the list based on the count provided.
```Javascript
console.log([1, 2, 3, 4, 5].last(3));
// [1, 2, 3]
```

#### last()
Takes the last items from the list based on the count provided
```Javascript
console.log([1, 2, 3, 4, 5].last(3));
// [3, 4, 5]
```

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

#### diff()
Takes an array and returns where the current array and given array are different. The return format is an array of arrays:
```
[
    [ //Diff 1
        "value1",    //thisValue    The value in this array.
        "value2",    //rightValue   The value in the right array.
        0,           //thisIndex    The index in this array.
        1,           //rightIndex   The index in the right array.
    ]
]
```
If a value exists in this array, but not in the presented array, rightValue and rightIndex will be null. If a value exists in the right array but not in the current array, thisValue and thisIndex will be null.
 
**For example:**
```Javascript
['1', 'a', 'b', 'c', 'd'].diff(['2', 'a', 'b', 'c']) 
// returns  
// [
//    ['1', '2', 0, 0]
//    ['d', null, 4, null]
// ]
```
You can also pass in a handler to do custom comparisons. The parameters of the handler are:
 * thisValue - The value in this array.
 * rightValue - The value in the right array.
 * thisIndex - The index in this list.
 * rightIndex - The index in the right array.
 
**For example:**
```Javascript
[{v: 'a'}, {v: 'b'}, {v: 'c'}, {v: 'd'}].diff(['a', 'b', 'c', 'e'], (left, right) => left.v == right) 
// returns  
// [
//    [{v: 'd'}, 'e', 3, 3]
// ]
```

Finally, you can pass in a max lookahead value. This will tell how far forward to look for similarities before assuming that all values in the list are different.
 
**For example:**
```Javascript
['a', 'b', 'c', '1', '2', '3', 'd', 'e'].diff(['a', 'b', 'c', 'd', 'e'], null, 5);
// Will find that '1', '2', and '3' are in the left but not in the right.

['a', 'b', 'c', '1', '2', '3', 'd', 'e'].diff(['a', 'b', 'c', 'd', 'e'], null, 1);
// Will assume that '1', '2', '3' where replaced with 'c', 'd', 'e' respectively and then, 
// 'd' and 'e' were added to the left list.
```

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

#### createBlurb()
Returns a shorter version of the string trying to cut the length at new line and space characters.
```Javascript
"hello world\nhow are you".createBlurb(13);
// "hello world..."
```
By default, it will make the string as long as the first newline character. However if a second parameter 
"minBlurb" is provided, will return a string including new lines.
```Javascript
"hello world\nhow are you\nI am good".createBlurb(30, 25);
// "hello world\nhow are you..."
```



#### createBlurbSingleLine()
Returns a shorter version of the string trying to cut the length at space characters. 

If the character before and after the newline is a regular word character, will replace the newline with a 
period and capitalize the next character.
```Javascript
"hello world\nhow are you\nI am good".createBlurbSingleLine(25)`
// "hello world. How are you..."
```




# License
ISC License (ISC)
Copyright 2018 Foqal inc

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
