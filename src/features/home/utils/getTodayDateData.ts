const getDateString = (year: number, month: number, day: number) => {
  const mm = month.toString().padStart(2, "0");
  const dd = day.toString().padStart(2, "0");
  return `${year}-${mm}-${dd}`;
};

export const getTodayDateData = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const dateString = getDateString(year, month, day);

  return { year, month, day, dateString };
};
