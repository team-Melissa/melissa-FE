export const getPrevDate = (
  curYear: number,
  curMonth: number
): [prevYear: number, prevMonth: number] => {
  const prevYear = curMonth === 1 ? curYear - 1 : curYear;
  const prevMonth = curMonth === 1 ? 12 : curMonth - 1;

  return [prevYear, prevMonth];
};

export const getNextDate = (
  curYear: number,
  curMonth: number
): [nextYear: number, nextMonth: number] => {
  const nextYear = curMonth === 12 ? curYear + 1 : curYear;
  const nextMonth = curMonth === 12 ? 1 : curMonth + 1;

  return [nextYear, nextMonth];
};
