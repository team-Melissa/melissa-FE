import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/src/modules/toast";
import axiosInstance from "@/src/libs/axiosInstance";
import toastMessage from "@/src/constants/toastMessage";
import endpoint from "@/src/constants/endpoint";
import type { SuccessDTO } from "@/src/types/commonTypes";
import { useRouter } from "expo-router";
import { AI_PROFILE_LIST_QUERY_KEY } from "@/src/features/main/hooks/queries/useAiProfileListQuery";

const removeAssistant = async (aiProfileId: number) => {
  const { data } = await axiosInstance.delete<SuccessDTO>(`${endpoint.aiProfile.aiProfilesV1}/${aiProfileId}`);
  return data;
};

export const useRemoveAssistantMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: removeAssistant,
    onSettled: () => {
      router.replace("/(app)/main");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AI_PROFILE_LIST_QUERY_KEY] });
      toast({ message: toastMessage.removeAssistant.success, options: { type: "success" } });
    },
    onError: (error) => {
      console.error(error.response?.data);
      toast({ message: toastMessage.removeAssistant.error, options: { type: "error" } });
    },
  });
};
