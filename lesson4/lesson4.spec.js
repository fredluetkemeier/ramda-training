const R = require('ramda');

describe('Accessing an Item', () => {
  it('should get the first item in the array', () => {
    const arr = ['best', 'better', 'good'];
    const res = R; // your work here

    expect(res).toBe('best');
  });

  xit('should get the last item in the array', () => {
    const arr = ['good', 'better', 'best'];
    const res = R(arr); // your work here

    expect(res).toBe('best');
  });

  xit('should get the second item in the array', () => {
    const arr = ['better', 'best', 'good'];
    const res = R; // your work here

    expect(res).toBe('best');
  });
});

xdescribe('Accessing Items', () => {
  it('should get the first two items in the array', () => {
    const arr = ['best', 'better', 'good'];
    const res = R; // your work here

    expect(res).toEqual(['best', 'better']);
  });

  xit('should get the last two item in the array', () => {
    const arr = ['good', 'better', 'best'];
    const res = R; // your work here

    expect(res).toEqual(['better', 'best']);
  });

  xit('should remove the first item in the array', () => {
    const arr = ['good', 'better', 'best'];
    const res = R; // your work here

    expect(res).toEqual(['better', 'best']);
  });

  xit('should remove the last item in the array', () => {
    const arr = ['best', 'better', 'good'];
    const res = R; // your work here

    expect(res).toEqual(['best', 'better']);
  });

  xit('should get all items with "be" in it', () => {
    const arr = ['better', 'best', 'good', 'beer'];
    const res = R; // your work here

    expect(res).toEqual(['better', 'best', 'beer']);
  });
});

xdescribe('Modifying Arrays', () => {
  it('should add "better" to the middle of the array', () => {
    const arr = ['good', 'best'];
    const res = R; // your work here

    expect(res).toEqual(['good', 'better', 'best']);
  });

  xit('should add "good" to the start of the array', () => {
    const arr = ['better', 'best'];
    const res = R; // your work here

    expect(res).toEqual(['good', 'better', 'best']);
  });

  xit('should add "best" to the end of the array', () => {
    const arr = ['good', 'better'];
    const res = R; // your work here

    expect(res).toEqual(['good', 'better', 'best']);
  });

  xit('should replace "best" with "beer"', () => {
    const arr = ['good', 'better', 'best'];
    const res = R; // your work here

    expect(res).toEqual(['good', 'better', 'beer']);
  });

  xit('should change "best" to "BEST"', () => {
    const arr = ['good', 'better', 'best'];
    const res = R; // your work here

    expect(res).toEqual(['good', 'better', 'BEST']);
  });
});
