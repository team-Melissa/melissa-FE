import axiosInstance from "@/src/libs/axiosInstance";
import endpoint from "@/src/constants/endpoint";
import { MessageResult, NewThreadResult, ThreadDate } from "@/src/types/threadTypes";
import { DiaryResult } from "@/src/types/calendarTypes";

export const newThreadFn = async ({
  aiProfileId,
  year,
  month,
  day,
}: ThreadDate & { aiProfileId: number }) => {
  const { data } = await axiosInstance.post<NewThreadResult>(
    `${endpoint.thread.chat}?aiProfileId=${aiProfileId}&year=${year}&month=${month}&day=${day}`
  );
  return data;
};

export const getMessagesFn = async ({ year, month, day }: ThreadDate) => {
  const { data } = await axiosInstance.get<MessageResult>(
    `${endpoint.thread.chat}?year=${year}&month=${month}&day=${day}`
  );
  console.log(data);
  return data;
};

export const changeAiFn = async ({
  aiProfileId,
  year,
  month,
  day,
}: ThreadDate & { aiProfileId: number }) => {
  const { data } = await axiosInstance.patch(
    `${endpoint.thread.changeAi}?aiProfileId=${aiProfileId}&year=${year}&month=${month}&day=${day}`
  );
  return data;
};

export const threadSummary = async ({ year, month, day }: ThreadDate) => {
  const { data } = await axiosInstance.post<DiaryResult>(
    `${endpoint.thread.summary}?year=${year}&month=${month}&day=${day}`
  );
  return data;
};
