const getLastBirthDay = (day = 1, month = 1, today = new Date(Date.now())) => {
  const bDay = new Date();
  bDay.setFullYear(today.getFullYear());
  bDay.setMonth(month - 1);
  bDay.setDate(day);
  // Return birthday if it is today
  if (
    bDay.getDate() === today.getDate() &&
    bDay.getMonth() === today.getMonth()
  ) {
    return today;
  }
  // Push birthday back a year if it is in the future
  if (bDay > today) {
    bDay.setFullYear(bDay.getFullYear() - 1);
  }
  return bDay;
};

export default getLastBirthDay;
