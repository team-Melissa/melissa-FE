import endpoint from "@/src/constants/endpoint";
import axiosInstance from "@/src/libs/axiosInstance";
import { CheckNewUserType, RegisterSettingType } from "@/src/types/settingTypes";

export const registerSettingFn = async () => {
  const { data } = await axiosInstance.post<RegisterSettingType>(endpoint.setting.register);
  return data;
};

export const checkNewUserFn = async () => {
  const { data } = await axiosInstance.get<CheckNewUserType>(endpoint.setting.checkNew);
  console.log(data);
  return data;
};
