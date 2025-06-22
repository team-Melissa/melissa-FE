import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/src/libs/axiosInstance";
import endpoint from "@/src/constants/endpoint";
import type { AssistantProfileListDTO, TAssistantProfile, TNewAiTrigger } from "../../types/assistantListTypes";

export const _getAssistantListWithNewAiTrigger = async () => {
  const { data } = await axiosInstance.get<AssistantProfileListDTO>(endpoint.aiProfile.aiProfilesV1);
  const dataWithNewAiTrigger: (TAssistantProfile | TNewAiTrigger)[] = [...data.result, { isGenerateButton: true }];
  return dataWithNewAiTrigger;
};

const _isAssistantProfile = (item: TAssistantProfile | TNewAiTrigger): item is TAssistantProfile => {
  return (item as TAssistantProfile).aiProfileId !== undefined;
};

export const useAssistantListQuery = () => {
  return useQuery({
    queryFn: _getAssistantListWithNewAiTrigger,
    queryKey: ["assistant-list"],
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return 3000;
      const isRefetch = data.filter(_isAssistantProfile).find((d) => !!d.profileName && !d.imageUrl);
      return isRefetch ? 2000 : false;
    },
  });
};
