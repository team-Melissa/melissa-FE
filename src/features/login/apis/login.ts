import { appleLogin, googleLogin, kakaoLogin } from '@/src/apis/_generated/serverAPI';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { login } from '@react-native-seoul/kakao-login';
import * as AppleAuthentication from 'expo-apple-authentication';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
});

export const googleLoginMutateFn = async () => {
  const { data } = await GoogleSignin.signIn();
  if (!data || !data.idToken) throw new Error('Google 로그인 실패: idToken이 없습니다.');
  return googleLogin({ idToken: data.idToken });
};

export const kakaoLoginMutateFn = async () => {
  const { accessToken } = await login();
  return kakaoLogin({ accessToken });
};

export const appleLoginMutateFn = async () => {
  const { identityToken } = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
  });
  if (!identityToken) throw new Error('Apple 로그인 실패: identityToken이 없습니다.');
  return appleLogin({ idToken: identityToken });
};
