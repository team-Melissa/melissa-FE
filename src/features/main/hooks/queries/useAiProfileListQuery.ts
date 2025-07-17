import axiosInstance from "@/src/libs/axiosInstance";
import type { AiProfileListDTO } from "../../types/aiProfileTypes";
import endpoint from "@/src/constants/endpoint";
import { useQuery } from "@tanstack/react-query";

const getUserAiProfileList = async () => {
  const result = await axiosInstance.get<AiProfileListDTO>(endpoint.aiProfile.aiProfilesV1);

  return result.data.result;
};

const getDefaultAiProfileList = async () => {
  const result = await axiosInstance<AiProfileListDTO>(endpoint.aiProfile.defaultAiProfiles);

  return result.data.result;
};

const getAiProfileList = async () => {
  const [defaultAiProfiles, userAiProfiles] = await Promise.all([getDefaultAiProfileList(), getUserAiProfileList()]);

  return [...defaultAiProfiles, ...userAiProfiles];
};

export const AI_PROFILE_LIST_QUERY_KEY = "AI_PROFILE_LIST_QUERY_KEY";

export const useAiProfileListQuery = () => {
  return useQuery({
    queryFn: getAiProfileList,
    queryKey: [AI_PROFILE_LIST_QUERY_KEY],
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return 3000;
      const isRefetch = data.find((d) => !!d.profileName && !d.imageUrl);
      return isRefetch ? 2000 : false;
    },
  });
};
