# Objecting

Alright, so now we're composing our curried, pure, declarative functions like a pro! Now if only we could do something useful with them. Like seriously, how often will I just chain together math equations. Fear not! We're now (starting) to get to the useful stuff.

For this lesson, we're going to be focusing on how to access and update values on objects (and sometimes arrays).

## Props

Well start with our basic object properties. As is need fairly often, there are easy functions for reading and setting the properties of an object.

-   [R.prop](https://ramdajs.com/docs/#prop)
    -   Used to access an objects property
    -   Accepts two parameters: key (string | number), and an object.
    -   Returns object[key]
-   [R.assoc](https://ramdajs.com/docs/#assoc)
    -   Used to set an objects property
    -   Accepts three parameters: key (string | number), value (any), and an object
    -   Returns a new object with the updated value

```javascript
const R = require('ramda');

const testObject = {
    foo: 'bar',
    hello: 'world',
    count: 1,
};
const fooProp = R.prop('foo');

fooProp(testObject); // 'bar'
R.prop('hello', testObject); // 'world'
R.prop('baz', testObject); // undefined

R.compose(R.add(1), R.prop('count'))(testObject); // 2

R.assoc('foo', 'baz', testObject);
// { foo: 'baz', hello: 'world', count: 1 }

R.assoc('name', 'test', testObject);
// { foo: 'bar', hello: 'world', count: 1, name: 'test' }
```

See, easy peasy!

## Paths

Paths are very similar to props, but instead of the first parameter being a key, its not a path to a key. This means instead of being a string or a number, its now an array of strings or numbers. If you wanted, you could always use [R.path](https://ramdajs.com/docs/#path) and [R.assocPath](https://ramdajs.com/docs/#assocPath) instead of their `prop` counterparts.

```javascript
const R = require('ramda');

const testObject = {
    foo: 'bar',
    hello: 'world',
    count: 1,
    nested: {
        arr: ['stuff'],
    },
};
const fooProp = R.path(['foo']);

fooProp(testObject); // 'bar'
R.path(['hello'], testObject); // 'world'
R.path(['baz'], testObject); // undefined
R.path(['nested', 'arr', 0], testObject); // stuff

R.compose(R.add(1), R.path(['count']))(testObject); // 2

R.assocPath(['foo'], 'baz', testObject);
/*{
  foo: 'baz',
  hello: 'world',
  count: 1,
  nested: {
    arr: ['stuff']
  }
}*/

R.assocPath(['name'], 'test', testObject);
/*{
  foo: 'bar',
  hello: 'world',
  count: 1,
  nested: {
    arr: ['stuff']
  },
  name: 'test'
}*/

R.assocPath(['nested', 'arr', 1], 'things', testObject);
/*{
  foo: 'bar',
  hello: 'world',
  count: 1,
  nested: {
    arr: ['stuff', 'things']
  }
}*/
```

## Lenes

Lenses might seem a bit pointless at first, but they're actually pretty neat. So, what is a lense? Ramdas exact words to describe [R.lens](https://ramdajs.com/docs/#lens):

> Returns a lens for the given getter and setter functions. The getter "gets" the value of the focus; the setter "sets" the value of the focus. The setter should not mutate the data structure.

Not super helpful actually, basically, it's a short hand to combine some very common patterns. For example, consider the following:

```javascript
const R = require('ramda');

const obj = { x: 'foo' };
const viewX = R.prop('x');
const setX = R.assoc('x');
```

`viewX` is a getter, and `setX` is a setter. We can combine those with a lens as such:

```javascript
const R = require('ramda');

const obj = { x: 'foo' };
const xLens = R.lens(R.prop('x'), R.assoc('x'));
```

Now to use it, we need to check out [R.view](https://ramdajs.com/docs/#view), [R.set](https://ramdajs.com/docs/#set), and [R.over](https://ramdajs.com/docs/#over) (this is where lenses become really useful).

As you may have guessed:

-   [R.view](https://ramdajs.com/docs/#view) will return a value
-   [R.set](https://ramdajs.com/docs/#set) will set a value

But the shining start, [R.over](https://ramdajs.com/docs/#over)! [R.over](https://ramdajs.com/docs/#over) allows you to update a value via a function instead of just giving it a raw value, making it a ton simpler to do even complex updates (but it always returns a new object, so we're still mutation free 😎).

Lets do some examples:

```javascript
const R = require('ramda');

const obj = { x: 'foo' };
const xLens = R.lens(R.prop('x'), R.assoc('x'));

R.view(xLens, obj); // 'foo'
R.set(xLens, 'bar', obj); // { x: 'bar' }
R.over(xLens, R.toUpper, obj); // { x: 'FOO' }
```

See how neat that use of [R.over](https://ramdajs.com/docs/#over) is?? Let's look at that example again with some more expanation, then some other examples:

```javascript
const R = require('ramda');

const obj = { x: 'foo' };
const xLens = R.lens(R.prop('x'), R.assoc('x'));

R.over(xLens, R.toUpper, obj); // { x: 'FOO' }
/*
 * R.toUpper is a function that accepts
 * a string an returns the upper cased
 * variant of it
 *
 * So, the following code is equivalent
 */

R.assoc('x', R.toUpper(R.prop('x', obj)), obj);
/*
 * That's WAY harder to parse out whats
 * going on, plus if we want to use it with
 * R.compose or R.pipe, we need to pass
 * obj twice which we don't even know how
 * to do yet (unless we stop using
 * declarative functions and inline one instead)
 */

// Some more R.over examples
R.over(xLens, R.add(1), obj); // { x: NaN }
/*
 * ramda does not allow to add strings and numbers
 * so R.add(1, 'foo') is NaN
 */

R.over(xLens, R.prop('length'), obj); // { x: 3 }
// 'foo'.length === 3

R.over(xLens, R.prop(0), obj); // { x: 'f' }
// 'foo'[0] === 'f'
```

See how fun that is! Now, you'll probably see yourself doing that same exact pattern of [R.prop](https://ramdajs.com/docs/#prop) being your getter and [R.assoc](https://ramdajs.com/docs/#assoc) being your setter every time you are wanting to use [R.lens](https://ramdajs.com/docs/#lens) for a property.

Additionally, you may have concluded that you could replace [R.prop](https://ramdajs.com/docs/#prop) and [R.assoc](https://ramdajs.com/docs/#assoc) with [R.path](https://ramdajs.com/docs/#path) and [R.assocPath](https://ramdajs.com/docs/#assocPath) respectively and now you can really dig into objects!

Well guess what, all that repetition can be quite annoying, so Ramda has you covered:

-   [R.lensProp](https://ramdajs.com/docs/#lensProp)
-   [R.lensPath](https://ramdajs.com/docs/#lensPath)

These short hands only require the argument you'd give to the others, as such:

```javascript
const R = require('ramda');

const obj = { x: 'foo', y: { z: 'baz' } };
const xLens = R.lensProp('x');
const yZLens = R.lensPath(['y', 'z']);

R.view(xLens, obj); // 'foo'
R.set(xLens, 'bar', obj); // { x: 'bar', y: { z: 'baz' }  }
R.over(xLens, R.toUpper, obj); // { x: 'FOO', y: { z: 'baz' }  }

R.view(yZLens, obj); // 'foo'
R.set(yZLens, 'bar', obj); // { x: 'foo', y: { z: 'bar' }  }
R.over(yZLens, R.toUpper, obj); // { x: 'foo', y: { z: 'BAZ' }  }
```

Generally speaking, you'll usually just use [R.lensProp](https://ramdajs.com/docs/#lensProp) and [R.lensPath](https://ramdajs.com/docs/#lensPath), but it's good to have a basic understanding of how to make them!

## Defaults

Another secion, seriously?? I promise this one will be quick! There are a lot of times that you want to default a value if it doesn't exist, so Ramda has some nice delcarative functions to do that for us:

-   [R.defaultTo](https://ramdajs.com/docs/#defaultTo)
-   [R.propOr](https://ramdajs.com/docs/#propOr)
-   [R.pathOr](https://ramdajs.com/docs/#pathOr)

Examples:

```javascript
const R = require('ramda');

R.defaultTo('defaultValue', 'foo'); // 'foo'
R.defaultTo('defaultValue', []); // []
R.defaultTo('defaultValue', 0); // 0
R.defaultTo('defaultValue', ''); // ''
R.defaultTo('defaultValue', null); // 'defaultValue'
R.defaultTo('defaultValue', undefined); // 'defaultValue'

const obj = {
    x: 'foo',
    y: { z: 'baz' },
    empty: [],
    zero: 0,
    blank: '',
    nil: null,
};

R.propOr('defaultValue', 'x', obj); // 'foo'
R.propOr('defaultValue', 'empty', obj); // []
R.propOr('defaultValue', 'zero', obj); // 0
R.propOr('defaultValue', 'blank', obj); // ''
R.propOr('defaultValue', 'nil', obj); // 'defaultValue'
R.propOr('defaultValue', 'other', obj); // 'defaultValue'

R.pathOr('defaultValue', ['y', 'z'], obj); // 'baz'
R.pathOr('defaultValue', ['empty'], obj); // []
R.pathOr('defaultValue', ['zero'], obj); // 0
R.pathOr('defaultValue', ['blank'], obj); // ''
R.pathOr('defaultValue', ['nil'], obj); // 'defaultValue'
R.pathOr('defaultValue', ['other'], obj); // 'defaultValue'
```

## Now You Do It

`npm run lesson3`

Make the tests pass 😀
