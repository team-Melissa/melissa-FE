import axiosInstance from "@/src/libs/axiosInstance";
import type { MakeAssistantDTO, TMakeAssistantAnswers } from "../types/makeAssistantTypes";
import endpoint from "@/src/constants/endpoint";

export const _makeAssistant = async (answers: TMakeAssistantAnswers) => {
  const { data } = await axiosInstance.post<MakeAssistantDTO>(endpoint.aiProfile, answers);
  return data;
};
