import { isAxiosError } from "axios";
import axiosInstance from "@/src/libs/axiosInstance";
import endpoint from "@/src/constants/endpoint";
import type { ErrorDTO } from "@/src/types/commonTypes";
import type { DiariesDTO } from "../types/calendarTypes";

export const _diaries = async (year: number, month: number) => {
  try {
    const { data } = await axiosInstance.get<DiariesDTO>(endpoint.calendar.diaries, {
      params: { year, month },
    });
    return data;
  } catch (e) {
    if (isAxiosError<ErrorDTO>(e)) {
      // 해당 월에 요약 데이터가 하나도 없는 거라면, 에러로 인한 no cache를 막기 위해 빈 배열 return
      if (e.response?.data.code === "CALENDAR4001") {
        return {
          isSuccess: true,
          code: "CALENDAR4001",
          message: "해당 날짜 또는 월의 일기 데이터가 존재하지 않습니다.",
          result: [],
        } as DiariesDTO;
      }
      throw e;
    }
  }
};
