import endpoint from "@/src/constants/endpoint";
import axiosInstance from "@/src/libs/axiosInstance";
import { SuccessDTO } from "@/src/types/commonTypes";
import { useQuery } from "@tanstack/react-query";

type AiProfileIdDTO = SuccessDTO & {
  result: {
    aiProfileId: number;
  };
};

const getRecentAiProfileId = async () => {
  const { data } = await axiosInstance<AiProfileIdDTO>(endpoint.aiProfile.recent);
  return data.result.aiProfileId;
};

export const RECENT_AI_PROFILE_ID_QUERY_KEY = "RECENT_AI_PROFILE_ID_QUERY_KEY";

export const useRecentAiProfileIdQuery = () => {
  return useQuery({
    queryFn: getRecentAiProfileId,
    queryKey: [RECENT_AI_PROFILE_ID_QUERY_KEY],
  });
};
