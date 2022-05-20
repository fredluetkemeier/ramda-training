# Advanced Functioning

Now it's time to get into some of the more advanced composition function of Ramda. There are a lot of times where you need to supply more than one parameter to a function, or the order that the parameters are requested are not in the order you'd like them to be (we currenly get around this in certain cases using [R.flip](https://ramdajs.com/docs/#flip)).

## New Utils

This Lessons Utils:

-   [R.sum](https://ramdajs.com/docs/#sum): Returns the sum of an array of numbers
    -   `(nums) => R.reduce(R.add, 0, nums)`
-   [R.length](https://ramdajs.com/docs/#length): Returns the length of a list
    -   `(list) => list.length`
-   [R.props](https://ramdajs.com/docs/#props): Given a list of props and an object, returns a list of values
    -   `R.props(['prop1', 'prop2'], { prop1: 'foo', prop2: 'bar' }); // ['foo', 'bar']`

## Placeholder Parameters

While [R.flip](https://ramdajs.com/docs/#flip) is a nice utility (especially since it can be used on ANY function, not sure ramda's curried functions), [R.\_\_](https://ramdajs.com/docs/#__) is even better! You can replace any parameter with [R.\_\_](https://ramdajs.com/docs/#__) and ramda will know that we're still waiting on that parameter, but you can still supply what you do know. Lets look at some examples:

```javascript
const R = require('ramda');

const fiveMinusX = R.subtract(5);

fiveMinusX(3); // 2
fiveMinusX(1); // 4

// the fiveMinusX function isn't super useful, usually we'd want to do something like:
let minusFive = R.flip(R.subtract)(5);

minusFive(10); // 5
minusFive(16); // 11

// this more useful minusFive function could also be written as:
minusFive = R.subtract(R.__, 5);

minusFive(10); // 5
minusFive(16); // 11

/*
 * I find this easier to read than R.flip, but the real power comes when
 * it is more complicated than just the first two variables you want to
 * adjust the order of, lets look at some more examples
 */

const person = { firstName: 'Philip' };
const setPersonProp = R.assoc(R.__, R.__, person);

/*
 * setPersonProp is now a function that acceps two arguments
 * the first R.__ is a placeholder for the prop name
 * the second R.__ is a placeholder for the prop value
 */

setPersonProp('age', 1025); // { firstName: 'Philip', age: 1025 }
setPersonProp('lastName', 'Fry'); // { firstName: 'Philip', lastName: 'Fry' }
setPersonProp('middleInitial', 'Fry'); // { firstName: 'Philip', middleInitial: 'J' }

// some more examples
const setPropToTrue = R.assoc(R.__, true);

setPropToTrue('test', {}); // { test: true }
setPropToTrue('foo', { foo: 'bar' }); // { foo: true }
setPropToTrue('isNeat', { foo: 'bar' }); // { foo: 'bar', isNeat: true }

/*
 * R.assoc(R.__, true) is functionally the same as R.assoc(R.__, true, R.__)
 * but we don't need any R.__ for parameters that would be curried regardless
 */

const gt50 = R.gt(R.__, 50);

gt50(100); // true
gt50(10); // false

const setArrayItemAsRedacted = R.update(R.__, 'redacted');

setArrayItemAsRedacted(0, ['some', 'secret', 'items']); // ['redacted', 'secret', 'items']
setArrayItemAsRedacted(1, ['some', 'secret', 'items']); // ['some', 'redacted', 'items']
setArrayItemAsRedacted(2, ['some', 'secret', 'items']); // ['some', 'secret', 'redacted']
```

Hopefully you get the jist of it. On to the complicated stuff 😀

## Applying Parameters

[R.apply](https://ramdajs.com/docs/#apply) is a great function which accepts two parameters:

1. A function (`f`)
2. An array of parameters (`x`)

Function `f` will get called, with `x[0]` as the first parameter, `x[1]` as the second parameter, and so on. Check it out:

```javascript
const R = require('ramda');

R.apply(R.add, [1, 2]); // 3
//- equivalent to R.add(1, 2);

R.apply(R.prop, ['foo', { foo: 'bar' }]); // 'bar'
//- equivalent to R.prop('foo', { foo: 'bar' });

/*
 * Now you might be wondering, ok, but why? What's the advantage of
 * calling R.apply(R.add, [1, 2]) vs. R.add(1, 2)?? And the answer
 * is, in this case, there isn't one! R.add(1, 2) is much easier to
 * read, takes less characters, and is faster. Ok, so when will we
 * ACTUALLY use this? Good question :) Take a look:
 */

const addAgesWithoutApply = R.compose((ages) => R.add(ages[0], ages[1]), R.map(R.prop('age')));

const addAgesWithApply = R.compose(R.apply(R.add), R.map(R.prop('age')));

addAgesWithoutApply([{ age: 1 }, { age: 2 }]); // 3
addAgesWithApply([{ age: 1 }, { age: 2 }]); // 3

// another example

R.compose(R.apply(R.concat), R.props(['city', 'state']))({ city: 'wonder', state: 'land' }); // 'wonderland'
```

While this does happen a fair bit, it's even more common that you'll want to derive two parameters from a single value.

## Converging Parameters

[R.converge](https://ramdajs.com/docs/#converge) is similar to [R.apply](https://ramdajs.com/docs/#apply) in that it accepts a function first, and an array second. The array though, is an array of functions, AND it then returns a function, which will pass it's parameters to each of the functions in the array, then apply the returned values to initial function. Wat? Easier to show than explain:

```javascript
const R = require('ramda');

// lets start with ramda's own examples
const average = R.converge(R.divide, [R.sum, R.length]);
average([1, 2, 3, 4, 5, 6, 7]); //=> 4

/*
 * Now lets break it down:
 *
 *                                             func to create first param
 *                                            /
 *                  func to call             /     func to create the second param
 *                              \           /     /
 * const average = R.converge(R.divide, [R.sum, R.length])
 *
 * average([1, 2, 3]):
 * - equivalent to R.apply(R.divide, [R.sum([1, 2, 3]), R.length([1, 2, 3])])
 * - equivalent to R.apply(R.divide, [6, 3])
 * - equivalent to R.divide(6, 3)
 * - equivalent to 2
 */

// second ramda example
const strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower]);
strangeConcat('Yodel'); //=> "YODELyodel"

/*
 * Lets break this one down:
 *
 *                                                   func to create first param
 *                                                  /
 *                       func to call              /          func to create the second param
 *                                   \            /          /
 * const strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])
 *
 * strangeConcat("Yodel"):
 * - equivalent to R.apply(R.concat, [R.toUpper('Yodel'), R.toLower('Yodel')])
 * - equivalent to R.apply(R.concat, ['YODEL', 'yodel'])
 * - equivalent to R.concat('YODEL', 'yodel')
 * - equivalent to 'YODELyodel'
 */
```

Ok, remeber in lesson 5 when we had to seperate out `membersOfSerenity` because we had to use it twice and we didn't know how to? Now we do 😀

```javascript
const R = require('ramda');

const people = [
    {
        firstName: 'Malcom',
        lastName: 'Reynolds',
        ship: 'Serenity',
        age: 31,
        alias: ['Mal', 'Sir', 'Captin'],
    },
    {
        firstName: 'Zoë',
        lastName: 'Washburne',
        ship: 'Serenity',
        age: 33,
        alias: [],
    },
    {
        firstName: 'Hoban',
        lastName: 'Washburne',
        ship: 'Serenity',
        age: 34,
        alias: ['Wash'],
    },
    {
        firstName: 'Kaywinnet',
        lastName: 'Frye',
        ship: 'Serenity',
        age: 21,
        alias: ['Kaylee'],
    },
    {
        firstName: 'Jayne',
        lastName: 'Cobb',
        ship: 'Serenity',
        age: 35,
        alias: [],
    },
    {
        firstName: 'Inara',
        lastName: 'Serra',
        ship: 'Serenity',
        age: 29,
        alias: [],
    },
    {
        firstName: 'Simon',
        lastName: 'Tam',
        ship: 'Serenity',
        age: 28,
        alias: ['Doctor'],
    },
    {
        firstName: 'River',
        lastName: 'Tam',
        ship: 'Serenity',
        age: 18,
        alias: [],
    },
    {
        firstName: 'Derrial',
        lastName: 'Book',
        ship: 'Serenity',
        age: 57,
        alias: ['Shepard', 'Preacher'],
    },
    {
        firstName: 'Adelai',
        lastName: 'Niska',
        ship: 'Skyplex',
        age: 62,
        alias: [],
    },
    {
        firstName: '',
        lastName: '',
        ship: '',
        age: 41,
        alias: ['Badger'],
    },
];

// What we did last time
const membersOfSerenity = R.filter(R.propEq('ship', 'Serenity'), people);
const averageAgeOfSerenityCrew = R.compose(
    Math.round,
    R.flip(R.divide)(membersOfSerenity.length),
    R.reduce(R.add, 0),
    R.map(R.prop('age')),
)(membersOfSerenity); // 32

// but now we can do it all within our compose
const updatedAverageAgeOfSerenityCrew = R.compose(
    Math.round,
    R.converge(R.divide, [R.sum, R.length]),
    R.map(R.prop('age')),
    R.filter(R.propEq('ship', 'Serenity')),
)(people); // 32

// That's pretty neat! Now lets look at some more examples:
const defaultPreferredNameToFirstName = R.converge(
    R.assoc('preferredName'), // returns a function waiting for the value and the object to act against
    [
        R.ifElse(
            R.prop('preferredName'), // if preferredName is truthy
            R.prop('preferredName'), // set preferredName to preferredName (aka, do nothing)
            R.prop('firstName'), // otherwise, set preferredName to firstName
        ),
        R.identity, // return what it's given
    ],
);

defaultPreferredNameToFirstName({ firstName: 'Han' });
// { fistName: 'Han', preferredName: 'Han' }

defaultPreferredNameToFirstName({ firstName: 'Luke' });
// { fistName: 'Luke', preferredName: 'Luke' }

defaultPreferredNameToFirstName({ firstName: 'Obi-Wan', preferredName: 'Ben' });
// { fistName: 'Han', preferredName: 'Ben' }

/*
 * Ok, we are now combining a few differnt things, lets break it down even more
 *
 * defaultPreferredNameToFirstName({ firstName: 'Han' })
 * - equivalent to
 *   R.apply(
 *     R.assoc('preferredName', R.__, R.__),
 *     [
 *       R.ifElse(
 *        R.prop('preferredName'), // returns undefined
 *        R.prop('preferredName'), // not called
 *        R.prop('firstName'), // return 'Han'
 *       )({ firstName: 'Han' }),
 *       R.identity({ firstName: 'Han' }), // returns { firstName: 'Han' }
 *     ]
 *   );
 *
 * - equivalent to
 *   R.apply(
 *     R.assoc('preferredName', R.__, R.__),
 *     [
 *       'Han'
 *       { firstName: 'Han' }
 *     ]
 *   );
 *
 * - equivalent to
 *     R.assoc('preferredName', 'Han', { firstName: 'Han' });
 *
 */
```

Easy, right?!

## Now You Do It

`npm run lesson7`

Make the tests pass 😀
