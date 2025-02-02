import endpoint from "@/src/constants/endpoint";
import axiosInstance from "@/src/libs/axiosInstance";
import { MonthCalendar } from "@/src/types/calendarTypes";

export const getCalendarFn = async (year: string, month: string) => {
  const { data } = await axiosInstance.get<MonthCalendar>(
    `${endpoint.calendar.month}?year=${year}&month=${month}`
  );
  console.log(data);
  return data;
};
