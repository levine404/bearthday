import appReducer, {
  setBirthDay,
  setBirthMonth,
  SET_BIRTH_DAY,
  SET_BIRTH_MONTH
} from './app.module';

describe('app.module', () => {
  describe('action creators', () => {
    it('should create a set birth day action', () => {
      const result = setBirthDay();
      expect(result.type).toBe(SET_BIRTH_DAY);
    });
    it('should create a set birth month action', () => {
      const result = setBirthMonth();
      expect(result.type).toBe(SET_BIRTH_MONTH);
    });
  });
  describe('app reducer', () => {
    it('should create an object with the intial state when first created', () => {
      const result = appReducer(undefined, {});
      expect(result).toEqual({
        birthDay: '',
        birthMonth: ''
      });
    });
    it('should set the birth day', () => {
      const result = appReducer(undefined, { type: SET_BIRTH_DAY, day: 10 });
      expect(result.birthDay).toBe(10);
    });
    it('should max birth day at 31', () => {
      const result = appReducer(undefined, { type: SET_BIRTH_DAY, day: 32 });
      expect(result.birthDay).toBe(31);
    });
    it('should set the birth month', () => {
      const result = appReducer(undefined, { type: SET_BIRTH_MONTH, month: 5 });
      expect(result.birthMonth).toBe(5);
    });
    it('should max birth month at 12', () => {
      const result = appReducer(undefined, { type: SET_BIRTH_MONTH, month: 13 });
      expect(result.birthMonth).toBe(12);
    });
  });
});
