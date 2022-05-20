const R = require('ramda');

describe('Practice what we learned', () => {
  it('should get the value of obj.foo', () => {
    const obj = { foo: 'bar' };
    const res = R.prop('foo', obj); // your work here

    expect(res).toBe('bar');
  });

  it('should set the value of obj.foo to "baz"', () => {
    const obj = { foo: 'bar' };
    const res = R.assoc('foo', 'baz', obj); // your work here

    expect(res).toEqual({ foo: 'baz' });
  });

  it('should get the value of obj.foo.bar', () => {
    const obj = { foo: { bar: 'baz' } };
    const res = R.path(['foo', 'bar'], obj); // your work here

    expect(res).toBe('baz');
  });

  it('should set the value of obj.foo.bar to "biz"', () => {
    const obj = { foo: { bar: 'baz' } };
    const res = R.assocPath(['foo', 'bar'], 'biz', obj); // your work here

    expect(res).toEqual({ foo: { bar: 'biz' } });
  });

  it('should set obj.hello to "WORLD"', () => {
    const obj = { hello: 'world' };
    const res = R.assoc('hello', 'WORLD', obj); // your work here

    expect(res).toEqual({ hello: 'WORLD' });
  });

  it('should default obj.foo to "unknown"', () => {
    const obj = { hello: 'world' };
    const res = R.propOr('unknown', 'foo', obj); // your work here

    expect(res).toBe('unknown');
  });

  it('should default obj.foo.bar to "unknown"', () => {
    const obj = { hello: 'world' };
    const res = R.pathOr('unknown', ['foo', 'bar'], obj); // your work here

    expect(res).toBe('unknown');
  });
});

describe('Review', () => {
  it('should get the value of obj.x and add three', () => {
    const obj = { x: 4 };
    const res = R.pipe(R.prop('x'), R.add(3))(obj); // your work here

    expect(res).toBe(7);
  });

  it('should set the value of obj.x.y to obj.x.y times 2 plus 5', () => {
    const obj = { x: { y: 7 } };

    const xyLens = R.lensPath(['x', 'y']);
    const times2Plus5 = R.pipe(R.multiply(2), R.add(5));

    const res = R.over(xyLens, times2Plus5)(obj); // your work here

    expect(res).toEqual({ x: { y: 19 } });
  });
});
