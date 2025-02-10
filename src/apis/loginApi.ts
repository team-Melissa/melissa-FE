import { login } from "@react-native-seoul/kakao-login";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as AppleAuthentication from "expo-apple-authentication";
import axiosInstance from "../libs/axiosInstance";
import endpoint from "../constants/endpoint";
import { SuccessResponse } from "@/src/types/commonTypes";
import { DeleteAccount, LoginType } from "@/src/types/loginTypes";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
});

export const googleLoginFn = async () => {
  const { data } = await GoogleSignin.signIn();
  if (!data) throw new Error("Google 로그인 실패: idToken이 없습니다.");

  const result = await axiosInstance.post<LoginType>(endpoint.auth.google, {
    idToken: data.idToken,
  });
  return result.data;
};

export const kakaoLoginFn = async () => {
  const { accessToken } = await login();
  const { data } = await axiosInstance.post<LoginType>(endpoint.auth.kakao, { accessToken });
  return data;
};

export const appleLoginFn = async () => {
  const { identityToken } = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
  });
  const { data } = await axiosInstance.post<LoginType>(endpoint.auth.apple, {
    idToken: identityToken,
  });
  return data;
};

export const logoutFn = async () => {
  const { data } = await axiosInstance.post<SuccessResponse>(endpoint.auth.logout);
  return data;
};

export const deleteAccountFn = async () => {
  const { data } = await axiosInstance.delete<DeleteAccount>(endpoint.auth.delete);
  return data;
};
