import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/src/libs/axiosInstance";
import endpoint from "@/src/constants/endpoint";
import type { AssistantProfileListDTO, TAssistantProfile, TNewAiTrigger } from "../../types/assistantListTypes";

export const _getAssistantListWithNewAiTrigger = async () => {
  const { data } = await axiosInstance.get<AssistantProfileListDTO>(endpoint.aiProfile.aiProfilesV1);
  const dataWithNewAiTrigger: (TAssistantProfile | TNewAiTrigger)[] = [...data.result, { isGenerateButton: true }];
  return dataWithNewAiTrigger;
};

export const useAssistantListQuery = () => {
  return useQuery({
    queryFn: _getAssistantListWithNewAiTrigger,
    queryKey: ["assistant-list"],
  });
};
