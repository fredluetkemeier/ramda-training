# Logics

Thus far as we have composed our functions, it's basically been all or nothing. Everything gets `1` added to it or none of it does. In reality though, there are LOTS of times where we might want to conditionaly apply logic within a composition. Today, that's what we're going to focus on.

## New Utils

As these lessons progress, we're going to start introducting more and more utility function. Here are this lessons:

-   [R.T](https://ramdajs.com/docs/#T): Always returs `true`
    -   `() => true`
-   [R.F](https://ramdajs.com/docs/#F): Always returns `false`
    -   `() => false`
-   [R.identity](https://ramdajs.com/docs/#identity): Always returns its first parameter
    -   `(val) => val`
-   [R.always](https://ramdajs.com/docs/#always): Accepts a value, returns a function that always return that value
    -   `(val) => () => val`

## If Else

When a statement is true, do one thing, otherwise, do a different thing. It is well known that this, at it's core, represents all of programming. Unsurprisingly, Ramda has a function to accomplish exactly this idea. [R.ifElse](https://ramdajs.com/docs/#ifElse) accepts three arguments:

1. Condition Predicate function (function `a`)
1. Function called when when condition returns true (function `b`)
1. Function called when when condition returns false (function `c`)

Given these three functions, function `x` is returned. When `x` is called, the condition predicate (function `a`) will be called with the parameters given to `x`, then if `a` returns true, function `b` will be called with those same parameters, otherwise, function `c` will be called with those same parameters. Explanation in code:

```javascript
const R = require('ramda');

const test = R.ifElse(
    R.gt(3), // check if value is greater than 3
    R.add(1), // if so, add 1
    R.multiply(2), // else multiply by 2
);

test(2); // 4
test(3); // 6
test(4); // 5

// if we were to write this ourselves, it would look something like
const myIfElse = R.curry((predFunc, trueFunc, falseFunc) => (...args) => {
    /*
     * given our three functions, we immediately return another function
     * when that other function is called, pass all those arguments to our
     * predicate function
     */
    const passes = predFunc(...args);

    // if our predicate function returns a truthy value
    if (passes) {
        // call our true function with our arguments
        return trueFunc(...args);
    } else {
        // otherwise call our false function with our arguments
        return falseFunc(...arge);
    }
});

// some more examples, using our new utils
const getName = R.ifElse(
    R.prop('name'), // check if the propery of name is truth
    R.prop('name'), // if so, give it to us
    R.always('unknown'), // otherwise, always return 'unknown'
);

getName({ name: 'Luke' }); // 'Luke'
getName({ name: '' }); // 'unknown'
getName({ name: false }); // 'unknown'
getName({}); // 'unknown'

// another example
const setVeryIsOld = R.ifElse(
    R.compose(
        R.flip(R.gt)(100), // need to do flip because we want R.gt(age, 100), not R.gt(100, age)
        R.prop('age'),
    ), // check if "age" is less than 100
    R.assoc('isVeryOld', true), // if so, set isVeryOld to true
    R.identity, // otherwise, do nothing
);

setVeryIsOld({ name: 'Luke', age: 23 }); // { name: 'Luke', age: 23 }
setVeryIsOld({ name: 'Han', age: 32 }); // { name: 'Han', age: 32 }
setVeryIsOld({ name: 'Yoda', age: 900 }); // { name: 'Yoda', age: 900, isVeryOld: true }
```

Ok, hopefully by now you are (at least sorta) getting the picture. In that last example, we used [R.identity](https://ramdajs.com/docs/#identity) because we only wanted to change something when specific criteria was met. This happens quite a lot. Ramda has some helpers for this 😀

## When / Unless

[R.when](https://ramdajs.com/docs/#when) and [R.unless](https://ramdajs.com/docs/#unless): our helpers for when we only want things to happen during one part of our conditional! Basically, instead of taking three functions, like [R.ifElse](https://ramdajs.com/docs/#ifElse), both of these only accept two functions! [R.when](https://ramdajs.com/docs/#when)'s second function will be called when the predicate is truthy, while [R.unless](https://ramdajs.com/docs/#unless)' second function will be called if ithe predicate is falsey. Take a look:

```javascript
const R = require('ramda');

// equivalent of the above example
const setVeryIsOld = R.when(
    R.compose(R.flip(R.gt)(100), R.prop('age')), // check if "age" is less than 100
    R.assoc('isVeryOld', true), // if so, set isVeryOld to true
);

setVeryIsOld({ name: 'Luke', age: 23 }); // { name: 'Luke', age: 23 }
setVeryIsOld({ name: 'Han', age: 32 }); // { name: 'Han', age: 32 }
setVeryIsOld({ name: 'Yoda', age: 900 }); // { name: 'Yoda', age: 900, isVeryOld: true }

// equivalent of the above example
const setVeryIsOld = R.unless(
    R.compose(R.flip(R.lt)(100), R.prop('age')), // check if "age" is less than 100
    R.assoc('isVeryOld', true), // if so, set isVeryOld to true
);

setVeryIsOld({ name: 'Luke', age: 23 }); // { name: 'Luke', age: 23 }
setVeryIsOld({ name: 'Han', age: 32 }); // { name: 'Han', age: 32 }
setVeryIsOld({ name: 'Yoda', age: 900 }); // { name: 'Yoda', age: 900, isVeryOld: true }
```

When the second function is not called for both [R.when](https://ramdajs.com/docs/#when) and [R.unless](https://ramdajs.com/docs/#unless), [R.identity](https://ramdajs.com/docs/#identity) is called, returning the value of the first parameter passed.

## Conditional

Sometimes, you might have more cases than just `true` or `false`. As much fun as it would be to nest [R.ifElse](https://ramdajs.com/docs/#ifElse) functions, [R.cond](https://ramdajs.com/docs/#cond) is a much more friendly solution. [R.cond](https://ramdajs.com/docs/#cond) accepts an array of arrays of functions. That's a lot to read, but will make more sense in an example:

```javascript
const R = require('ramda');

// this example is shamlessly stolen from ramda's docs
const checkWaterTemp = R.cond([
    // if value === 0, return 'water freezes at 0°C'
    [R.equals(0), R.always('water freezes at 0°C')],

    // if value === 100, return 'water boils at 100°C'
    [R.equals(100), R.always('water boils at 100°C')],

    /*
     * because R.T always returns true, the second function will always be called
     * if neither of the above two have been
     */
    [R.T, (temp) => 'nothing special happens at ' + temp + '°C'],
]);

checkWaterTemp(0); // 'water freezes at 0°C'
checkWaterTemp(50); // 'nothing special happens at 50°C'
checkWaterTemp(100); // 'water boils at 100°C'

/*
 * From here it should be clear to see that our inital array contains a list of
 * arrays, which all have a similar structure where the first item is our predicate
 * function and the second item is our function to run when the predicate function
 * returns truthy. The order of the array matters as well, as the predicate functions
 * will be tested in order, and for the first one that returns truthy, it's partner
 * functions result will be what gets returned. Lets do another example thats closer to
 * real life:
 */

let nameIsRedacted = false;
let getName = R.cond([
    [R.always(nameIsRedacted), R.always('name redacted')],
    [R.prop('preferredName'), R.prop('preferredName')],
    [R.T, R.propOr('unknown', 'realName')],
]);

getName({ preferredName: 'Jim Bo', realName: 'James Bond' }); // 'Jim Bo'
getName({ realName: 'James Bond' }); // 'James Bond'
getName({}); // 'unknown'

nameIsRedacted = true;
// we have to remake our getName function for this example because even if we change
// nameIsRedacted, R.always(nameIsRedacted) had already been run, and won't be re-evaluated
getName = R.cond([
    [R.always(nameIsRedacted), R.always('name redacted')],
    [R.prop('preferredName'), R.prop('preferredName')],
    [R.T, R.propOr('unknown', 'realName')],
]);

getName({ preferredName: 'Jim Bo', realName: 'James Bond' }); // 'name redacted'
getName({ realName: 'James Bond' }); // 'name redacted'
getName({}); // 'name redacted'
```

Ok, so now that we have those covered, we're going to start making some more complex and interesting code! Be sure to review previous lessons if you get stuck.

## Now You Do It

`npm run lesson6`

Make the tests pass 😀
