import axiosInstance from "@/src/libs/axiosInstance";
import endpoint from "@/src/constants/endpoint";
import {
  AiProfileListResult,
  AiProfileListWithGenerateAiTrigger,
  AiProfileMakeAnswers,
  AiProfileMakeResult,
  GetMakeAssistantQuestionResult,
} from "@/src/types/aiProfileTypes";
import { SuccessDTO } from "@/src/types/commonTypes";

export const makeAssistantFn = async (answers: AiProfileMakeAnswers) => {
  const { data } = await axiosInstance.post<AiProfileMakeResult>(endpoint.aiProfile, answers);
  return data;
};

export const getMakeAssistantQuestionFn = async (aiProfileId: string) => {
  const { data } = await axiosInstance.get<GetMakeAssistantQuestionResult>(
    `${endpoint.aiProfile}/${aiProfileId}/question`
  );
  console.log(data);
  return data;
};

export const removeAssistantFn = async (aiProfileId: number) => {
  const { data } = await axiosInstance.delete<SuccessDTO>(`${endpoint.aiProfile}/${aiProfileId}`);
  return data;
};

export const assistantListFn = async () => {
  const { data } = await axiosInstance.get<AiProfileListResult>(endpoint.aiProfile);
  const dataWithGenerateAiTrigger: AiProfileListWithGenerateAiTrigger[] = [
    ...data.result,
    { isGenerateButton: true },
  ];
  console.log(dataWithGenerateAiTrigger);
  return dataWithGenerateAiTrigger;
};
