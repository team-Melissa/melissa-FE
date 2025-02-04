import { getCalendarFn, getDiaryFn } from "@/src/apis/calendarApi";
import { getNextDate, getPrevDate } from "@/src/utils/calculateDate";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useCurrentDate = () => {
  const queryClient = useQueryClient();

  const [curYear, setCurYear] = useState<number>(() => new Date().getFullYear());
  const [curMonth, setCurMonth] = useState<number>(() => new Date().getMonth() + 1);

  const [prevYear, prevMonth] = getPrevDate(curYear, curMonth);
  const [nextYear, nextMonth] = getNextDate(curYear, curMonth);

  // 캘린더는 현재 월 && 일기 쓰고 나온 뒤, 요약 생성이 끝났을 때를 제외하면 데이터가 변할 일이 없으므로 staleTime을 길게 잡아보자
  // 일기 데이터 역시 변할 일이 거의 없으므로 staleTime 길게!
  const diariesData = useQueries({
    queries: [
      {
        queryFn: () => getCalendarFn(curYear, curMonth),
        queryKey: ["calendar", curYear, curMonth],
        staleTime: 5 * 60 * 1000,
      },
      {
        queryFn: () => getCalendarFn(prevYear, prevMonth),
        queryKey: ["calendar", prevYear, prevMonth],
        staleTime: 5 * 60 * 1000,
      },
      {
        queryFn: () => getCalendarFn(nextYear, nextMonth),
        queryKey: ["calendar", nextYear, nextMonth],
        staleTime: 5 * 60 * 1000,
      },
    ],
    combine: (result) => {
      // 3개월 캘린더 데이터를 flat
      const flattedData = result
        .filter((query) => query.isSuccess)
        .flatMap((query) => query.data.result);

      // 현재 월 일기 데이터를 미리 prefetch <- 만약 한 달에 30번이나 일기 꼬박꼬박 썼으면 30개의 병렬 API 호출: 백엔드/DB 부하 커지려나?
      // 차라리 일기 데이터를 1달 단위로 받는게 나으려나...
      const curMonthData = flattedData.filter((data) => data.month === curMonth);
      curMonthData.map(({ year, month, day }) =>
        queryClient.prefetchQuery({
          queryFn: () => getDiaryFn(year, month, day),
          queryKey: ["diary", year, month, day],
          staleTime: 5 * 60 * 1000,
        })
      );

      // 3개월 캘린더 데이터를 flat시켜 반환
      return flattedData;
    },
  });

  useEffect(() => {
    console.log(curYear, curMonth);
  }, [curMonth, curYear]);

  const changeDate = (year: number, month: number) => {
    setCurYear(year);
    setCurMonth(month);
  };

  return { diariesData, changeDate };
};

export default useCurrentDate;
