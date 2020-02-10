import getLastBirthday from './getLastBirthDay';

describe('getLastBirthDay', () => {
  it('should still run with no arguments and return jan 1', () => {
    const result = getLastBirthday();
    expect(result).toBeTruthy();
    expect(result.getDate()).toBe(1);
    expect(result.getMonth()).toBe(0);
  });
  it('should return the today is the birthday', () => {
    const today = new Date('2020-01-01');
    const result = getLastBirthday(today.getDate(), today.getMonth() + 1, today);
    expect(result).toBeTruthy();
    expect(result.getFullYear()).toBe(today.getFullYear());
    expect(result.getDate()).toBe(today.getDate());
    expect(result.getMonth()).toBe(today.getMonth());
  });
  it('should push back a year if birthday is in the future of current year', () => {
    const today = new Date('2020-01-02');
    const result = getLastBirthday(2, 2, today);
    expect(result).toBeTruthy();
    expect(result.getFullYear()).not.toBe(today.getFullYear());
  });
});
