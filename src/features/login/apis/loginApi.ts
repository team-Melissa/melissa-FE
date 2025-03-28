import { login } from "@react-native-seoul/kakao-login";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as AppleAuthentication from "expo-apple-authentication";
import axiosInstance from "@/src/libs/axiosInstance";
import endpoint from "@/src/constants/endpoint";
import type { LoginDTO } from "../types/loginTypes";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
});

export const _googleLogin = async () => {
  const { data } = await GoogleSignin.signIn();
  if (!data) throw new Error("Google 로그인 실패: idToken이 없습니다.");
  const result = await axiosInstance.post<LoginDTO>(endpoint.auth.google, {
    idToken: data.idToken,
  });
  return result.data;
};

export const _kakaoLogin = async () => {
  const { accessToken } = await login();
  const { data } = await axiosInstance.post<LoginDTO>(endpoint.auth.kakao, { accessToken });
  return data;
};

export const _appleLogin = async () => {
  const { identityToken } = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
  });
  const { data } = await axiosInstance.post<LoginDTO>(endpoint.auth.apple, {
    idToken: identityToken,
  });
  return data;
};
