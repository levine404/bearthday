export const SET_BIRTH_DAY = 'SET_BIRTH_DAY';
export const SET_BIRTH_MONTH = 'SET_BIRTH_MONTH';

export function setBirthDay (day) {
  return {
    type: SET_BIRTH_DAY,
    day
  };
}

export function setBirthMonth (month) {
  return {
    type: SET_BIRTH_MONTH,
    month
  };
}

const initalState = {
  birthDay: '',
  birthMonth: ''
};

export default function reducer(state = initalState, action) {
  switch(action.type) {
    case SET_BIRTH_DAY:
      const fixedDay = action.day === ''
        ? action.day
        : Math.max(1, Math.min(31, action.day));
      return {
        ...state,
        birthDay: fixedDay
      };
    case SET_BIRTH_MONTH:
      const fixedMonth = action.month === ''
        ? action.month
        : Math.max(1, Math.min(12, action.month));
      return {
        ...state,
        birthMonth: fixedMonth
      };
    default:
      return state;
  }
};

export const getBirthDay = state => state.app.birthDay;
export const getBirthMonth = state => state.app.birthMonth;
