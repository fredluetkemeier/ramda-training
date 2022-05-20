# Advanceder Functioning

I know what you're thinking: "Lesson 7 was too easy, I need to know about some functions that do similar, but at the same time very different things so that I have something to keep my mind busy". Well, you asked for it!

## New Utils

This Lessons Utils:

-   [R.equals](https://ramdajs.com/docs/#equals): Returns true if two items are equivalent
    -   `R.equals(1, 1) // true`
    -   `R.equals({}, {}) // true`
    -   `R.equals({ name: 'jim' }, { name: 'jerry' }) // false`
-   [R.max](https://ramdajs.com/docs/#max): Returns the larger of two numbers
-   `(a, b) => a > b ? a : b`
-   `R.max(1, 2) // 2`
-   `R.max(2, 1) // 2`
-   [R.min](https://ramdajs.com/docs/#min): Returns the larger of two numbers
-   `(a, b) => a > b ? a : b`
-   `R.min(1, 2) // 1`
-   `R.min(2, 1) // 1`

## Juxt

[R.juxt](https://ramdajs.com/docs/#juxt) accepts an array of functions. The returned function, when called, will pass all parameters to all the functions, returning an array of the result of all values. Some examples:

```javascript
const R = require('ramda');

R.juxt([R.add, R.multiply, R.subtract, R.divide])(10, 5);
// [15, 50, 5, 2]

/*
 * Let's break it down:
 * R.juxt([R.add, R.multiply, R.subtract, R.divide])(10, 5)
 * - equivalent to:
 * [
 *   R.add(10, 5),
 *   R.multiply(10, 5),
 *   R.subtract(10, 5),
 *   R.divide(10, 5),
 * ]
 *
 * not too bad, lets take another look
 */

R.juxt([R.prop('name'), R.prop('age')])({ name: 'George', age: 28 });
// ['George', 28]

R.juxt([R.always('hello'), R.identity, R.equals('world')])('world');
// ['hello', 'world', true]
```

Not too bad in isolation, on to the next one!

## Use With

[R.useWith](https://ramdajs.com/docs/#useWith) is a lot like [R.converge](https://ramdajs.com/docs/#converge) except that each function in the array list gets its own parameter instead of all sharing one parameter. Examples:

```javascript
const R = require('ramda');

// first, lets go back to one of our converge examples
const strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower]);
strangeConcat('Yodel'); // YODELyodel

// now, as a useWith
const strangerConcat = R.useWith(R.concat, [R.toUpper, R.toLower]);
strangerConcat('Yodel'); // returns a function, waiting for a second parameter
strangerConcat('Yodel', 'Yodel'); // YODELyodel
strangerConcat('Hello', 'World'); // HELLOworld

/*
 * Ok, so what's going on here?
 *
 * const strangerConcat = R.useWith(R.concat, [R.toUpper, R.toLower]);
 *
 * strangerConcat('Hello', 'World')
 * - equivalent to R.apply(R.concat, [R.toUpper('Hello'), R.toLower('World')]);
 * - equivalent to R.apply(R.concat, ['HELLO', 'world']);
 * - equivalent to R.concat('HELLO', 'world');
 * - equivalent to 'HELLOworld'
 *
 * Lets look at some more examples
 */

const getLargesNumber = R.reduce(R.max, 0);
const addLargestNumber = R.useWith(R.add, [getLargesNumber, getLargesNumber]);

addLargestNumber([1, 2, 3], [4, 5, 6]); // 9
// 3 is the largest from the first array
// 6 is the largest from the second array

addLargestNumber([3, 4, 2], [1, 1, 1]); // 5
```

Got it? Good! While this has been a shorter lesson, the tests may take longer.

## Now You Do It

`npm run lesson8`

Make the tests pass 😀
