import axiosInstance from "@/src/libs/axiosInstance";
import endpoint from "@/src/constants/endpoint";
import { NewThreadResult } from "@/src/types/threadTypes";

type NewThreadFnType = {
  aiProfileId: number;
  year: number;
  month: number;
  day: number;
};

export const newThreadFn = async ({ aiProfileId, year, month, day }: NewThreadFnType) => {
  const { data } = await axiosInstance.post<NewThreadResult>(
    `${endpoint.thread.chat}?aiProfileId=${aiProfileId}&year=${year}&month=${month}&day=${day}`
  );
  return data;
};
