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

## Iterators

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

...and many more. Will add more in time. :D
