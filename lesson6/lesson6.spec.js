const R = require('ramda');

describe('Logic your way through these tests', () => {
  it.each([
    [100, 'big number'],
    [0, 'small number'],
  ])(
    'Case %#: should return "big number" if value is greater than 50, otherwise return "small number"',
    (num, expected) => {
      const checkNumSize = R; // your work here
      const res = checkNumSize(num);

      expect(res).toBe(expected);
    },
  );

  xit.each([
    [
      { name: 'James Bond', nameRedacted: true },
      { name: 'redacted', nameRedacted: true },
    ],
    [
      { name: 'Jim Bo', nameRedacted: false },
      { name: 'Jim Bo', nameRedacted: false },
    ],
  ])('Case %#: should set name to "redacted" when "nameRedacted" is true', (person, expected) => {
    const setName = R; // your work here
    const res = setName(person);

    expect(res).toEqual(expected);
  });

  xit.each([
    [{ size: 3 }, 'tiny'],
    [{ size: 20 }, 'small'],
    [{ size: 55 }, 'medium'],
    [{ size: 87 }, 'large'],
    [{ size: 124 }, 'giant'],
  ])('Case %#: should return size based on the chart', (obj, expected) => {
    /*
     * The chart
     * |-------|--------|
     * | size  | result |
     * |-------|--------|
     * | 0-15  | tiny   |
     * | 16-35 | small  |
     * | 36-85 | medium |
     * | 86-99 | large  |
     * | >99   | giant  |
     * |-------|--------|
     */
    const getSize = R; // your work here;
    const res = getSize(obj);

    expect(res).toBe(expected);
  });
});

xdescribe('Review', () => {
  it('should set isOld for all people over 100', () => {
    const people = [{ age: 25 }, { age: 53 }, { age: 103 }, { age: 75 }];
    const res = R; // your work here

    expect(res).toEqual([{ age: 25 }, { age: 53 }, { age: 103, isOld: true }, { age: 75 }]);
  });

  xit('should set preferred name to null for people that dont have a preferred name', () => {
    const people = [
      { name: { first: 'Han', last: 'Solo' }, preferredName: '' },
      { name: { first: 'Obi-Wan', last: 'Kenobi' }, preferredName: 'Ben' },
      { name: { first: 'Luke', last: 'Skywalker' } },
    ];
    const res = R; // your work here

    expect(res).toEqual([
      { name: { first: 'Han', last: 'Solo' }, preferredName: null },
      { name: { first: 'Obi-Wan', last: 'Kenobi' }, preferredName: 'Ben' },
      { name: { first: 'Luke', last: 'Skywalker' }, preferredName: null },
    ]);
  });
});
