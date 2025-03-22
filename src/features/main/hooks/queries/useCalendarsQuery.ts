import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getNextDate, getPrevDate } from "../../utils/calculateDate";
import { _calendar } from "../../apis/calendarApi";
import { _diaries } from "../../apis/diariesApi";

export const useCalendarsQuery = () => {
  const queryClient = useQueryClient();
  const [curYear, setCurYear] = useState<number>(() => new Date().getFullYear());
  const [curMonth, setCurMonth] = useState<number>(() => new Date().getMonth() + 1);
  const [prevYear, prevMonth] = getPrevDate(curYear, curMonth);
  const [nextYear, nextMonth] = getNextDate(curYear, curMonth);

  const calendarsData = useQueries({
    queries: [
      {
        queryFn: () => _calendar(curYear, curMonth),
        queryKey: ["calendar", curYear, curMonth],
        staleTime: 5 * 60 * 1000,
      },
      {
        queryFn: () => _calendar(prevYear, prevMonth),
        queryKey: ["calendar", prevYear, prevMonth],
        staleTime: 5 * 60 * 1000,
      },
      {
        queryFn: () => _calendar(nextYear, nextMonth),
        queryKey: ["calendar", nextYear, nextMonth],
        staleTime: 5 * 60 * 1000,
      },
    ],
    combine: (result) => {
      queryClient.prefetchQuery({
        queryFn: () => _diaries(curYear, curMonth),
        queryKey: ["diaries", curYear, curMonth],
        staleTime: 5 * 60 * 1000,
      });
      // 3개월 캘린더 데이터를 flat
      const flattedData = result.filter((query) => query.isSuccess).flatMap((query) => query.data.result);
      return flattedData;
    },
  });

  const handleDateChange = (year: number, month: number) => {
    setCurYear(year);
    setCurMonth(month);
  };

  return { calendarsData, handleDateChange };
};
