import { login } from "@react-native-seoul/kakao-login";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axiosInstance from "../libs/axiosInstance";
import endpoint from "../constants/endpoint";
import { LoginType } from "@/src/types/loginTypes";
import { CheckNewUser } from "@/src/types/settingTypes";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
});

export const googleLoginFn = async () => {
  const { data } = await GoogleSignin.signIn();
  const result = await axiosInstance.post<LoginType>(endpoint.auth.google, {
    idToken: data?.idToken,
  });
  return result.data;
};

export const kakaoLoginFn = async () => {
  const { accessToken } = await login();
  const { data } = await axiosInstance.post<LoginType>(endpoint.auth.kakao, { accessToken });
  return data;
};

export const checkNewUserFn = async () => {
  const { data } = await axiosInstance.get<CheckNewUser>(endpoint.setting.checkNew);
  console.log(data);
  return data;
};
