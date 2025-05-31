import axiosInstance from "@/src/libs/axiosInstance";
import endpoint from "@/src/constants/endpoint";
import type { MakeAssistantDTO, TAssistantMakeQnA } from "../types/makeAssistantTypes";

export const _makeAssistant = async (answers: TAssistantMakeQnA) => {
  const { data } = await axiosInstance.post<MakeAssistantDTO>(endpoint.aiProfile.aiProfilesV2, answers);
  return data;
};
