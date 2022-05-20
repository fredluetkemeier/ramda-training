const R = require('ramda');

describe('The Easy Stuff', () => {
  it.each([
    [true, [true]],
    [1, [1]],
    ['test', ['test']],
  ])('should make each value into an array of itself', (input, expected) => {
    const res = R; // your work here

    expect(res).toEqual(expected);
  });

  xit('should combine the arrays', () => {
    const arr1 = ['hello'];
    const arr2 = ['world'];
    const res = R; // your work here

    expect(res).toEqual(['hello', 'world']);
  });
});

xdescribe('Mapping', () => {
  it('should upper case all items', () => {
    const arr = ['foo', 'bar', 'baz'];
    const res = R; // your work here

    expect(res).toEqual(['FOO', 'BAR', 'BAZ']);
  });

  xit('should create an array of the x.y.z value for all items', () => {
    const arr = [{ x: { y: { z: 1 } } }, { x: { y: { z: 2 } } }, { x: { y: { z: 3 } } }];
    const res = R; // your work here

    expect(res).toEqual([1, 2, 3]);
  });

  xit('should set each items name to "unknown" if it doesnt exist', () => {
    // hint: re-read lesson 3 if you get stuck
    const arr = [{ userId: 1, name: 'Joe' }, { userId: 2 }, { userId: 3 }];
    const res = R; // your work here

    expect(res).toEqual([
      { userId: 1, name: 'Joe' },
      { userId: 2, name: 'unknown' },
      { userId: 3, name: 'unknown' },
    ]);
  });
});

xdescribe('Reducing', () => {
  it('should sum the numbers', () => {
    const arr = [5, 10, 15];
    const res = R; // your work here

    expect(res).toBe(30);
  });

  xit('should flatten the array', () => {
    // no using R.flatten
    const arr = [['foo'], ['bar'], ['baz']];
    const res = R; // your work here

    expect(res).toEqual(['foo', 'bar', 'baz']);
  });
});

xdescribe('All Together Now', () => {
  it('should sum all ages over 25', () => {
    const arr = [{ age: 10 }, { age: 30 }, { age: 50 }, { age: 20 }, { age: 40 }];
    const res = R; // your work here

    expect(res).toBe(120);
  });
});
