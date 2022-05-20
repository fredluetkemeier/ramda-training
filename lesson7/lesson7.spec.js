const R = require('ramda');

describe('Placeholder Parameters', () => {
  it.each([
    [1, -2],
    [10, 7],
    [5, 2],
    [23, 20],
  ])('Case %#: should subtract three', (num, expected) => {
    // don't use R.flip
    const minus3 = R; // your work here
    const res = minus3(num);

    expect(res).toBe(expected);
  });

  xit.each([
    ['foo', {}, { foo: 'neat' }],
    ['foo', { foo: 'bar' }, { foo: 'neat' }],
    ['foo', { hello: 'world' }, { hello: 'world', foo: 'neat' }],
  ])('Case %#: should set any prop for any object to "neat"', (prop, obj, expected) => {
    const setToNeat = R; // your work here
    const res = setToNeat(prop, obj);

    expect(res).toEqual(expected);
  });
});

// These are the hardest tests you've had to deal with so far
xdescribe('Applying and Converging Parameters', () => {
  it.each([
    [{ firstName: 'Han', lastName: 'Solo' }, 'Han Solo'],
    [{ firstName: 'Luke', lastName: 'Skywalker' }, 'Luke Skywalker'],
    [{ firstName: 'Yoda' }, 'Yoda'],
  ])('Case %#: should concat the first name and the last name', (person, expected) => {
    const combineNames = R; // your work here
    const res = combineNames(person);

    expect(res).toEqual(expected);
  });

  xit.each([
    [
      ['a', 'b', 'c'],
      [
        { value: 'a', label: 'Select: a' },
        { value: 'b', label: 'Select: b' },
        { value: 'c', label: 'Select: c' },
      ],
    ],
    [
      [1, 2, 3],
      [
        { value: 1, label: 'Select: 1' },
        { value: 2, label: 'Select: 2' },
        { value: 3, label: 'Select: 3' },
      ],
    ],
  ])('Case %#: should transform an array into an array of options', (arr, expected) => {
    const transformArrayToOptions = R; // your work here
    const res = transformArrayToOptions(arr);

    expect(res).toEqual(expected);
  });
});
