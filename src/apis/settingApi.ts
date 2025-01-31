import endpoint from "@/src/constants/endpoint";
import axiosInstance from "@/src/libs/axiosInstance";
import { RegisterSettingType } from "@/src/types/settingTypes";

export const registerSettingFn = async () => {
  const { data } = await axiosInstance.post<RegisterSettingType>(endpoint.setting.register);
  return data;
};
