import { getTodayDate } from '@/src/utils/date';

const getDateString = (year: number, month: number, day: number) => {
  const mm = month.toString().padStart(2, '0');
  const dd = day.toString().padStart(2, '0');
  return `${year}-${mm}-${dd}`;
};

export const getTodayDateData = () => {
  const { year, month, day } = getTodayDate();
  const dateString = getDateString(year, month, day);

  return { year, month, day, dateString };
};
