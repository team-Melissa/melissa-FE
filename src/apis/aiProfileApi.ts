import axiosInstance from "@/src/libs/axiosInstance";
import endpoint from "@/src/constants/endpoint";
import {
  AiProfileListResult,
  AiProfileListWithGenerateAiTrigger,
  AiProfileMakeAnswers,
  AiProfileMakeResult,
} from "@/src/types/aiProfileTypes";

export const makeAssistantFn = async (answers: AiProfileMakeAnswers) => {
  const { data } = await axiosInstance.post<AiProfileMakeResult>(endpoint.aiProfile, answers);
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
