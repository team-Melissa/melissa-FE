import endpoint from "@/src/constants/endpoint";
import axiosInstance from "@/src/libs/axiosInstance";
import { DiariesResult, DiaryResult, MonthCalendar } from "@/src/types/calendarTypes";
import { ErrorResponse } from "@/src/types/commonTypes";
import { isAxiosError } from "axios";

export const getCalendarFn = async (year: number, month: number) => {
  try {
    const { data } = await axiosInstance.get<MonthCalendar>(
      `${endpoint.calendar.month}?year=${year}&month=${month}`
    );
    console.log(data);
    return data;
  } catch (e) {
    if (isAxiosError<ErrorResponse>(e)) {
      // 해당 월에 실제 일기가 하나도 없는 거라면, 에러로 인한 no cache를 막기 위해 빈 배열 return
      if (e.response?.data.code === "CALENDAR4001") {
        return {
          isSuccess: true,
          code: "CALENDAR4001",
          message: "해당 날짜 또는 월의 데이터가 존재하지 않습니다.",
          result: [],
        } as MonthCalendar;
      }
    }
    // 나머지 경우 에러는 던짐
    throw e;
  }
};

export const getDiaryFn = async (year: number, month: number, day: number) => {
  const { data } = await axiosInstance.get<DiaryResult>(
    `${endpoint.calendar.day}?year=${year}&month=${month}&day=${day}`
  );
  console.log(data);
  return data;
};

export const getDiariesFn = async (year: number, month: number) => {
  const { data } = await axiosInstance.get<DiariesResult>(
    `${endpoint.calendar.diaries}?year=${year}&month=${month}`
  );
  console.log(data);
  return data;
};
