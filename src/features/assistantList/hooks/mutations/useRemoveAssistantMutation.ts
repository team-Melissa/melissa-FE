import { useMutation, useQueryClient } from "@tanstack/react-query";
import showToast from "@/src/libs/showToast";
import axiosInstance from "@/src/libs/axiosInstance";
import toastMessage from "@/src/constants/toastMessage";
import endpoint from "@/src/constants/endpoint";
import type { SuccessDTO } from "@/src/types/commonTypes";

const _removeAssistant = async (aiProfileId: number) => {
  const { data } = await axiosInstance.delete<SuccessDTO>(endpoint.aiProfile, { params: { aiProfileId } });
  return data;
};

export const useRemoveAssistantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: _removeAssistant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assistant-list"] });
      showToast(toastMessage.removeAssistant.success, "success");
    },
    onError: (error) => {
      console.error(error.response?.data);
      showToast(toastMessage.removeAssistant.failed, "error");
    },
  });
};
