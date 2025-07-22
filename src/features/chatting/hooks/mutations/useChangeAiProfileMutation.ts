import endpoint from "@/src/constants/endpoint";
import toastMessage from "@/src/constants/toastMessage";
import { MESSAGES_QUERY_KEY } from "@/src/features/chatting/hooks/queries/useMessagesQuery";
import axiosInstance from "@/src/libs/axiosInstance";
import { toast } from "@/src/modules/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Params = {
  year: number;
  month: number;
  day: number;
  aiProfileId: number;
};

const changeAiProfile = async (params: Params) => {
  const result = await axiosInstance.patch(endpoint.thread.changeAi, null, { params });

  return result.data;
};

export const useChangeAiProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeAiProfile,
    onSuccess: (_, { year, month, day }) => {
      queryClient.invalidateQueries({ queryKey: [MESSAGES_QUERY_KEY, year, month, day] });
    },
    onError: (error) => {
      console.error(error.response?.data);
      toast({ message: toastMessage.changeAssistant.error, options: { type: "error" } });
    },
  });
};
