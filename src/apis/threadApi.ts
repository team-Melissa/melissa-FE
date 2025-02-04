import axiosInstance from "@/src/libs/axiosInstance";
import endpoint from "@/src/constants/endpoint";
import { NewThreadResult, ThreadDate } from "@/src/types/threadTypes";

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
  const { data } = await axiosInstance.get(
    `${endpoint.thread.chat}?year=${year}&month=${month}&day=${day}`
  );
  console.log(data);
  return data;
};
