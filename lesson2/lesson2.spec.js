const R = require('ramda');

describe('Practice Piping', () => {
  // (((x + 3) x 5) + 1)
  const add3imes5Plus1 = R.pipe(); // put your functions in here;

  it('should go from 1 to 21', () => {
    const res = add3imes5Plus1(1);

    expect(res).toBe(21);
  });

  it('should go from 3 to 31', () => {
    const res = add3imes5Plus1(3);

    expect(res).toBe(31);
  });

  it('should go from 7 to 51', () => {
    const res = add3imes5Plus1(7);

    expect(res).toBe(51);
  });
});

xdescribe('Practice Composing', () => {
  // (((x x 3) + 10) x 2)
  const times3Plus10Doubled = R
    .compose
    // put your functions here
    ();

  it('should go from 1 to 26', () => {
    const res = times3Plus10Doubled(1);

    expect(res).toBe(26);
  });

  it('should go from 5 to 50', () => {
    const res = times3Plus10Doubled(5);

    expect(res).toBe(50);
  });

  it('should go from 7 to 62', () => {
    const res = times3Plus10Doubled(7);

    expect(res).toBe(62);
  });
});

xdescribe('Practice Tapping', () => {
  const showWork = jest.fn();
  const showYourWork = R.compose(
    // update this function to show your work
    R.add(1),
    R.multiply(2),
  );

  it('should hit the mock function with each step', () => {
    showYourWork(1);

    expect(showWork).toHaveBeenCalledWith(1);
    expect(showWork).toHaveBeenCalledWith(2);
    expect(showWork).toHaveBeenCalledWith(3);
  });
});
