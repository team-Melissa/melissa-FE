import endpoint from "@/src/constants/endpoint";
import axiosInstance from "@/src/libs/axiosInstance";
import { CheckNewUserType } from "@/src/types/settingTypes";

export const checkNewUserFn = async () => {
  const { data } = await axiosInstance.get<CheckNewUserType>(endpoint.setting.checkNew);
  console.log(data);
  return data;
};
