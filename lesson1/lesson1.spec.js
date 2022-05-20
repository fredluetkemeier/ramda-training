const R = require('ramda');

// this is what you want to avoid
describe('Mutability', () => {
  function removeLastElement(arr) {
    arr.pop();

    return arr;
  }

  it('should mutate the array', () => {
    const arr1 = [1, 2, 3];
    const arr2 = removeLastElement(arr1);

    expect(arr1).toEqual([1, 2]);
    expect(arr1).toBe(arr2);
    expect(arr1).toEqual(arr2);
    expect(arr2).toEqual([1, 2]);
  });

  function setNameToBob(obj) {
    obj.name = 'Bob';

    return obj;
  }

  it('should mutate the array', () => {
    const obj1 = { profession: 'Builder' };
    const obj2 = setNameToBob(obj1);

    expect(obj1).toEqual({ name: 'Bob', profession: 'Builder' });
    expect(obj1).toBe(obj2);
    expect(obj1).toEqual(obj2);
    expect(obj2).toEqual({ name: 'Bob', profession: 'Builder' });
  });
});

describe('Immutability', () => {
  function removeLastElement(arr) {
    // make this function immutable!
  }

  xit('should mutate the array', () => {
    const arr1 = [1, 2, 3];
    const arr2 = removeLastElement(arr1);

    expect(arr1).toEqual([1, 2, 3]);
    expect(arr1).not.toBe(arr2);
    expect(arr1).not.toEqual(arr2);
    expect(arr2).toEqual([1, 2]);
  });

  function setNameToBob(obj) {
    // make this function immutable!
  }

  xit('should mutate the array', () => {
    const obj1 = { profession: 'Builder' };
    const obj2 = setNameToBob(obj1);

    expect(obj1).toEqual({ profession: 'Builder' });
    expect(obj1).not.toBe(obj2);
    expect(obj1).not.toEqual(obj2);
    expect(obj2).toEqual({ name: 'Bob', profession: 'Builder' });
  });
});

const multiply = (a, b) => {};
const double = (b) => {};

describe('Currying', () => {
  xit('should multiply the numbers', () => {
    const res = multiply(2, 3);

    expect(res).toBe(6);
  });

  xit('should curry multiplys parameters', () => {
    const res = multiply(2)(3);

    expect(res).toBe(6);
  });

  xit('should double a number', () => {
    const res = double(3);

    expect(res).toBe(6);
  });
});
