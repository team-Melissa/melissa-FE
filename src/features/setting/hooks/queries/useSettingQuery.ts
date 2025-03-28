import axiosInstance from "@/src/libs/axiosInstance";
import endpoint from "@/src/constants/endpoint";
import type { UserSettingDTO } from "../../types/settingTypes";
import { useQuery } from "@tanstack/react-query";

const _userSetting = async () => {
  const { data } = await axiosInstance.get<UserSettingDTO>(endpoint.setting.setting);
  return data;
};

export const useSettingQuery = () => {
  return useQuery({
    queryFn: _userSetting,
    queryKey: ["user-setting"],
    staleTime: 5 * 60 * 1000,
  });
};
