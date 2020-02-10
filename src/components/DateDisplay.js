import React from 'react';

const DateDisplay = ({ label, date, changeDate }) => {
  return (
    <input
      type="number"
      value={date}
      placeholder={label}
      onChange={changeDate}
    />
  );
};

export default DateDisplay;
