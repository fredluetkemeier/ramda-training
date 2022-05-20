# Advanced Currying

Currying was one of the first topics we discussed. Now, we're going to look a little more in depth at how it works and the gotchas that surround it.

## Function Arity

A functions `arity` is the number of parameters it takes. For example, [R.add](https://ramdajs.com/docs/#add) has an `arity` of **two**. It accepts two arguments, the first and the second number to add; `R.add(1, 2) === 3`. Because it is a curried function, if we just supplied one parameter, it would return a function, waiting for the second argument.

What happens when we don't want all the arguments curried by default, like ramda so often likes to do?

## Specifying Arity

Lucky for us, it's easy to specify the arity of any function with [R.nAry](https://ramdajs.com/docs/#nAry)! Let's learn through some examples:

```javascript
const R = require('ramda');

function fullName(firstName, lastName) {
    return `${firstName} ${lastName}`;
}

fullName('Han', 'Solo'); // 'Han Solo'

const ignoreLastName = R.nAry(1, fullName);

ignoreLastName('Han', 'Solo'); // 'Han undefined'

/*
 * R.nAry will return a function which only accepts the specified
 * number of arguments, and disregards the rest. Some more examples:
 */

R.nAry(1, R.add)(1, 2); // What do you think will happen here

/*
 * I'll give you a second...
 *
 * what gets returned...
 *
 * is...
 *
 * a function!
 *
 * calling:
 *   R.nAry(1, R.add)(1, 2)
 * is the same as calling:
 *   R.add(1)
 *
 * lets take a look under the hood:
 */

function ourNAryFunc(arity, func) {
    // what actually happens is much better than this,
    // but I think this illustrates what's happening best
    if (arity === 1) {
        return (a) => func(a);
    }

    if (arity === 2) {
        return (a, b) => func(a, b);
    }

    if (arity === 3) {
        return (a, b, c) => func(a, b, c);
    }

    if (arity === 4) {
        return (a, b, c, d) => func(a, b, c, d);
    }
}

/*
 * So, when we call R.nAry(1, R.add)(1, 2), it's broken down
 * like this:
 *
 * R.nAry(1, R.add)
 * is equivalent to: ((a) => R.add(a))
 *
 * which means anything beyond the first parameter is ignored
 * but, R.add is still a curried function, so when it gets called
 * with only one parameter, it's still going to return a function
 * waiting for that second parameter.
 */
```

Now let's look at more "close to life" use case:

```javascript
const R = require('ramda');

/*
 * We're going to start with an example where we want to be able
 * to pass it one parameter, and it returns an array of the curried
 * functions. Inital though might look something like:
 */
let getAddAndMultplyBy = R.juxt([R.add, R.multiply]);

/*
 * But that's not going to give us what we want. Instaed, it would return
 * a curried function, waiting for the second parameter to suplly to both
 * our add and multiply function. Take a look:
 */

const addAndMultiplyByFive = getAddAndMultplyBy(5); // returns a function
addAndMultiplyByFive(2); // [7, 10]

/*
 * What we're after though is for getAddAndMultplyBy(5) to return an array
 * of our curried functions! We want to be able to do this:
 *
 * const [add5, times5] = getAddAndMultplyBy(5);
 *
 * and then use the add5 and times5 functions as we please. This isn't
 * happening because R.juxt assums we want All our parameters before
 * supplying them to our functions. So, we must specify that these
 * functions are only reliant on one parameter:
 */
getAddAndMultplyBy = R.juxt([R.nAry(1, R.add), R.nAry(1, R.multiply)]);

const [add5, times5] = getAddAndMultplyBy(5); // [R.add(5, R.__), R.multiply(5, R.__)]

add5(2); // 7
add5(6); // 11
times5(5); // 25
times5(11); // 55
```

We did it 😅! Often times, we want to specify that a function has an `arity` of `1` or 2`, so ramda has some little helpers for that:

-   [R.unary](https://ramdajs.com/docs/#unary): equal to R.nAry(1)
-   [R.binary](https://ramdajs.com/docs/#binary): equal to R.nAry(2)

## Variadic Functions

A `variadic function` is a function that has an unknown `arity`. When we don't know a functions `arity`, we don't know how many arguments to wait for when `currying`. Let's review an example from lesson 1:

```javascript
const R = require('ramda');

const add = (a, b) => {
    return a + b;
};

// could also be written as:
// const curriedAdd = R.curry(add);
const curriedAdd = R.curry((a, b) => {
    return a + b;
});

add(1); // NaN: 1 + undefined = NaN
curriedAdd(1); // func waiting for 2nd number
curriedAdd(1)(2); // 3
```

Ok, so we have our "add" function, which accepts two parameters, and therefore has an `arity` of two. When then create "curriedAdd" by calling [R.curry](https://ramdajs.com/docs/#curry) with that function. [R.curry](https://ramdajs.com/docs/#curry) sees that that the function passed to it has an `arity` of two, and returns a new funcion which, if only supplied one parameter, will now return another function waiting for that second parameter.

Now let's create a `variadic` add function, which just adds all of the numbers passed to it!

```javascript
const R = require('ramda');

const variadicAdd = (...args) => {
    /*
     * ...args puts all arguments into an array when then
     * reduce that array using ramdas  add function
     */
    return R.reduce(R.add, 0, args);
};

variadicAdd(1); // 1
variadicAdd(1, 2); // 3
variadicAdd(1, 2, 3); // 6
variadicAdd(1, 2, 3, 4); // 10

/*
 * you can pass variadicAdd any number of parameters
 * and it will just keep adding them up. So what happens
 * if we want to curry it?
 */

const curriedVariadicAdd = R.curry(variadicAdd);

curriedVariadicAdd(1); // 1
curriedVariadicAdd(1, 2); // 3
curriedVariadicAdd(1, 2, 3); // 6
curriedVariadicAdd(1, 2, 3, 4); // 10
```

Well, that's not very helpful now is it? This is where [R.curryN](https://ramdajs.com/docs/#curryN) comes in! [R.curryN](https://ramdajs.com/docs/#curryN) lets us specify the number of arguments to `curry` over. Let's put it into practice:

```javascript
const R = require('ramda');

const variadicAdd = (...args) => {
    return R.reduce(R.add, 0, args);
};

// the first argument to R.curryN tells us how many arguments to curry
const addAtLeastTwoNumbers = R.curryN(2, variadicAdd);

addAtLeastTwoNumbers(1); // returns a function waiting for a second param
addAtLeastTwoNumbers(1, 2); // 3
addAtLeastTwoNumbers(1)(2); // 3
addAtLeastTwoNumbers(1, 2, 3); // 6
addAtLeastTwoNumbers(1)(2, 3); // 6

const addAtLeastThreeNumbers = R.curryN(3, variadicAdd);

addAtLeastTwoNumbers(1); // returns a function waiting for a second and third param
addAtLeastTwoNumbers(1, 2); // returns a function waiting for a third param
addAtLeastTwoNumbers(1)(2); // returns a function waiting for a third param
addAtLeastTwoNumbers(1, 2, 3); // 6
addAtLeastTwoNumbers(1)(2)(3); // 6
addAtLeastTwoNumbers(1, 2, 3, 4); // 10
addAtLeastTwoNumbers(1)(2, 3, 4); // 10
addAtLeastTwoNumbers(1)(2)(3, 4); // 10
addAtLeastTwoNumbers(1)(2)(3)(4); // Error: addAtLeastThreeNumbers(...)(...)(...) is not a function

/*
 * we get an error on that last one because we are only currying 3
 * arguments, once that third argument is fulfilled, we're going
 * call variadicAdd with all the arguments we have. Lets break it down:
 *
 * addAtLeastTwoNumbers(1)(2)(3)(4) is the same as
 *
 * const hasOneParam = addAtLeastTwoNumbers(1);
 * const hasTwoParams = hasOneParam(2);
 * const hasThreeParam = hasTwoParams(3);
 * const hasFourParams = hasThreeParam(4);
 *
 * hasOneParam == function waiting for second and third param
 * hasTwoParams == function waiting for third param
 * hasThreeParam == 6
 * hasFourParams == 6(4) // the number 6 isn't a function, so we get an error!
 */
```

Now that we have have learned about `arity` and `veriadic` function and how to `curry` them, it's time to drive home the point a bit more:

```javascript
const R = require('ramda');

const variadicAdd = (...args) => {
    return R.reduce(R.add, 0, args);
};

// Now, we're going to specify the arity of our variadicAdd, and do a little quiz
const addTwoNumbers = R.binary(variadicAdd); // same as R.nAry(2, variadicAdd)

// alright, quiz time!
const a = addTwoNumbers(1);
const b = addTwoNumbers(1, 2);
const c = addTwoNumbers(1, 2, 3);

/*
 * once you have written down what a, b, and c equals, scroll down!
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * don't worry, I'll wait
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * are those your final answers?
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * See how you did!
 *
 * a = NaN
 * b = 3
 * c = 3
 *
 * Let's break it dowm!
 *
 * const addTwoNumbers = R.binary(variadicAdd)
 *   - we create a function whose arity is two
 *   - but we are not currying it
 *
 * const a = addTwoNumbers(1) // NaN
 *   - addTwoNumbers is not a curried function, so even though it's arity is 2
 *     when only passed a single argument, the second argument is set to undefined
 *
 * const b = addTwoNumbers(1, 2); // 3
 *   - you should have gotten this one right :P
 *
 * const c = addTwoNumbers(1, 2, 3); // 3
 *   - because we specify the arity to two, all other arguments are discarded
 *
 *
 *
 * Awsome! Now, remeber how R.curry(variadicAdd) did virtually nothing? Well, now
 * that we have an arity specified, we can curry that function no problem!
 */

const curriedAddTwoNumbers = R.curry(addTwoNumbers);

// Now, this behaves the same as R.add;
curriedAddTwoNumbers(1); // returns function waiting for second parameter
curriedAddTwoNumbers(1, 2); // 3
curriedAddTwoNumbers(1, 2, 3); // 3
```

Easy, right 😎?! Lets review the keys take aways from this one:

-   `Variadic` is just a fancy word to say a function takes `n` arguments
-   [R.nAry](https://ramdajs.com/docs/#nAry) let's you specify the `arity` of ANY function
    -   great when dealing with auto curried functions that assume you want all arguments supplied before continuing
-   [R.curryN](https://ramdajs.com/docs/#curryN) lets you specify how many arguments to curry for ANY function, but especially useful for `variadic` functions
    -   What would happen if you do R.curryN(3, R.add)??

## Now You Do It

`npm run lesson9`

Make the tests pass 😀
