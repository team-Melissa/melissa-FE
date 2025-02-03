import endpoint from "@/src/constants/endpoint";
import axiosInstance from "@/src/libs/axiosInstance";
import { CheckNewUserType, RegisterSettingType, UserSettingResult } from "@/src/types/settingTypes";

export const registerSettingFn = async () => {
  const { data } = await axiosInstance.post<RegisterSettingType>(endpoint.setting.register);
  return data;
};

export const checkNewUserFn = async () => {
  const { data } = await axiosInstance.get<CheckNewUserType>(endpoint.setting.checkNew);
  console.log(data);
  return data;
};

export const getUserSettingFn = async () => {
  const { data } = await axiosInstance.get<UserSettingResult>(endpoint.setting.setting);
  console.log(data);
  return data;
};

export const putUserSettingFn = async (variable: {
  sleepTime: string;
  notificationTime: string;
  notificationSummary: boolean;
}) => {
  const { data } = await axiosInstance.put<UserSettingResult>(endpoint.setting.setting, variable);
  return data;
};
