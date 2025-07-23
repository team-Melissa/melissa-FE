import { useQuery } from "@tanstack/react-query";
import endpoint from "@/src/constants/endpoint";
import axiosInstance from "@/src/libs/axiosInstance";
import type { MessagesDTO, TThreadDate } from "../../types/chattingTypes";

export const _getMessages = async ({ year, month, day }: TThreadDate) => {
  const { data } = await axiosInstance.get<MessagesDTO>(endpoint.thread.chat, { params: { year, month, day } });
  console.log(data);
  return data;
};

export const MESSAGES_QUERY_KEY = "MESSAGES_QUERY_KEY";

/**
 * @description 채팅 리스트를 가져오는 query
 */
export const useMessagesQuery = ({ year, month, day }: TThreadDate) => {
  return useQuery({
    queryFn: () => _getMessages({ year, month, day }),
    queryKey: [MESSAGES_QUERY_KEY, year, month, day],
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return 3000;
      const isRefetch = !!data.result.aiProfileName && !data.result.aiProfileImageS3;
      return isRefetch ? 2000 : false;
    },
  });
};
