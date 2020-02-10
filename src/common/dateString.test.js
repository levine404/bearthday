import dateString from './dateString';

describe('dateString', () => {
  it('should return an extra char when number is below 10', () => {
    const result = dateString(0);
    expect(result.length).toBe(2);
  });
});
