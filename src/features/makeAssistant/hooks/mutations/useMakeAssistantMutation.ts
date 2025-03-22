import { useMemo } from "react";
import { useRouter } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIsNewUserContext } from "@/src/contexts/IsNewUserProvider";
import { setAiProfileId } from "@/src/libs/mmkv";
import { _makeAssistant } from "../../apis/makeAssistantApi";
import type { MakeAssistantDTO, TMakeAssistantAnswers } from "../../types/makeAssistantTypes";

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
        prev[`q${idx + 1}` as keyof TMakeAssistantAnswers] = cur;
        return prev;
      }, {} as TMakeAssistantAnswers),
    [answers]
  );

  const handleSuccess = (data: MakeAssistantDTO) => {
    console.log(data.message);
    if (isNewUser) {
      console.log("새로운 유저입니다. mmkv에 생성된 어시스턴트 id를 저장합니다...");
      setAiProfileId(data.result.aiProfileId);
      setTimeout(() => {
        console.log("/main으로 리다이렉트합니다.");
        router.replace("/(app)/main");
      }, 2500);
    } else {
      console.log("기존 유저입니다. mmkv를 그대로 둡니다...");
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
