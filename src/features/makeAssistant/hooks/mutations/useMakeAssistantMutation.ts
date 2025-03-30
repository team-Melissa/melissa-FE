import { useMemo } from "react";
import { useRouter } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIsNewUserContext } from "@/src/contexts/isNewUserProvider";
import { _makeAssistant } from "../../apis/makeAssistantApi";
import type { MakeAssistantDTO, TAssistantMakeQnA } from "../../types/makeAssistantTypes";

type TProps = {
  answers: string[];
};

export const useMakeAssistantMutation = ({ answers }: TProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const isNewUser = useIsNewUserContext();

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
    if (isNewUser) {
      console.log("새로운 유저입니다.");
      setTimeout(() => {
        console.log("/main으로 리다이렉트합니다.");
        router.replace("/(app)/main");
      }, 2500);
    } else {
      console.log("기존 유저입니다.");
      queryClient.invalidateQueries({ queryKey: ["assistant-list"] });
      setTimeout(() => {
        console.log("이전 페이지로 back 합니다.");
        router.back();
      }, 2500);
    }
  };

  return useMutation({
    mutationFn: () => _makeAssistant(answersJson),
    onSuccess: (data) => handleSuccess(data),
    onError: (error) => console.error(error.response?.data),
  });
};
