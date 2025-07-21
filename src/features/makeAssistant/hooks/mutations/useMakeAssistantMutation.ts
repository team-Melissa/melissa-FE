import { useMemo } from "react";
import { useRouter } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MakeAssistantDTO, TAssistantMakeQnA } from "../../types/makeAssistantTypes";
import axiosInstance from "@/src/libs/axiosInstance";
import endpoint from "@/src/constants/endpoint";
import { AI_PROFILE_LIST_QUERY_KEY } from "@/src/features/main/hooks/queries/useAiProfileListQuery";

type TProps = {
  answers: string[];
};

const makeAiProfile = async (answers: TAssistantMakeQnA) => {
  const { data } = await axiosInstance.post<MakeAssistantDTO>(endpoint.aiProfile.aiProfilesV2, answers);
  return data;
};

export const useMakeAssistantMutation = ({ answers }: TProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const answersJson = useMemo(
    () =>
      answers.reduce((prev, cur, idx) => {
        prev[`q${idx + 1}` as keyof TAssistantMakeQnA] = cur;
        return prev;
      }, {} as TAssistantMakeQnA),
    [answers]
  );

  const handleSuccess = (data: MakeAssistantDTO) => {
    console.log(data.message);
    queryClient.invalidateQueries({ queryKey: [AI_PROFILE_LIST_QUERY_KEY] });
    setTimeout(() => {
      console.log("이전 페이지로 back 합니다.");
      router.back();
    }, 2500);
  };

  return useMutation({
    mutationFn: () => makeAiProfile(answersJson),
    onSuccess: (data) => handleSuccess(data),
    onError: (error) => console.error(error.response?.data),
  });
};
