import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/src/libs/axiosInstance";
import endpoint from "@/src/constants/endpoint";
import type { AssistantProfileListDTO, TAssistantProfile, TNewAiTrigger } from "../../types/assistantListTypes";

export const _assistantListWithNewAiTrigger = async () => {
  const { data } = await axiosInstance.get<AssistantProfileListDTO>(endpoint.aiProfile);
  const dataWithNewAiTrigger: (TAssistantProfile | TNewAiTrigger)[] = [...data.result, { isGenerateButton: true }];
  return dataWithNewAiTrigger;
};

export const useAssistantListQuery = () => {
  return useQuery({
    queryFn: _assistantListWithNewAiTrigger,
    queryKey: ["assistant-list"],
  });
};
