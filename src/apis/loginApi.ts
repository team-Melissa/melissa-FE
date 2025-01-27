import { login } from "@react-native-seoul/kakao-login";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import LoginType from "@/src/types/loginTypes";
import axiosInstance from "../libs/axiosInstance";
import endpoint from "../constants/endpoint";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
});

export const kakaoLoginFn = async () => {
  const { accessToken } = await login();
  const { data } = await axiosInstance.post<LoginType>(endpoint.auth.kakao, { accessToken });
  return data;
};

export const googleLoginFn = async () => {
  const { data } = await GoogleSignin.signIn();
  if (data?.idToken) {
    const { data: backendData } = await axiosInstance.post<LoginType>(endpoint.auth.google, {
      idToken: data.idToken,
    });
    console.log(backendData);
    return backendData;
  }
};
