import axiosInstance from "@/src/libs/axiosInstance";
import endpoint from "@/src/constants/endpoint";
import { GetMakeAssistantQuestionResult } from "@/src/types/aiProfileTypes";

export const getMakeAssistantQuestionFn = async (aiProfileId: string) => {
  const { data } = await axiosInstance.get<GetMakeAssistantQuestionResult>(
    `${endpoint.aiProfile}/${aiProfileId}/question`
  );
  console.log(data);
  return data;
};
