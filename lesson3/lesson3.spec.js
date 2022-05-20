const R = require('ramda');

describe('Practice what we learned', () => {
  it('should get the value of obj.foo', () => {
    const obj = { foo: 'bar' };
    const res = R; // your work here

    expect(res).toBe('bar');
  });

  xit('should set the value of obj.foo to "baz"', () => {
    const obj = { foo: 'bar' };
    const res = R; // your work here

    expect(res).toEqual({ foo: 'baz' });
  });

  xit('should get the value of obj.foo.bar', () => {
    const obj = { foo: { bar: 'baz' } };
    const res = R; // your work here

    expect(res).toBe('baz');
  });

  xit('should set the value of obj.foo.bar to "biz"', () => {
    const obj = { foo: { bar: 'baz' } };
    const res = R; // your work here

    expect(res).toEqual({ foo: { bar: 'biz' } });
  });

  xit('should set obj.hello to "WORLD"', () => {
    const obj = { hello: 'world' };
    const res = R; // your work here

    expect(res).toEqual({ hello: 'WORLD' });
  });

  xit('should default obj.foo to "unknown"', () => {
    const obj = { hello: 'world' };
    const res = R; // your work here

    expect(res).toBe('unknown');
  });

  xit('should default obj.foo.bar to "unknown"', () => {
    const obj = { hello: 'world' };
    const res = R; // your work here

    expect(res).toBe('unknown');
  });
});

xdescribe('Review', () => {
  it('should get the value of obj.x and add three', () => {
    const obj = { x: 4 };
    const res = R; // your work here

    expect(res).toBe(7);
  });

  xit('should set the value of obj.x.y to obj.x.y times 2 plus 5', () => {
    const obj = { x: { y: 7 } };
    const res = R; // your work here

    expect(res).toEqual({ x: { y: 19 } });
  });
});
