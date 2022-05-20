# Advanced Objecting

If you've gotten this far, good job! You've gotten through the work of it; now it's learning about some very useful functions and how they apply.

## Merging

Merging is used for combining objects. Super useful, especially when wanting default values! There are 5 merge functions we're going to be focusing on:

-   [R.mergeRight](https://ramdajs.com/docs/#mergeRight): The second object overwrites the first
    -   `R.mergeRight(leftObj, rightObj); // { ...leftObj, ...rightObj }`
-   [R.mergeLeft](https://ramdajs.com/docs/#mergeLeft): The first object overwrites the second
    -   `R.mergeRight(leftObj, rightObj); // { ...rightObj, ...leftObj }`
    -   Equivalent to: `R.flip(R.mergeRight);`
-   [R.mergeDeepRight](https://ramdajs.com/docs/#mergeDeepRight): The second object recursively overwrites the first
-   [R.mergeDeepLeft](https://ramdajs.com/docs/#mergeDeepLeft): The first object recursively overwrites the second
    -   Equivalent to: `R.flip(R.mergeDeepRight);`
-   [R.mergeWith](https://ramdajs.com/docs/#mergeWith): Define what happens when a key is encountered in both objects

As you may have noticed, four of them are very similar. First, let's take a look at the most basic merges - [R.mergeRight](https://ramdajs.com/docs/#mergeRight) & [R.mergeLeft](https://ramdajs.com/docs/#mergeLeft):

```javascript
const defaultPerson = { firstName: 'John', lastName: 'Doe' };
const person1 = R.mergeRight(defaultPerson, { firstName: 'Luke', age: 19 });
/* // returns
 * {
 *   firstName: 'Luke', // updated
 *   lastName: 'Doe',
 *   age: 19, // added
 * }
 */

const person2 = R.mergeLeft({ lastName: 'Skywalker' }, defaultPerson);
/* // returns
 * {
 *   firstName: 'John',
 *   lastName: 'Skywalker', // updated
 * }
 */

const defaultOptions = {
    size: 'medium',
    variant: 'default',
    coordinates: {
        x: 0,
        y: 0,
    },
};
const options1 = R.mergeRight(defaultOptions, { variant: 'lightSide', color: 'blue' });
/* // returns
 * {
 *   size: 'medium',
 *   variant: 'lightSide', // updated
 *   coordinates: {
 *     x: 0,
 *     y: 0,
 *   },
 *   color: blue, // added
 * }
 */

const options2 = R.mergeLeft(defaultOptions, { variant: 'lightSide', color: 'green' });
/* // returns
 * {
 *   size: 'medium',
 *   variant: 'default', // not changed because we used mergeLeft
 *   coordinates: {
 *     x: 0,
 *     y: 0,
 *   },
 *   color: 'green', // added
 * }
 */

const options3 = R.mergeRight(defaultOptions, {
    coordinates: {
        x: 120,
        y: 115,
    },
});
/* // returns
 * {
 *   size: 'medium',
 *   variant: 'default',
 *   coordinates: { // updated
 *     x: 115,
 *     y: 120,
 *   },
 * }
 */
```

Ok, so that not too bad! Pretty straight forward, but what if we wanted to only supply one of our coordinates?

```javascript
const defaultOptions = {
    size: 'medium',
    variant: 'default',
    coordinates: {
        x: 0,
        y: 0,
    },
};
const options4 = R.mergeRight(defaultOptions, {
    coordinates: {
        x: 120,
    },
});
/* // returns
 * {
 *   size: 'medium',
 *   variant: 'default',
 *   coordinates: { // updated
 *     x: 120,
 *     // no y coordinate anymore
 *   },
 * }
 */
```

If we want to recursively merge all it all together, then we need to use [R.mergeDeepRight](https://ramdajs.com/docs/#mergeDeepRight)/[R.mergeDeepLeft](https://ramdajs.com/docs/#mergeDeepLeft):

```javascript
const defaultOptions = {
    size: 'medium',
    variant: 'default',
    coordinates: {
        x: 0,
        y: 0,
    },
};
const options5 = R.mergeDeepRight(defaultOptions, {
    coordinates: {
        x: 120,
    },
});
/* // returns
 * {
 *   size: 'medium',
 *   variant: 'default',
 *   coordinates: { // updated
 *     x: 120,
 *     y: 0, // yay, we didn't lose our nested default property 😎
 *   },
 * }
 */
```

Ok, so now what happens if we want to merge things together in a different way? Say, instead of overwriting values, we want to add them toegether if they are a number?

```javacript
const package1 = {
  name: 'good package',
  group: 'packagePrice',
  value: 10,
};
const package2 = {
  name: 'better package',
  group: 'packagePrice',
  value: 20,
};

/* what we want:
 * {
 *   name: 'better package', // from package2
 *   group: 'packagePrice',
 *   value: 30, // package1.value + package2.value
 * }
 */

const combinedPackages1 = R.mergeRight(package1, package2);
/* // returns
 * {
 *   name: 'better package', // from package2
 *   group: 'packagePrice',
 *   value: 20, // from package2
 * }
 *
 * Well, we know this wouldn't work, but how can we make it work?
 * Logically, we want to say, if the value of matched key is a number, add it together, otherwise do what mergeRight does.
 *
 * Let's start with taking a look at mergeWidth, and just get it to do what mergeRight does.
 */

const customMergeRight = R.mergeWith((leftValue, rightValue) => {
  return rightValue;
});

const combinedPackages2 = customMergeRight(package1, package2);
/* // returns
 * {
 *   name: 'better package', // from package2
 *   group: 'packagePrice',
 *   value: 20, // from package2
 * }
 *
 * Cool, so we have something that mimics mergeRight, now for this example, we'll check and see if the left value is a number.
 * If they are, then instead of returning the right value, we'll add them together
 */


const combineOrMergeRight = R.mergeWith((leftValue, rightValue) => {
  if (typeof leftValue === 'number') {
    return leftValue + rightValue;
  }

  return rightValue;
});

const combinedPackages3 = combineOrMergeRight(package1, package2);
/* // returns
 * {
 *   name: 'better package', // from package2
 *   group: 'packagePrice',
 *   value: 30, // from package1.value + package2.value
 * }
 */
```

Awesome! If you wanted to do some special logic depending on the key that is being merged together, you can check out [R.mergeWithKey](https://ramdajs.com/docs/#mergeWithKey).

## Evolving

Evolving objects is a lot of fun, though it can take a second to understand what's going on. Basically though, you can create an object with key value pairs.
The key will match on the keys of the object you wan to evolve, and the value will be the function to enact the evolution. I know that sounds weird, so how about some
examples of how [R.evolve](https://ramdajs.com/docs/#evolve) works instead:

```javascript
const myObject = {
    soundsLike: 'music',
    favoriteThings: ['rain', 'kittens', 'schnitzel'],
    watchCount: 1,
};

const evolvedObject1 = R.evolve(
    {
        soundsLike: R.concat(R.__, '!'),
        watchCount: R.inc,
    },
    myObject,
);
/* // returns
 * {
 *   soundsLike: 'music!', // R.concat('music', '!')
 *   favoriteThings: ['rain', 'kittens', 'schnitzel'], // no change
 *   watchCount: 2, // R.inc(1)
 * }
 */

const evolvedObject2 = R.evolve(
    {
        isBetterThanMerryPoppins: R.always(true), // same as R.T
    },
    myObject,
);
/* // returns
 * {
 *   soundsLike: 'music', // no change
 *   favoriteThings: ['rain', 'kittens', 'schnitzel'], // no change
 *   watchCount: 1, // no change
 *   // isBetterThanMerryPoppins is not added
 * }
 *
 * R.evlove will only affect properties that already exist on the object being evolved, it will never add a new property.
 *
 * Let's take a look at some more examples.
 */

const evolvedObject3 = R.evolve(
    {
        favoriteThings: R.append('ponies'),
    },
    myObject,
);
/* // returns
 * {
 *   soundsLike: 'music', // no change
 *   favoriteThings: ['rain', 'kittens', 'schnitzel', 'ponies'], // R.append('ponies', [...favoritethingsVal]);
 *   watchCount: 1, // no change
 * }
 */

const bingeWatch = R.evolve({
    watchCount: R.add(5),
});

const evolvedObject4 = R.compose(
    bingeWatch, // { ...obj, watchCount: 21 }
    bingeWatch, // { ...obj, watchCount: 16 }
    bingeWatch, // { ...obj, watchCount: 11 }
    bingeWatch, // { ...obj, watchCount: 6 }
)(myObject);
/* // returns
 * {
 *   soundsLike: 'music', // no change
 *   favoriteThings: ['rain', 'kittens', 'schnitzel'], // no change
 *   watchCount: 21, // binge watched 4 times
 * }
 */

// it also works on nested object
const nestedObject = {
    foo: 'bar',
    name: {
        first: '  dirty  ',
        last: ' data    ',
    },
};
const cleaned = R.evolve(
    {
        name: {
            first: R.trim,
            last: R.trim,
        },
    },
    nestedObject,
);
/* // returns
 * {
 *   foo: 'bar',
 *   name: {
 *     first: 'dirty',
 *     last: 'data',
 *   }
 * }
 */
```

Easy peasy 🍋 squeezy!

## To/From Pairs

When talking about pairs, we mean, key/value pairs! The two function in question:

-   [R.toPairs](https://ramdajs.com/docs/#toPairs): Turn on object into an array of key/value array pairs
    -   `R.toPairs({ foo: 'bar' }); // [['foo', 'bar']]`
-   [R.fromPairs](https://ramdajs.com/docs/#fromPairs): Turn an array of key/value array pairs into an object
    -   `R.fromPairs([['foo', 'bar']]); // { foo: 'bar'}`

While this doesn't get used as much as [R.mergeRight](https://ramdajs.com/docs/#mergeRight) or [R.evolve](https://ramdajs.com/docs/#evolve), it can still provide a ron of utility.
Lets look at some examples:

```javascript
const myObj = {
    foo: 'bar',
    hello: 'world',
};

const myObjWithCapitalKeys = R.compose(R.fromPairs, R.map(R.adjust(0, R.toUpper)), R.toPairs)(myObj);
/* // returns
 * {
 *   FOO: 'bar',
 *   HELLO: 'world',
 * }
 *
 * Pretty neat right, but what the heck is actually happening there?
 * Let's take a look in detail:
 */

R.compose(
    // { FOO: 'bar', HELLO: 'world' }
    R.fromPairs, // R.fromPairs([['FOO', 'bar'], ['HELLO', 'world']]);

    /*
     * we are mapping over an array of arrays, with two items in it, so we get:
     *   1. ['foo', 'bar'] -> R.adjust(0, R.toUppder, ['foo', 'bar']) -> ['FOO', 'bar']
     *   2. ['hello', 'world'] -> R.adjust(0, R.toUppder, ['hello', 'world']) -> ['HELLO', 'world']
     */
    R.map(R.adjust(0, R.toUpper)), // R.map(R.adjust(0, T.toUpper), [['foo', 'bar'], ['hello', 'world']])

    /* // returns
     * [
     *   ['foo', 'bar'],
     *   ['hello', 'world']
     * ]
     */
    R.toPairs, // R.toPairs({ foo: 'bar', hello: 'world' })

    // { foo: 'bar', hello: 'world' }
)(myObj);
```

Not too bad, right? As stated earlier, these might not be the most used functions, but it's really nice to have them when you need them. Other uses could be:

-   Re-naming keys
-   Conditionally removing key/value pairs
-   Sorting an object

## Now You Do It

`npm run lesson10`

Make the tests pass 😀
