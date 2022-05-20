# Arraying

Objects are cool and all, but I usually have a lot of them. For this lesson, we're going to focus on (as you really should have guessed by now) arrays! Specifically, selecting from arrays and modifying them.

## Selecting Specific Items

There are lot's of times when you want to select a specific item from an array. This is quite easy to do, using [R.nth](https://ramdajs.com/docs/#nth). Give it an index, and boom, that item is returned.

```javascript
const R = require('ramda');

const arr = ['red', 'blue', 'green'];

R.nth(0, arr); // 'red'
R.nth(1, arr); // 'blue'
R.nth(2, arr); // 'green'
```

You can also give it negative numbers to go backwards:

```javascript
const R = require('ramda');

const arr = ['red', 'blue', 'green'];

R.nth(-3, arr); // 'red'
R.nth(-2, arr); // 'blue'
R.nth(-1, arr); // 'green'
```

The majority of the time, people want the first or last items from an array. Lucky for us, Ramda has two little helpers for that: [R.head](https://ramdajs.com/docs/#head) and [R.last](https://ramdajs.com/docs/#last).

```javascript
const R = require('ramda');

const arr = ['red', 'blue', 'green'];

R.head(arr); // 'red'
R.nth(1, arr); // 'blue'
R.last(arr); // 'green'
```

Easy peasy 😀

## Selecting Multiple Items

What if you didn't want just one item from the array, but wanted multiple of them? You're in luck! While there are a LOT of ways to do this, we're just going to focus on a few for this lesson.

### Taking

Take what you want and move on! [R.take](https://ramdajs.com/docs/#take) allows you create an array of the first `x` elements, like so:

```javascript
const R = require('ramda');

const arr = ['red', 'blue', 'green'];

R.take(1, arr); // ['red']
R.take(2, arr); // ['red', 'blue']
```

Sometimes you want to take from the back though, which you can do using [R.takeLast](https://ramdajs.com/docs/#takeLast)

```javascript
const R = require('ramda');

const arr = ['red', 'blue', 'green'];

R.takeLast(1, arr); // ['green']
R.takeLast(2, arr); // ['blue', 'green']
```

Alright, so taking things is easy, but what if instead of knowing what I want, I only know what I DON'T want...

### Dropping

When you just want to lose the dead weight, you can use [R.drop](https://ramdajs.com/docs/#drop)! Just like [R.take](https://ramdajs.com/docs/#take) it's first parameter is a number and the second one is an array, but instead of returning an array of those items, it will return an array without them! Check it out:

```javascript
const R = require('ramda');

const arr = ['red', 'blue', 'green'];

R.drop(1, arr); // ['blue', 'green']
R.drop(2, arr); // ['green']
```

Also just as [R.take](https://ramdajs.com/docs/#take) has [R.takeLast](https://ramdajs.com/docs/#takeLast), [R.drop](https://ramdajs.com/docs/#drop) has [R.dropLast](https://ramdajs.com/docs/#dropLast) 😎

```javascript
const R = require('ramda');

const arr = ['red', 'blue', 'green'];

R.dropLast(1, arr); // ['red', 'blue']
R.dropLast(2, arr); // ['red']
```

💥Boom💥! You can now select the known and unknown! As long as they're all next to eachother... Probably more often than not, they aren't, and beyond that you usually don't just want `x` items from an array, you usually want all items that match some criteria.

### Filtering

If you're a programmer, you're probably pretty familiar with how filtering works. For each item in an array, you run it through a function and if it returns `true` you take it and if it returns `false` you drop it. Ramda's [R.filter](https://ramdajs.com/docs/#filter) is no different, but now the functions tell you what they're filtering on instead of you writing out the logic.

First, some utils we'll use in filtering. These functions are pretty straight forward and they're own documentation does a good enough job of describing them. I'll list them here for reference, but won't dive into them.

-   [R.equals](https://ramdajs.com/docs/#equals)
-   [R.includes](https://ramdajs.com/docs/#includes)
-   [R.gt](https://ramdajs.com/docs/#gt)
-   [R.lt](https://ramdajs.com/docs/#lt)

Ok, now for some filtering examples:

```javascript
const R = require('ramda');

const numArr = [1, 2, 3, 3, 4, 5, 6, 7];

R.filter(R.equals(3), numArr); // [3, 3]
R.filter(R.gt(3), numArr); // [1, 2]
R.filter(R.lt(3), numArr); // [4, 5, 6, 7]

const wordArr = ['fooing', 'baring', 'biz', 'baz'];

R.filter(R.equals('f'), wordArr); // []
R.filter(R.includes('f'), wordArr); // ['foo']
R.filter(R.includes('a'), wordArr); // ['bar', 'baz']
R.filter(R.includes('bi'), wordArr); // ['bi']
R.filter(R.includes('ing'), wordArr); // ['fooing', 'baring']
```

Alright, now that we got THAT under control, lets start adding and chaning items in our arrays!

## Modifying Arrays

With our various selecting methods, we can get item(s) but sometimes we actually want to change things up. Time to create some newer, cooler arrays than ever before!

### Adding Items

It's a common task to need to add an item to an array. This can be done with ease using [R.insert](https://ramdajs.com/docs/#insert). Just give it an index, and item, and an array, then 💥! You got a new array with that item in that spot:

```javascript
const R = require('ramda');

const arr = ['red', 'blue', 'green'];

R.insert(0, 'purple', arr); // ['purple', 'red', 'blue', 'green']
R.insert(1, 'purple', arr); // ['red', 'purple', 'blue', 'green']
R.insert(2, 'purple', arr); // ['red', 'blue', 'purple', 'green']
R.insert(3, 'purple', arr); // ['red', 'blue', 'green', 'purple']
```

You can also use a negative index to work back to front 😎

```javascript
const R = require('ramda');

const arr = ['red', 'blue', 'green'];

R.insert(-4, 'purple', arr); // ['purple', 'red', 'blue', 'green']
R.insert(-3, 'purple', arr); // ['red', 'purple', 'blue', 'green']
R.insert(-2, 'purple', arr); // ['red', 'blue', 'purple', 'green']
R.insert(-1, 'purple', arr); // ['red', 'blue', 'green', 'purple']
```

And seeing as you are almost always going to be adding things to very front or very back of an array, we have [R.prepend](https://ramdajs.com/docs/#prepend) and [R.append](https://ramdajs.com/docs/#append).

```javascript
const R = require('ramda');

const arr = ['red', 'blue', 'green'];

R.prepend('purple', arr); // ['purple', 'red', 'blue', 'green']
R.append('purple', arr); // ['red', 'blue', 'green', 'purple']
```

Neat-O! Now lets change some of those items up 😀

### Changing Items

Almost done! Last thing to learn for this lesson is how to change an item itself. For starters, we'll use [R.update](https://ramdajs.com/docs/#update). It works very similarily to [R.insert](https://ramdajs.com/docs/#insert), except that it replaces the item at that index with the value instead of just moving it. Take a look:

```javascript
const R = require('ramda');

const arr = ['red', 'blue', 'green'];

R.update(0, 'purple', arr); // ['purple', 'blue', 'green']
R.update(1, 'purple', arr); // ['red', 'purple', 'green']
R.update(2, 'purple', arr); // ['red', 'blue', 'purple']
```

And don't you worry, it can also go backwards

```javascript
const R = require('ramda');

const arr = ['red', 'blue', 'green'];

R.update(-3, 'purple', arr); // ['purple', 'blue', 'green']
R.update(-2, 'purple', arr); // ['red', 'purple', 'green']
R.update(-1, 'purple', arr); // ['red', 'blue', 'purple']
```

Sometimes, often even, we want to modify an item instead of replacing it. [R.adjust](https://ramdajs.com/docs/#adjust) will allow us to do just that! Instead of a value for the second parameter, it takes a function. It will then pass the item at said index to that function, and the returned value will be the new value at that index. If this sounds familiar, that's because it is! We did the same concept with objects using [R.over](https://ramdajs.com/docs/#over). Here's some examples:

```javascript
const R = require('ramda');

const numArr = [1, 2, 3];

R.adjust(0, R.inc, numArr); // [2, 2, 3]
R.adjust(1, R.add(2), numArr); // [1, 4, 3]
R.adjust(2, R.multiply(3), numArr); // [1, 2, 9]

const wordArr = ['red', 'blue', 'green'];

R.adjust(0, R.toUpper, wordArr); // ['RED', 'blue', 'green']
R.adjust(1, R.toUpper, wordArr); // ['red', 'BLUE', 'green']
R.adjust(2, R.toUpper, wordArr); // ['red', 'blue', 'GREEN']
```

## Now You Do It

`npm run lesson4`

Make the tests pass 😀
