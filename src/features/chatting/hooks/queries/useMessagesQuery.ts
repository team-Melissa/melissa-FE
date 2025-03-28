import { useQuery } from "@tanstack/react-query";
import endpoint from "@/src/constants/endpoint";
import axiosInstance from "@/src/libs/axiosInstance";
import type { MessagesDTO, TThreadDate } from "../../types/chattingTypes";

export const _getMessages = async ({ year, month, day }: TThreadDate) => {
  const { data } = await axiosInstance.get<MessagesDTO>(endpoint.thread.chat, { params: { year, month, day } });
  console.log(data);
  return data;
};

/**
 * @description 채팅 리스트를 가져오는 query
 */
export const useMessagesQuery = ({ year, month, day }: TThreadDate) => {
  return useQuery({
    queryFn: () => _getMessages({ year, month, day }),
    queryKey: ["messages", year, month, day],
  });
};
