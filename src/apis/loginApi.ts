import { login } from "@react-native-seoul/kakao-login";
import LoginType from "@/src/types/loginTypes";
import axiosInstance from "../libs/axiosInstance";
import endpoint from "../constants/endpoint";

export const kakaoLoginFn = async () => {
  const { accessToken } = await login();
  const { data } = await axiosInstance.post<LoginType>(endpoint.auth.kakao, { accessToken });
  return data;
};
