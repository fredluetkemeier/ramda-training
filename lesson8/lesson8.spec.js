const R = require('ramda');

describe('juxt', () => {
  it.each([
    [1, 2, [3, 2, 0.5, -1]],
    [6, 3, [9, 18, 2, 3]],
    [8, 2, [10, 16, 4, 6]],
  ])('Case %#: should add, multiply, divide, and subtract both numbers', (num1, num2, expected) => {
    const mathOperations = R.juxt; // your work here
    const res = mathOperations(num1, num2);

    expect(res).toEqual(expected);
  });

  xit('Should return the value of "foo" and the whole object', () => {
    const fooAndObject = R.juxt; // your work here
    const res = fooAndObject({ foo: 'bar' });

    expect(res).toEqual(['bar', { foo: 'bar' }]);
  });
});

xdescribe('useWith', () => {
  it.each([
    [[1, 2, 3], [1, 2, 3], 2],
    [[25, 19], [0, 89, 2], 25],
    [[3], [2, 1], 5],
  ])('Case %#: should add the first number in each array', (nums1, nums2, expected) => {
    const addFirstNumbers = R.useWith; // your work here
    const res = addFirstNumbers(nums1, nums2);

    expect(res).toBe(expected);
  });

  xit.each([
    [{ firstName: 'Mara', lastName: 'Jade' }, { firstName: 'Luke', lastName: 'Skywalker' }, 'Mara Skywalker'],
    [{ firstName: 'Leia', lastName: 'Organa' }, { firstName: 'Han', lastName: 'Solo' }, 'Leia Solo'],
  ])('Case %#: should get the married name', (person1, person2, expected) => {
    const getMarriedName = R.useWith;
    const res = getMarriedName(person1, person2);

    expect(res).toEqual(expected);
  });
});

xdescribe('Review', () => {
  it.each([
    // HanSolo is 7 characters
    [[{ firstName: 'Han', lastName: 'Solo' }], true],

    // average full name length less than 10
    [
      [
        { firstName: 'Luke', lastName: 'Skywalker' },
        { firstName: 'Han', lastName: 'Solo' },
        { firstName: 'Chewbacca' },
      ],
      true,
    ],

    // HanSolo is 12 characters
    [[{ firstName: 'Luke', lastName: 'Skywalker' }], false],

    // average full name length greater than 10
    [
      [
        { firstName: 'Luke', lastName: 'Skywalker' },
        { firstName: 'Han', lastName: 'Solo' },
        { firstName: 'Jar Jar', lastName: 'Binks' },
      ],
      false,
    ],
  ])('should print true if average length of each persons full name is less than 10 characters', (names, expected) => {
    const namesAreShort = R; // you work here
    const res = namesAreShort(names);

    expect(res).toBe(expected);
  });
});
