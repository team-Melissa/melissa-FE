import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/src/libs/axiosInstance";
import endpoint from "@/src/constants/endpoint";
import type { SuccessDTO } from "@/src/types/commonTypes";

type UserSettingDTO = SuccessDTO & {
  result: {
    sleepTime: string;
    notificationTime: string;
    notificationSummary: boolean;
  };
};

const _getUserSetting = async () => {
  const { data } = await axiosInstance.get<UserSettingDTO>(endpoint.setting.setting);
  return data.result;
};

/**
 * @description 채팅방(스레드)을 만들지 결정하는 sleepTime을 가져오는 query
 */
export const useSleepTimeQuery = () => {
  return useQuery({
    queryFn: _getUserSetting,
    queryKey: ["user-setting"],
    staleTime: 5 * 60 * 1000,
    select: (data) => data.sleepTime,
  });
};
