import { useMemo } from "react";
import { useRouter } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { _makeAssistant } from "../../apis/makeAssistantApi";
import type { MakeAssistantDTO, TAssistantMakeQnA } from "../../types/makeAssistantTypes";

type TProps = {
  answers: string[];
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
    queryClient.invalidateQueries({ queryKey: ["assistant-list"] });
    setTimeout(() => {
      console.log("이전 페이지로 back 합니다.");
      router.back();
    }, 2500);
  };

  return useMutation({
    mutationFn: () => _makeAssistant(answersJson),
    onSuccess: (data) => handleSuccess(data),
    onError: (error) => console.error(error.response?.data),
  });
};
