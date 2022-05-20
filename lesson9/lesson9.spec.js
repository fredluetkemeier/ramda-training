const R = require('ramda');

function concatAll(...args) {
  return R.reduce(R.concat, '', args);
}

describe('Arity and Variadic', () => {
  it.each([
    ['test', ['foo'], ['foo', 'test'], ['test', 'foo']],
    [false, [true], [true, false], [false, true]],
  ])('Case %#: should return an array of curried functions', (value, arr, expectedAppend, expectedPrepend) => {
    const makeAppendAndPrepend = R; // your work here
    const [appendValueToArr, prependValueToArr] = makeAppendAndPrepend(value);
    const appendRes = appendValueToArr(arr);
    const prependRes = prependValueToArr(arr);

    expect(appendRes).toEqual(expectedAppend);
    expect(prependRes).toEqual(expectedPrepend);
  });

  xit.each([
    [['foo', 'bar', 'baz'], 'foobarbaz'],
    [['foo', 'bar', 'baz', 'biz'], 'foobarbaz'],
  ])('Case %#: should concat only the first three words', (words, expected) => {
    // use the concatAll function above
    const concatFirstThree = R; // your work here
    const res = concatFirstThree(...words);

    expect(res).toEqual(expected);
  });

  xit('should curry three parameters for concatAll', () => {
    const curriedConcatAll = R; // your work here

    expect(curriedConcatAll('foo', 'bar')('baz')).toEqual('foobarbaz');
    expect(curriedConcatAll('foo', 'bar')('baz', 'biz')).toEqual('foobarbazbiz');
    expect(() => curriedConcatAll('foo')('bar')('baz')('biz')).toThrow();
  });

  xit.each([
    ['foo', 'bar', 'baz', concatAll, 'foobar'],
    [1, 2, 3, R.add, 3],
    ['foo', 'bar', 'baz', R.concat, 'foobar'],
  ])('Case %#: should curry three parameters, but only use the first two', (first, second, third, func, expected) => {
    const curryThreeUseTwoParams = R; // your work here
    const curryThreeUseTwoParamsForFunc = curryThreeUseTwoParams(func);

    expect(typeof curryThreeUseTwoParamsForFunc(first, second)).toEqual('function');
    expect(curryThreeUseTwoParamsForFunc(first, second, third)).toEqual(expected);
    expect(curryThreeUseTwoParamsForFunc(first)(second, third)).toEqual(expected);
    expect(curryThreeUseTwoParamsForFunc(first, second)(third)).toEqual(expected);
    expect(curryThreeUseTwoParamsForFunc(first)(second)(third)).toEqual(expected);
  });
});
