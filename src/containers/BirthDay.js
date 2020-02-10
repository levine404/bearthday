import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBirthDay, setBirthDay } from '../redux/app.module';
import DisplayDate from '../components/DateDisplay';

const BirthDay = () => {
  const dispatch = useDispatch();
  const birthDay = useSelector(getBirthDay);
  const changeDateHandler = event => dispatch(setBirthDay(event.target.value));
  return (
    <DisplayDate
      label="Day"
      date={birthDay}
      changeDate={changeDateHandler}
    />
  );
};

export default BirthDay;
