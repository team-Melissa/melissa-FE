import axiosInstance from "@/src/libs/axiosInstance";
import endpoint from "@/src/constants/endpoint";
import type { MakeAssistantQuestionDTO } from "../../types/makeAssistantTypes";
import { skipToken, useQuery } from "@tanstack/react-query";

const _getAssistantQuestion = async (aiProfileId: string) => {
  const { data } = await axiosInstance.get<MakeAssistantQuestionDTO>(
    `${endpoint.aiProfile.aiProfilesV1}/${aiProfileId}/question`
  );
  return data;
};

export const useMakeAssistantQuestionQuery = (aiProfileId?: string) => {
  return useQuery({
    queryFn: !!aiProfileId ? () => _getAssistantQuestion(aiProfileId) : skipToken,
    queryKey: ["make-assistant-question", aiProfileId],
    enabled: !!aiProfileId,
  });
};
