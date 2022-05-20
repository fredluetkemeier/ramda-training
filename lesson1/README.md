# Intro

Welcome to Learn Ramda! To start this off, there are two major tenents of Ramda, immutability and currying. This lesson is designed to make those two ideas go from abstract words to meaningful concepts that you can put into practice.

## Immutable

Def: `An object whose state cannot be modified after it is created`. Who cares? I do! When objects mutate it becomes much harder to know the shape of your data at any given point in time. Consider this code:

```javascript
const myFriends = ['Chewy', 'Luke', 'Lando'];

console.log(myFriends.length); // 3

myFriends.pop();

console.log(myFriends.length); // 2
```

So this mystery person's list of friends changed, I don't see the big deal?? Well, the issue is imagine you wanted to call some function, say `willMyFriendsBetrayMe` and you pass it `myFriends`. Sometimes it would return `true`, sometimes it would return `false` depending on when it was called. In an ideal world `willMyFriendsBetrayMe` will always return the thing.

## Currying

Def: `Currying is the technique of converting a function that takes multiple arguments into a sequence of functions that each take a single argument`. Wat? Ok, so this will take a minute to fully understand, but as a basic example, lets say we have a function that adds two numbers together:

```javascript
const add = (a, b) => {
    return a + b;
};
```

In traditional function definitions (as the example above) you need to know both arguments to call that function:

```javascript
add(1, 2); // 1 + 2 = 3

add(1); // 1 + undefined = NaN
```

But if we curried the function (using Ramda's helpful curry function), then we can build the function as we know the parameters:

```javascript
const R = require('ramda');

const curriedAdd = R.curry((a, b) => {
    return a + b;
});
```

So now if we only know part of the parameters, instead of trying to envoke the function, it will return a new function, patiently waiting for the rest of the parameters:

```javascript
// can still call it with all parameters like before
add(1, 2); // 1 + 2 = 3

const add1 = add(1); // func waiting for second parameter

add1(2); // 1 + 2 = 3
add1(10); // 1 + 10 = 11

add(1)(2); // 1 + 2 = 3
```

Ok, I get it, I get it! (I don't but please stop the torture). Can you please tell me why I'd care?

## Now You Do It

`npm run lesson1`

Make the tests pass 😀
