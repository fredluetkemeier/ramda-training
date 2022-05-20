# Functioning

So ya made it through lesson 1, great job! As you may or may not have learned by now, Ramda is `Functional` javascript library. So, now it's time to start talking about functions. "I already know what functions are" you might be thinking, but here in ramda land we are going to focus on functions that are `Pure` and `Declarative`.

## Pure Functions

Def: `A function which always returns the same values given the same parameters AND has no side effects`. Don't functions usuall return the same thing? What are side effects? Why am I still reading? Good questions, every single one of them! Here are some examples to help illustrate:

```javascript
const people = ['Luke', 'Han', 'Leia'];

/*
 * ❌ - IMPURE
 * The `people` variable might change which
 * means sometimes hasPerson('Leia') will return true
 * and othertimes hasPerson('Leia') will return false.
 */
function hasPerson1(name) {
    if (people.indexOf(name) > -1) {
        return true;
    }

    return false;
}

/*
 * ❌ - IMPURE
 * This is better, because it will always return the
 * same result, given the same parameters. It is not
 * pure though because it has a sideEffect, appending
 * whatever the name variable is to the global people
 * array (which hasPerson1 uses).
 */
function hasPerson2(name, peopleList) {
    people.push(name);

    if (peopleList.indexOf(name) > -1) {
        return true;
    }

    return false;
}

/*
 * ✔ - PURE
 * Always has the same output given
 * the same parameters. No side effects!
 */
function hasPerson3(name, peopleList) {
    if (peopleList.indexOf(name) > -1) {
        return true;
    }

    return false;
}
```

Why should functions be pure? Because then they are predictable and make code easier to debug. While striving for purity is good, impurity is an inherent part of any application worth a damn. For example, all network calls are impure. What's important is to try and have a strong seperation of concerns between your pure and impure functions.

## Declarative Functions

Def: `A function which expresses its logic without describing its control flow`. Now that's a dense definition! Probably the most wellknown declarative language is SQL. You tell it `SELECT * FROM my_data`. You don't tell it
how to do that, just figure it out and give it to me. Ok... what does any of this have to do with anything? Well,
as we try to make our code more `Functional`, we are going to be using more, smaller functions! For this to work,
those functions need to describe that they are doing. Let's take a look at our hasPerson example from above, combine
it with what we learned about currying, and see what happens.

```javascript
// Cool, we have a curried pure function
const hasPerson = R.curry((name, peopleList) => {
    if (peopleList.indexOf(name) > -1) {
        return true;
    }

    return false;
});

const hasLuke = hasPerson('Luke');
const hasHan = hasPerson('Han');
const hasLeia = hasPerson('Leia');
```

Now we have a few functions, all of which describe what they do, the last three of which are created by providing just one argument to a function which accepts two arguments. This style of building functions off of other functions will take some time to get used to, but allows for very reusable code that is also easy to read!

## Composing and Piping

Finally, getting to the Ramda specific part of things. [R.compose](https://ramdajs.com/docs/#compose) and [R.pipe](https://ramdajs.com/docs/#pipe) are both Ramda functions which accept a list of functions, passing the result of one function to another. It's ok if that sounds confusing, hopefully these examples will help clear it up for you:

```javascript
const R = require('ramda');

// First, lets create some basic, declarative functions
const add = R.curry((a, b) => a + b);
const multiply = R.curry((a, b) => a * b);
const double = multiply(2);

/*
 * Now, we are going to create a function without using the ramda helpers,
 * a function using compose, and a function using pipe. All three functions
 * will do the same thing:
 *
 * multiply gets called with 10,
 * and the result of double,
 * which gets called with 1 and our variable, x
 */
const plusOneThenDoubleThenTimesTen1 = (x) => (
  multiply(
    10,
    double(
      add(1, x)
    )
  )
);
const plusOneThenDoubleThenTimesTen2 = (x) => {
  const added1 = add(1, x);
  const doubled = double(added1);
  const multiplied = multiply(10, doubled);

  return multiplied
};

const plusOneThenDoubleThenTimesTen3 = (x) => R.pipe(
  add(1),
  double,
  multiply(10)
)(x);

const plusOneThenDoubleThenTimesTen4 = (x) => R.compose(
  multiply(10)
  double,
  add(1),
)(x);

/*
 * Now, as some of you might have noticed, we can simplify our
 * pipe and compose examples as follows:
 */

const plusOneThenDoubleThenTimesTen5 = R.pipe(
  add(1),
  double,
  multiply(10)
);

const plusOneThenDoubleThenTimesTen6 = R.compose(
  multiply(10)
  double,
  add(1),
);
```

All five of these functions are doing the exact same thing. When using [R.pipe](https://ramdajs.com/docs/#pipe), the input data will be passed to the first function, then the result of the first data will be passed to the second function, and so on down the list. [R.compose](https://ramdajs.com/docs/#compose) acts in the same way, except that data is first passed to the **LAST** function, moving up the chain.

## Tapping

While we strive to keep our functions pure, we sometimes require that impurity. Especially when debugging. [R.tap](https://ramdajs.com/docs/#tap) is a function whose first argument is a function, and second argument is a value. It will call the first argument with the second argument, then return the second argument. A clear example:

```javascript
const R = require('ramda');

// this is, functionally, what R.tap looks like
const tap = R.curry((func, val) => {
  func(val);

  return val;
});

// Good uses for it, logging!
R.pipe(
  R.tap(console.log), // 2
  add(1),
  R.tap(console.log), // 3
  double,
  R.tap(console.log), // 6
  multiply(10)
  R.tap(console.log), // 60
)(2);
```

Because [R.tap](https://ramdajs.com/docs/#tap) (like all Ramda functions by default) is curried, we can pass it `console.log` to `R.tap`, then whenever a value is provided, it will log it out, then pass that value along to the next function. If we wanted to do that with our first example, it would look something like this:

```javascript
const plusOneThenDoubleThenTimesTen = (x) => {
    console.log(x);
    const added1 = add(1, x);
    console.log(added1);
    const doubled = double(added1);
    console.log(doubled);
    const multiplied = multiply(10, doubled);
    console.log(multiplied);

    return multiplied;
};
```

### Bonus

The add and multiply functions we made are actually already part of Ramda:

-   [R.add](https://ramdajs.com/docs/#add)
-   [R.multiply](https://ramdajs.com/docs/#multiply)

Other helpful functions in the same vein:

-   [R.subtract](https://ramdajs.com/docs/#subtract)
-   [R.divide](https://ramdajs.com/docs/#divide)
-   [R.inc](https://ramdajs.com/docs/#inc)
-   [R.dec](https://ramdajs.com/docs/#dec)

## Now You Do It

`npm run lesson2`

Make the tests pass 😀
