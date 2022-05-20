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
    return R.dropLast(1, arr);
  }

  it('should mutate the array', () => {
    const arr1 = [1, 2, 3];
    const arr2 = removeLastElement(arr1);

    expect(arr1).toEqual([1, 2, 3]);
    expect(arr1).not.toBe(arr2);
    expect(arr1).not.toEqual(arr2);
    expect(arr2).toEqual([1, 2]);
  });

  function setNameToBob(obj) {
    return R.assoc('name', 'Bob', obj);
  }

  it('should mutate the array', () => {
    const obj1 = { profession: 'Builder' };
    const obj2 = setNameToBob(obj1);

    expect(obj1).toEqual({ profession: 'Builder' });
    expect(obj1).not.toBe(obj2);
    expect(obj1).not.toEqual(obj2);
    expect(obj2).toEqual({ name: 'Bob', profession: 'Builder' });
  });
});

const multiply = R.curry((a, b) => a * b);
const double = R.curry((b) => b * 2);

describe('Currying', () => {
  it('should multiply the numbers', () => {
    const res = multiply(2, 3);

    expect(res).toBe(6);
  });

  it('should curry multiplys parameters', () => {
    const res = multiply(2)(3);

    expect(res).toBe(6);
  });

  it('should double a number', () => {
    const res = double(3);

    expect(res).toBe(6);
  });
});
