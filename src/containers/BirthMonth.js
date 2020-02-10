import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBirthMonth, setBirthMonth } from '../redux/app.module';
import DisplayDate from '../components/DateDisplay';

const BirthMonth = () => {
  const dispatch = useDispatch();
  const birthMonth = useSelector(getBirthMonth);
  const changeDateHandler = event => dispatch(setBirthMonth(event.target.value));
  return (
    <DisplayDate
      label="Month"
      date={birthMonth}
      changeDate={changeDateHandler}
    />
  );
};

export default BirthMonth;
