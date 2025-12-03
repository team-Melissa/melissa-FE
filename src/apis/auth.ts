import axiosInstance from '@/src/libs/axiosInstance';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { login } from '@react-native-seoul/kakao-login';
import * as AppleAuthentication from 'expo-apple-authentication';
import type { OAuthProvider, SuccessDTO } from '../types/commonTypes';

export type LoginDTO = SuccessDTO & {
  result: {
    userId: number;
    oauthProvider: OAuthProvider;
    email: string;
    nickname: string;
    accessToken: string;
    refreshToken: string;
    tokenType: string;
  };
};

export type DeleteAccountDTO = SuccessDTO & {
  result: {
    userId: number;
    oauthProvider: 'KAKAO' | 'GOOGLE' | 'APPLE';
    providerId: 'string';
    email: 'string';
    nickname: 'string';
  };
};

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
});

export const googleLogin = async () => {
  const { data } = await GoogleSignin.signIn();
  if (!data) throw new Error('Google 로그인 실패: idToken이 없습니다.');
  const result = await axiosInstance.post<LoginDTO>('/api/v1/auth/google', {
    idToken: data.idToken,
  });
  console.log('구글 로그인 성공: ', data);
  return result.data;
};

export const kakaoLogin = async () => {
  const { accessToken } = await login();
  const { data } = await axiosInstance.post<LoginDTO>('/api/v1/auth/kakao', { accessToken });
  console.log('카카오 로그인 성공: ', data);
  return data;
};

export const appleLogin = async () => {
  const { identityToken } = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
  });
  const { data } = await axiosInstance.post<LoginDTO>('/api/v1/auth/apple', {
    idToken: identityToken,
  });
  console.log('애플 로그인 성공: ', data);
  return data;
};

export const logout = async () => {
  const { data } = await axiosInstance.post<SuccessDTO>('/api/v1/auth/logout');
  console.log('로그아웃 성공: ', data);
  return data;
};

export const deleteAccount = async () => {
  const { data } = await axiosInstance.delete<DeleteAccountDTO>('/api/v1/user');
  console.log('회원탈퇴 성공: ', data);
  return data;
};
