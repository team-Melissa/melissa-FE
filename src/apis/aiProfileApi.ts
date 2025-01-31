import axiosInstance from "@/src/libs/axiosInstance";
import endpoint from "@/src/constants/endpoint";
import { AiProfileMakeAnswers, AiProfileMakeResult } from "@/src/types/aiProfileTypes";

export const makeAssistantFn = async (answers: AiProfileMakeAnswers) => {
  const { data } = await axiosInstance.post<AiProfileMakeResult>(endpoint.aiProfile, answers);
  console.log(data);
  return data;
};
