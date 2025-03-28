import axiosInstance from "@/src/libs/axiosInstance";
import endpoint from "@/src/constants/endpoint";
import type { MakeAssistantQuestionDTO } from "../../types/makeAssistantTypes";
import { useQuery } from "@tanstack/react-query";

const _getAssistantQuestion = async (aiProfileId: string) => {
  const { data } = await axiosInstance.get<MakeAssistantQuestionDTO>(`${endpoint.aiProfile}/${aiProfileId}/question`);
  return data;
};

export const useMakeAssistantQuestionQuery = (aiProfileId?: string) => {
  return useQuery({
    queryFn: () => (aiProfileId ? _getAssistantQuestion(aiProfileId) : Promise.reject("No aiProfileId")),
    queryKey: ["make-assistant-question", aiProfileId ?? ""],
    enabled: !!aiProfileId,
  });
};
