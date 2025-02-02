import { getCalendarFn } from "@/src/apis/calendarApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useCurrentDate = () => {
  const [curYear, setCurYear] = useState<number>(() => new Date().getFullYear());
  const [curMonth, setCurMonth] = useState<number>(() => new Date().getMonth() + 1);

  // 현재 월 데이터 가져오는 query
  const { data } = useQuery({
    queryFn: () => getCalendarFn(curYear, curMonth),
    queryKey: ["calendar", curYear, curMonth],
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
