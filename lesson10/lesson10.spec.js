const R = require('ramda');

describe('Merging', () => {
  it.each([
    [{ color: 'green', size: 75, active: true }, { color: 'red' }, { color: 'red', size: 75, active: true }],
    [
      { color: 'green', size: 75, active: true },
      { required: true },
      { color: 'green', size: 75, active: true, required: true },
    ],
    [
      { name: 'Luke', about: { age: 19, home: 'Tatooine' } },
      { about: { age: 20 } },
      { name: 'Luke', about: { age: 20 } },
    ],
  ])('should merge the second object into the first', (obj1, obj2, expected) => {
    const actual = R; // your work here

    expect(actual).toEqual(expected);
  });

  xit.each([
    [{ color: 'green', size: 75, active: true }, { color: 'red' }, { color: 'green', size: 75, active: true }],
    [
      { color: 'green', size: 75, active: true },
      { required: true },
      { color: 'green', size: 75, active: true, required: true },
    ],
    [
      { about: { age: 20 } },
      { name: 'Luke', about: { age: 19, home: 'Tatooine' } },
      { name: 'Luke', about: { age: 20 } },
    ],
  ])('should merge the fist object into the second', (obj1, obj2, expected) => {
    const actual = R; // your work here

    expect(actual).toEqual(expected);
  });

  xit.each([
    [{ color: 'green', size: 75, active: true }, { color: 'red' }, { color: 'red', size: 75, active: true }],
    [
      { color: 'green', size: 75, active: true },
      { required: true },
      { color: 'green', size: 75, active: true, required: true },
    ],
    [
      { name: 'Luke', about: { age: 19, home: 'Tatooine' } },
      { about: { age: 20 } },
      { name: 'Luke', about: { age: 20, home: 'Tatooine' } },
    ],
  ])('should recursively merge the second object into the first', (obj1, obj2, expected) => {
    const actual = R; // your work here

    expect(actual).toEqual(expected);
  });

  xit.each([
    [{ color: 'green', size: 75, active: true }, { color: 'red' }, { color: 'green', size: 75, active: true }],
    [
      { color: 'green', size: 75, active: true },
      { required: true },
      { color: 'green', size: 75, active: true, required: true },
    ],
    [
      { about: { age: 20 } },
      { name: 'Luke', about: { age: 19, home: 'Tatooine' } },
      { name: 'Luke', about: { age: 20, home: 'Tatooine' } },
    ],
  ])('should merge the fist object into the second', (obj1, obj2, expected) => {
    const actual = R.mergeDeepLeft(obj1, obj2); // your work here

    expect(actual).toEqual(expected);
  });

  xit('should concat arrays together', () => {
    const obj1 = {
      stuff: [1, 2, 3],
      foo: 'bar',
    };
    const obj2 = {
      stuff: [4, 5, 6],
      foo: 'baz',
    };
    const expected = {
      stuff: [1, 2, 3, 4, 5, 6],
      foo: 'baz',
    };
    const actual = R; // your work here

    expect(actual).toEqual(expected);
  });
});

xdescribe('Evolving', () => {
  it('should uppercase "name" and set hasEvolved to true', () => {
    const obj = {
      name: 'george',
      location: 'jungle',
      hasEvolved: false,
    };
    const expected = {
      name: 'GEORGE',
      location: 'jungle',
      hasEvolved: true,
    };
    const actual = R; // your work here

    expect(actual).toEqual(expected);
  });

  xit('should double "price" and halve "quantity"', () => {
    const obj = {
      category: 'Graphics Card',
      target: {
        quantity: 100,
        price: 350,
      },
    };
    const expected = {
      category: 'Graphics Card',
      target: {
        quantity: 50,
        price: 700,
      },
    };
    const actual = R; // your work here

    expect(actual).toEqual(expected);
  });
});

xdescribe('To & From Pairs', () => {
  it.each([
    ['name', 'id', { name: 'tom', id: 1 }, { label: 'tom', value: 1 }],
    ['name', 'id', { name: 'jerry', id: 2, isMouse: true }, { label: 'jerry', value: 2, isMouse: true }],
    ['location', 'locationCode', { location: 'Canada', locationCode: 'CA' }, { label: 'Canada', value: 'CA' }],
  ])('should rename "%s" to label and "%s" to value', (labelKey, valueKey, obj, expected) => {
    const actual = R; // your work here

    expect(actual).toEqual(expected);
  });
});
