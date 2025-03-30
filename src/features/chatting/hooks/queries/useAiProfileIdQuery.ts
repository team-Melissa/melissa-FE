import endpoint from "@/src/constants/endpoint";
import axiosInstance from "@/src/libs/axiosInstance";
import { SuccessDTO } from "@/src/types/commonTypes";
import { useQuery } from "@tanstack/react-query";

type AiProfileIdDTO = SuccessDTO & {
  result: {
    aiProfileId: number;
  };
};

const _getAiProfileId = async () => {
  const { data } = await axiosInstance<AiProfileIdDTO>(endpoint.aiProfile.recent);
  return data.result.aiProfileId;
};

export const useAiProfileIdQuery = () => {
  return useQuery({
    queryFn: _getAiProfileId,
    queryKey: ["aiProfileId"],
  });
};
