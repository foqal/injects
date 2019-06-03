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

#### isNotEmpty
Returns true if the list is not empty, else false.
```Javascript
console.log([1, 2, 3].isNotEmpty);
// true

console.log([].isNotEmpty);
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
Converts a list to an object keyed by a field in each object.
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
console.log(list.toIdMap("id", "value"));
// {
//   1: "Hello",
//   2: "World"
// }
```

Can also provide a custom key handler and value handler as functions
```Javascript
const list = [
    {id: 1, value: "Hello"},
    {id: 2, value: "World"}
]
console.log(list.toIdMap(row => row.id, row => row.id + ":" + row.value));
// {
//   1: "1:Hello",
//   2: "2:World"
// }
```


#### groupBy()
Takes an array of items and groups by field in each item. The result is a map of key to arrays.
```Javascript
const list = [
    {id: 1, value: "foo"},
    {id: 1, value: "bar"},
    {id: 2, value: "baz"},

]
console.log(list.groupBy()); //By default uses a field called "id".
// {
//   1: [{id: 1, value: "foo"}, {id: 1, value: "bar"}],
//   2: [{id: 2, value: "baz"}]
// }
console.log(list.groupBy("id", "value")); //Can also specify the key and/or value fields
// {
//   1: ["foo", "bar"],
//   2: ["baz"]
// }
```
Can also provide a custom key handler and value handler as functions
```Javascript
const list = [
    {id: 1, value: "foo"},
    {id: 1, value: "bar"},
    {id: 2, value: "baz"},

]
console.log(list.groupBy(row => row.id, row => row.id + ":" + row.value));
// {
//   1: ["1:foo", "1:bar"],
//   2: ["2:baz"]
// }
```



#### distribution()
Takes an array of items and counts the distribution of given keys
```Javascript
const list = [
    {id: 1, value: "foo"},
    {id: 1, value: "bar"},
    {id: 2, value: "baz"},

]
console.log(list.distribution()); //By default uses a field called "id".
// {
//   1: 2,
//   2: 1
// }
console.log(list.distribution("value")); //Can also specify the key as a key name or function.
// {
//   "foo": 1,
//   "bar": 1,
//   "baz": 1
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
Performs a forEach operation for a subset of the list starting with the given "start"
index and continuing for the given length.
```Javascript
const list = [1, 2, 3, 4, 5];
const newList = [];
list.offsetForEach(1, 2, item => newList.push(item));
console.log(newList);
// [2, 3]
```
Can also skip the start and/or length parameters
```Javascript
const list = [1, 2, 3, 4, 5];
list.offsetForEach(3, null, item => console.log(item));
// 3
// 4
// 5
```
```Javascript
const list = [1, 2, 3, 4, 5];
list.offsetForEach(null, 3, item => console.log(item));
// 1
// 2
// 3
```


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


#### filterFalsy
Removes all elements that evaluate to falsy such as null, false, 0, etc
```Javascript
const list = [null, undefined, 0, false, "", true]
console.log(list.filterFalsy());
// [true]
```

#### filterNull
Removes all null and undefined elements
```Javascript
const list = [null, undefined, 0, false, "", true]
console.log(list.filterNull());
// [0, false, "", true]
```


#### offsetMap()
Performs a map operation for a subset of the list starting with the given "start" index and continuing for the given length. Returns the processed sublist.

```Javascript
const list = [1, 2, 3, 4, 5];
const newList = list.offsetMap(1, 2, item => "i-" + item);
console.log(newList);
// ["i-2", "i-3"]
```
Can also skip any of the parameters
```Javascript
const list = [1, 2, 3, 4, 5];
const c = list.offsetMap(1, 3);
console.log(offsetMap);
// [2, 3, 4]
```
```Javascript
const list = [1, 2, 3, 4, 5];
const newList = list.offsetMap(3, null, (item, index) => `[${index}]: ${item}`);
console.log(newList);
// ["[3]: 4", "[4]: 5"]
```

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
```Javascript
console.log([1, 2, 3, 4, 5].union([2, 3]));
// [2, 3]
```
For objects, you can control how each object gets serialized to be compared with either a string key name or a handler function
```Javascript
console.log([{id: 1}, {id: 2}].union([{id: 1}, {id: 4}], "id"));
// [{id: 1}]


console.log([{id: 1}, {id: 2}].union([{id: 1}, {id: 4}], item => item.id));
// [{id: 1}]
```



#### exclude()
Returns the list of items that are not in the passed in list.
```Javascript
console.log([1, 2, 3, 4, 5].exclude([2, 3]));
// [1, 4, 5]
```
For objects, you can control how each object gets serialized to be compared with either a string key name or a handler function
```Javascript
console.log([{id: 1}, {id: 2}].exclude([{id: 1}, {id: 4}], "id"));
// [{id: 2}]


console.log([{id: 1}, {id: 2}].exclude([{id: 1}, {id: 4}], item => item.id));
// [{id: 2}]
```


#### copy()
Creates a shallow copy of this array. If an extractor is provided, will only returned the extracted items. (Performs a basic map operation).

#### findComparing()

#### findIndexComparing()

#### findValueComparing()


#### sortBy()
Creates a copy of the current array and sorts by the given list in a ascending order.

The keys define how to sort. They are a list of:
 * A String used to identify the name of the key in the object. The sort order is ascending
 * A Function used to extract the value to sort by. The sort order is based on ascending.
 * An object containing a key and direction. The key is also a String or Function as previously defined. The
    direction specifies the sort order using the SortDirection values. (1 or -1)

```Javascript
console.log([{id: 1, count: 4}, {id: 2, count: 10}].sortBy("count"));
// [{id: 2, count: 10}, {id: 1, count: 4}]
```

You can also provide a custom handler to extract the key of each item
```Javascript
const items = [
    {id: 4, key: 3},
    {id: 3, key: 3},
    {id: 2, key: 2},
    {id: 1, key: 1}
].sortBy(item => item.key * 100 + item.id);
// [{id: 1, key: 1}, {id: 2, key: 2}, {id: 3, key: 3}, {id: 4, key: 3}]
```

If you provide multiple keys, the method will first sort by the first key in ascending order, then second in ascending order and so on.
```Javascript
const items = [
    {count: 10, id: 1},
    {count: 10, id: 3},
    {count: 10, id: 2},
    {count: 1, id: 1}
].sortBy("count", "id");
// [{count: 1, id: 1}, {count: 10, id: 1}, {count: 10, id: 2}, {count: 10, id: 3}]
```

You can also control the directionality of each sort key by using an object with "key" and "direction".
```Javascript
import {SortDirection} from 'native-injects';

const items = [
    {id: 4, key: 2, count: 10},
    {id: 3, key: 2, count: 10},
    {id: 2, key: 3, count: 10},
    {id: 1, key: 4, count: 1}
].sortBy(
    {key: "count", direction: SortDirection.DESCENDING},
    {key: item => item.key, direction: SortDirection.ASCENDING},
    "id", //sorts ascending by default
);
//[
//    {id: 3, key: 2, count: 10},
//    {id: 4, key: 2, count: 10},
//    {id: 2, key: 3, count: 10},
//    {id: 1, key: 4, count: 1}
//]
```


#### sortByDescending()

Creates a copy of the current array and sorts by the given list in a descending order.

The keys define how to sort. They are a list of:
 * A String used to identify the name of the key in the object. The sort order is descending
 * A Function used to extract the value to sort by. The sort order is based on descending.
 * An object containing a key and direction. The key is also a String or Function as previously defined. The
   direction specifies the sort order using the SortDirection values. (1 or -1)

```Javascript
console.log([{id: 1, count: 4}, {id: 2, count: 10}].sortByDescending("count"));
// [{id: 1, count: 4}, {id: 2, count: 10}]
```
You can also provide a custom handler to extract the key of each item
```Javascript
const items = [
    {id: 4, key: 3},
    {id: 3, key: 3},
    {id: 2, key: 2},
    {id: 1, key: 1}
].sortByDescending(item => item.key * 100 + item.id);
// [{id: 4, key: 3}, {id: 3, key: 3}, {id: 2, key: 2}, {id: 1, key: 1}]
```


If you provide multiple keys, the method will first sort by the first key in descending order, then second in descending order and so on.
```Javascript
const items = [
    {count: 10, id: 1},
    {count: 10, id: 3},
    {count: 10, id: 2},
    {count: 1, id: 1}
].sortByDescending("count", "id");
// [{count: 10, id: 3}, {count: 10, id: 2}, {count: 10, id: 1}, {count: 1, id: 1},]
```

You can also control the directionality of each sort key by using an object with "key" and "direction".
```Javascript
import {SortDirection} from 'native-injects';

const items = [
    {id: 4, key: 2, count: 10},
    {id: 3, key: 2, count: 10},
    {id: 2, key: 3, count: 10},
    {id: 1, key: 4, count: 1}
].sortByDescending(
    {key: "count", direction: SortDirection.DESCENDING},
    {key: item => item.key, direction: SortDirection.ASCENDING},
    "id", //sorts descending by default
);
//[
//    {id: 4, key: 2, count: 10},
//    {id: 3, key: 2, count: 10},
//    {id: 2, key: 3, count: 10},
//    {id: 1, key: 4, count: 1}
//]
```



#### equals()
Checks whether the current array and the given array are equals by comparing pairwise equality.
```Javascript
const left = [1,2,3];
left.equals([1,2,3]);
//returns true
```
If elements have their own equals method, will use the equals method to compare elements.
```Javascript
const left = [
    {equals: el => el == 1},
    {equals: el => el == 2}
];
left.equals([1,2]);
//returns true
```
This allows for a deep equals operator to work as well.
```Javascript
const left = [ [1], [2], [3] ];
left.equals([ [1], [2], [3] ]);
//returns true
```



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
Counts the number of items in the list that match the given expression.
```Javascript
[1, 2, 3, 4].count(value => value % 2 === 0); //Returns 2
```
If no handler present, will by default count the number of items whos value is not falsy.
```Javascript
[true, false, null, undefined, 0, "", "hello"].count(); //Returns 2
```

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
//text will be "hello "
//symbols will be ["world"]
```

By default, will match the RegEx group at index 1 and add this to resulting symbols list. However, if
your RegExp is complicated and has many groups, can extract other index groups.
```Javascript
const {text, symbols} = "hello <world>".extractSymbolsWithRegExp(/( (<([^>]+)>))/g, {matchIndex: 2});
//text will be "hello "
//symbols will be ["<world>"]
```

Additionally you can replace which group index gets removed from the original text. By default, the entire
match is replaced. However you may want to replace only a specific group.
```Javascript
"hello <world>".extractSymbolsWithRegExp(/( (<([^>]+)>))/g, {matchIndex: 2, replaceIndex: 3})
//text will be "hello <>"
//symbols will be ["world"]
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


#### indexOfWithSet()
Returns the index of one of the characters that matches the given set or regex. This works
like the String.prototype.indexOf method but instead of looking for a single character, will
look for one of the characters in a set or a matching regex.
```Javascript
"hello world".indexOfWithSet([" "]); //will return 5
"hello world".indexOfWithSet(/ /);   //will return 5
"hello world".indexOfWithSet(" ");   //will return 5
```
The power is being able to specify multiple characters to look for.
```Javascript
"hello\tworld".indexOfWithSet([" ", "\t"]); //will return 5
"hello\tworld".indexOfWithSet(/[ \t]/);     //will return 5
```
You can also specify which character to start looking with
```Javascript
"hello\tworld how are you".indexOfWithSet([" ", "\t"], 7); //will return 11
"hello\tworld how are you".indexOfWithSet(/[ \t]/, 7);     //will return 11
```

#### lastIndexOfWithSet()
Returns the last index of one of the characters that matches the given set or regex. This works
like the String.prototype.lastIndexOf method but instead of looking for a single character, will
look for one of the characters in a set or a matching regex.
```Javascript
"foo bar baz".lastIndexOfWithSet([" "]); //will return 7
"foo bar baz".lastIndexOfWithSet(/ /);   //will return 7
"foo bar baz".lastIndexOfWithSet(" ");   //will return 7
```
The power is being able to specify multiple characters to look for.
```Javascript
"foo bar\tbaz".lastIndexOfWithSet([" ", "\t"]); //will return 7
"foo bar\tbaz".lastIndexOfWithSet(/[ \t]/);   //will return 7
```
You can also specify which character to start looking with
```Javascript
"foo bar\tbaz".lastIndexOfWithSet([" ", "\t"], 6); //will return 4
"foo bar\tbaz".lastIndexOfWithSet(/[ \t]/, 6);   //will return 4
```


#### justify()
Cuts the given text into substrings of up to a given length or smaller. If a line is longer than the required
width, will cut near the end and will insert a hyphen. If a text already has new lines, will replace those with
two newlines and will insert paragraphPadding.
```Javascript
"hello world.".justify(5);
//returns hello\nworld.
```
if the width is not long enough for a word, will break into multiple lines with a hypen. The length of each line will
be the justify width including the hypen.
```Javascript
"Supercalifragilisticexpialidocious".justify(8);
//returns
//    Superca-
//    lifragi-
//    listice-
//    xpialid-
//    ocious
```
If your text contains new lines already, those will be considered paragraphs and broken by 2 new lines in a row.
```Javascript
"I parked my car at harvard yard.\nIt was a green car.".justify(100);
//returns
// I parked my car at harvard yard.
//
// It was a green car.
```
You can also insert padding for each paragraph and line. If a paragraph padding is not set, will use the line padding.
```Javascript
"I parked my car at harvard yard\nIt was a green car.".justify(12, "\t\t", "\t\t\t");
//returns
//          I parked my
//      car at
//      harvard yard
//
//
//          It was a
//      green car.
```
Finally, you can make the first line in a paragraph a different width than the rest. (useful for tabbing the first line
in a paragraph)
```Javascript
const lyrics = [
    "All in all it was just a brick in the wall.",
    "All in all it was all just bricks in the wall."
].join("\n");
lyrics.join("\n").justify(25, " ", "    ", 21);
/* Returns

    All in all it was
  just a brick in the
  wall.

    All in all it was all
  just bricks in the
  wall.

*/

```




#### capitalize()
Capitalizes the string. (Makes the first character capital). If presented with a splitter,
the string will first be split up by the splitter, capitalized, and rejoined.

If a splitter is present, and no joiner, the string will be rejoined with
the original character that split it. If a joiner is present, the string will
be rejoined with this character. For example if "hello world" is split by spaces
and the joiner is "-", the final result will be "Hello-World".
```Javascript
"hello".capitalize() //returns "Hello"
```
When presented with a splitter, will segment into chunks and capitalize the first letter of every chunk
```Javascript
"hello world! how are you?".capitalize(" ")
//returns "Hello World! How Are You?"
```
When rejoining the string you can have it join on a different string all together.
```Javascript
"hello\nworld".capitalize("\n", " ")
//returns "Hello World"
```


## Date Properties
Since these are often being calculated and Javascript does not have a good reference to them, we added the constant values in milliseconds of common date values.

| Property           | Value          | Notes     |
| ------------------ | -------------- | --------- |
| DATE.SECOND        | 1000           | 1 Second  |
| Date.MINUTE        | 60,000         | 1 Minute  |
| Date.HOUR          | 3,600,000      | 1 Hour    |
| Date.DAY           | 86,400,000     | 1 Day     |
| Date.WEEK          | 604,800,000    | 7 Days    |
| Date.MONTH         | 2,592,000,000  | 30 Days   |
| Date.MONTH_30      | 2,592,000,000  | 30 Days   |
| Date.MONTH_31      | 2,678,400,000  | 31 Days   |
| Date.YEAR          | 31,536,000,000 | 356 Days  |
| Date.LEAP_YEAR     | 31,622,400,000 | 366 Days  |
| Date.TROPICAL_YEAR | 31,556,926,000 | * 365 days, 5 hours, 48 minutes, and 46 seconds |

* Note: Tropical Year - https://www.grc.nasa.gov/www/k-12/Numbers/Math/Mathematical_Thinking/calendar_calculations.htm


# License
ISC License (ISC)
Copyright 2018 Foqal inc

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
