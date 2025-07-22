import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/src/libs/axiosInstance";
import endpoint from "@/src/constants/endpoint";
import { _getMessages, MESSAGES_QUERY_KEY } from "../queries/useMessagesQuery";
import type { NewThreadDTO, TThreadDate } from "../../types/chattingTypes";

export const _postMakeThread = async ({ aiProfileId, year, month, day }: TThreadDate & { aiProfileId: number }) => {
  const { data } = await axiosInstance.post<NewThreadDTO>(endpoint.thread.chat, null, {
    params: { aiProfileId, year, month, day },
  });
  return data;
};

/**
 * @description 채팅방(스레드)을 생성하는 mutation
 */
export const useMakeThreadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: _postMakeThread,
    onSuccess: ({ result }) => {
      queryClient.prefetchQuery({
        queryFn: () => _getMessages({ year: result.year, month: result.month, day: result.day }),
        queryKey: [MESSAGES_QUERY_KEY, result.year, result.month, result.day],
      });
    },
    onError: (error) => console.error(error.response),
  });
};
