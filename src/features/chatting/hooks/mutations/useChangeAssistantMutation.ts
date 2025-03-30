import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import axiosInstance from "@/src/libs/axiosInstance";
import showToast from "@/src/libs/showToast";
import toastMessage from "@/src/constants/toastMessage";
import endpoint from "@/src/constants/endpoint";
import type { TThreadDate } from "../../types/chattingTypes";

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
export const useChangeAssistantMutation = (setIsVisible: Dispatch<SetStateAction<boolean>>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: _changeAssistant,
    onSuccess: (_, { year, month, day }) => {
      queryClient.invalidateQueries({ queryKey: ["messages", year, month, day] });
      queryClient.invalidateQueries({ queryKey: ["aiProfileId"] });
      showToast(toastMessage.changeAssistant.success, "success");
      setIsVisible(false);
    },
    onError: (error) => {
      console.error(error.response?.data);
      showToast(toastMessage.changeAssistant.failed, "error");
    },
  });
};
