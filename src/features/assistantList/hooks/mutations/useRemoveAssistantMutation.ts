import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/src/modules/toast";
import axiosInstance from "@/src/libs/axiosInstance";
import toastMessage from "@/src/constants/toastMessage";
import endpoint from "@/src/constants/endpoint";
import type { SuccessDTO } from "@/src/types/commonTypes";

const _removeAssistant = async (aiProfileId: number) => {
  const { data } = await axiosInstance.delete<SuccessDTO>(endpoint.aiProfile.aiProfile, { params: { aiProfileId } });
  return data;
};

export const useRemoveAssistantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: _removeAssistant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assistant-list"] });
      toast(toastMessage.removeAssistant.success);
    },
    onError: (error) => {
      console.error(error.response?.data);
      toast(toastMessage.removeAssistant.failed);
    },
  });
};
