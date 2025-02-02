import { getCalendarFn } from "@/src/apis/calendarApi";
import { getNextDate, getPrevDate } from "@/src/utils/calculateDate";
import { usePrefetchQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useCurrentDate = () => {
  const [curYear, setCurYear] = useState<number>(() => new Date().getFullYear());
  const [curMonth, setCurMonth] = useState<number>(() => new Date().getMonth() + 1);

  const [prevYear, prevMonth] = getPrevDate(curYear, curMonth);
  const [nextYear, nextMonth] = getNextDate(curYear, curMonth);

  // 캘린더는 현재 월 && 일기 쓰고 나온 뒤, 요약 생성이 끝났을 때를 제외하면 데이터가 변할 일이 없으므로 staleTime을 길게 잡아보자

  // 현재 월 데이터 가져오는 query
  const { data } = useQuery({
    queryFn: () => getCalendarFn(curYear, curMonth),
    queryKey: ["calendar", curYear, curMonth],
    staleTime: 5 * 60 * 1000,
  });
  // 현재 월 -1 데이터 가져오는 prefetchQuery
  usePrefetchQuery({
    queryFn: () => getCalendarFn(prevYear, prevMonth),
    queryKey: ["calendar", prevYear, prevMonth],
    staleTime: 5 * 60 * 1000,
  });
  // 현재 월 +1 데이터 가져오는 prefetchQuery
  usePrefetchQuery({
    queryFn: () => getCalendarFn(nextYear, nextMonth),
    queryKey: ["calendar", nextYear, nextMonth],
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    console.log(curYear, curMonth);
  }, [curMonth, curYear]);

  const changeDate = (year: number, month: number) => {
    setCurYear(year);
    setCurMonth(month);
  };

  return { data, changeDate };
};

export default useCurrentDate;
