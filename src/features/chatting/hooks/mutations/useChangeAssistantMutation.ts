import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/src/libs/axiosInstance";
import { toast } from "@/src/modules/toast";
import toastMessage from "@/src/constants/toastMessage";
import endpoint from "@/src/constants/endpoint";
import type { TThreadDate } from "../../types/chattingTypes";
import { MESSAGES_QUERY_KEY } from "../queries/useMessagesQuery";
import { AI_PROFILE_LIST_QUERY_KEY } from "@/src/features/main/hooks/queries/useAiProfileListQuery";

type TProps = TThreadDate & { aiProfileId: number };

const _changeAssistant = async ({ aiProfileId, year, month, day }: TProps) => {
  const { data } = await axiosInstance.patch(endpoint.thread.changeAi, null, {
    params: { aiProfileId, year, month, day },
  });
  return data;
};

/**
 * @description 선택된 AI 프로필을 변경하는 mutation
 */
export const useChangeAssistantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: _changeAssistant,
    onSuccess: (_, { year, month, day }) => {
      queryClient.invalidateQueries({ queryKey: [MESSAGES_QUERY_KEY, year, month, day] });
      queryClient.invalidateQueries({ queryKey: [AI_PROFILE_LIST_QUERY_KEY] });
      toast({ message: toastMessage.changeAssistant.success, options: { type: "success" } });
    },
    onError: (error) => {
      console.error(error.response?.data);
      toast({ message: toastMessage.changeAssistant.error, options: { type: "error" } });
    },
  });
};
