# Advanced Arraying

Didn't we just learn about arrays? Well, yes, but now it gets more complicated. This lesson might be the tipping point from "not too bad" to "I have been staring at the same 5 lines of code for two hours and have no idea what's going on". I'll do my best to avoid that, but if it happens, just know it has happened to the best of us.

To start this lesson off, we're going to cover two smaller, easier to understand functions: [R.of](https://ramdajs.com/docs/#of) and [R.concat](https://ramdajs.com/docs/#concat). Then we'll put on our big kid shoes and really start getting into it with [R.map](https://ramdajs.com/docs/#map) and [R.reduce](https://ramdajs.com/docs/#reduce).

## The Easy Stuff

Both of these functions could have been in Lesson 4, but that had enough in it already! So, we'll cover these fairly quickly. [R.of](https://ramdajs.com/docs/#of) is a useful utility function that wraps a value in an array. [R.concat](https://ramdajs.com/docs/#concat) allows you to combine two arrays. Check it out:

```javascript
const R = require('ramda');

R.of('test'); // ['test']
R.of(1); // [1]
R.of(['foo']); // [['foo']]

R.concat([1, 2, 3], [4, 5, 6]); // [1, 2, 3, 4, 5, 6]
R.concat(['foo'], ['bar']); // ['foo', 'bar']

// R.concat also works on strings!
R.concat('foo', 'bar'); // 'foobar'
```

Alright, now that we have that covered, lets start bending some minds 😀

## The Hard Stuff

Mapping and reducing are both concepts that are native to javascript, and Ramda doesn't change much about them. That being said, it doesn't mean mapping or reducing is easy to understand, even if you've worked with it a lot. We'll start with mapping.

### Mapping

[R.map](https://ramdajs.com/docs/#map) allows us to envoke a function against every item in an array, replacing said item with the result of said function. Let's start with some easy examples:

```javascript
const R = require('ramda');

R.map(R.toUpper, ['foo', 'bar']); // ['FOO', 'BAR']

/*
 * As stated above, we have our function, R.toUpper,
 * and our array, ['foo', 'bar']. Then, for every item
 * in the array, we call our function and replace the
 * item with the result of the function. This results
 * in the following calls:
 *
 * R.toUpper('foo') -> return 'FOO'
 * R.toUpper('bar') -> return 'BAR'
 *
 * Lets take a look at some more examples
 */

R.map(R.add(3), [1, 2, 3]); // [4, 5, 6]
R.map(R.prop('firstName'), [
    { firstName: 'Luke', lastName: 'Skywalker' },
    { firstName: 'Han', lastName: 'Solo' },
    { firstName: 'Leia', lastName: 'Organa' },
]); // ['Luke', 'Han', 'Leia']
```

Alright, so we have the basics of mapping, now for some reducing!

### Reducing

[R.reduce](https://ramdajs.com/docs/#reduce) is a little more complicated than mapping. There are three components to a reducer, the reducer function, an accumulator, and an array.

-   Reducer function: accepts two arguments, first if the current value of the accumulator, second is current item from the array. The returned value is the new value of the accumulator
-   Accumulator: initial value of the accumulator
-   Array: the list of values to iterate through

Once all items of the array have been interated through, whatever the value of the accumulator is gets returned. Now that's a lot to digest, so lets look at some examples:

```javascript
const R = require('ramda');

R.reduce(R.add, 0, [1, 2, 3]); // 6

/*
 * Ok, lets break it down:
 * Reducer function = R.add
 * Accumulator = 0
 * Array = [1, 2, 3]
 *
 * Here's what happens:
 * accumulator-      - current array item
 *             \    /
 *        R.add(0, 1) // new accumulator = 1
 *
 * accumulator-      - current array item
 *             \    /
 *        R.add(1, 2) // new accumulator = 3
 *
 * accumulator-      - current array item
 *             \    /
 *        R.add(1, 2) // new accumulator = 6
 *
 * no more items to iterate over:
 * return 6 (current accumulator)
 */

// More Examples
R.reduce(R.concat, '', ['Luke', 'Han', 'Leia']); // 'LukeHanLeia'
R.reduce(R.subtract, 100, [1, 2, 3]); // 94
```

Alright, so it's starting to make sense... kinda. Now it's time to do some combos.

### Map, Filter, Reduce

One of the most common patterns in analysing data is Map -> Filter -> Reduce. We don't have all the tools yet for doing the more complex analytics yet, but we're still going to go through some examples using them:

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

// ok, so now we have some data, lets play with it!

const membersOfSerenity = R.filter(R.propEq('ship', 'Serenity'), people);
const averageAgeOfSerenityCrew = R.compose(
    Math.round,
    R.flip(R.divide)(membersOfSerenity.length),
    R.reduce(R.add, 0),
    R.map(R.prop('age')),
)(membersOfSerenity); // 32
```

Alright, lets break that it down!

1. We start off by filtering our people
   -- [R.propEq](https://ramdajs.com/docs/#propEq) is new, but pretty straight forward:
   it accepts three arguments, the first is the
   name of the prop, the second is the value to
   compare to, and the third is an object. If
   that objects prop equals the value, return true
   otherwise return false
   // the array that gets returned is every item where
   ship === 'Serenity'

2. Then we map over the filtered array, selecting the
   age from each object, so the array goes from
   -- [{ age: 31, ...}, { age: 33, ...}, ...]
   to
   -- [31, 33, ...]

3. Then we reduce that array, starting at 0, adding them up
   -- (((0 + 31) + 33) + ...)

4. Then, our last gotcha, [R.flip](https://ramdajs.com/docs/#flip). R.flip just reverses
   the order of the first two parameters, so:

    - R.subtract(5, 2) === 3
    - R.flip(R.subtract)(5, 2) === R.subtract(2, 5) === -3
      We need to use flip here because we want to divide the
      total by the number of memebers of Serenity, but we dont
      know the total when we start, so we would have
    - R.divide(???, membersOfSerenity.length)
      but we can't do that... yet 😉. So, we just need
      to R.flip our R.divide, so we can pass the known param
      and curry the unknown param

5. Finally, a whole number is friendlier, so we call
   Math.round with the result

Oh boy that was a lot! For starters, lets review all of the functions we just used:

-   [R.map](https://ramdajs.com/docs/#map)
-   [R.filter](https://ramdajs.com/docs/#filter)
-   [R.reduce](https://ramdajs.com/docs/#reduce)
-   [R.compose](https://ramdajs.com/docs/#compose)
-   [R.add](https://ramdajs.com/docs/#add)
-   [R.divide](https://ramdajs.com/docs/#divide)
-   [R.prop](https://ramdajs.com/docs/#prop)
-   [R.propEq](https://ramdajs.com/docs/#propEq)
-   [R.flip](https://ramdajs.com/docs/#flip)

Now we're really starting to make some meaningful compositions! As you may have noticed, we had to seperate out `membersOfSerenity` as we needed to use it twice, in the future we won't have to do that, but that's another lesson 😀

## Now You Do It

`npm run lesson5`

Make the tests pass 😀
