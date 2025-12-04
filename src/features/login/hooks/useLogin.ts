import { useAppleLogin, useGoogleLogin, useKakaoLogin, useRegisterToken } from '@/src/apis/_generated/serverAPI';
import type { ApiResponseOAuthLoginResultDTO } from '@/src/apis/_generated/serverAPI.schemas';
import toastMessage from '@/src/constants/toastMessage';
import { getNotificationToken, setAccessToken, setOAuthProvider } from '@/src/libs/mmkv';
import { setRefreshToken } from '@/src/libs/secureStorage';
import { toast } from '@/src/modules/toast';
import type { OAuthProvider } from '@/src/types/commonTypes';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { login } from '@react-native-seoul/kakao-login';
import { useQueryClient } from '@tanstack/react-query';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useRouter } from 'expo-router';
import { Platform } from 'react-native';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
});

const getPlatform = () => {
  if (Platform.OS === 'ios') return 'IOS';
  if (Platform.OS === 'android') return 'ANDROID';
  return null;
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLoginSuccess = async (data: ApiResponseOAuthLoginResultDTO) => {
    if (!data.result) return;

    const { accessToken, refreshToken, oauthProvider } = data.result;
    setAccessToken(accessToken);
    await setRefreshToken(refreshToken);
    if (oauthProvider) setOAuthProvider(oauthProvider as OAuthProvider);

    const expoPushToken = getNotificationToken();
    const platform = getPlatform();
    if (expoPushToken && platform) registerExpoPushTokenMutate({ data: { expoPushToken, platform } });

    queryClient.invalidateQueries({ queryKey: [] });
    router.replace('/(app)');
    toast({ message: toastMessage.login.success, options: { type: 'success' } });
  };

  const handleLoginError = () => {
    toast({ message: toastMessage.login.error, options: { type: 'error' } });
  };

  const { mutate: registerExpoPushTokenMutate } = useRegisterToken();

  const { isPending: kakaoIsPending, mutate: kakaoLoginMutate } = useKakaoLogin({
    mutation: {
      onSuccess: handleLoginSuccess,
      onError: handleLoginError,
    },
  });

  const { isPending: googleIsPending, mutate: googleLoginMutate } = useGoogleLogin({
    mutation: {
      onSuccess: handleLoginSuccess,
      onError: handleLoginError,
    },
  });

  const { isPending: appleIsPending, mutate: appleLoginMutate } = useAppleLogin({
    mutation: {
      onSuccess: handleLoginSuccess,
      onError: handleLoginError,
    },
  });

  const isPending = kakaoIsPending || googleIsPending || appleIsPending;

  const kakaoLogin = async () => {
    const { accessToken } = await login();
    kakaoLoginMutate({ data: { accessToken } });
  };

  const googleLogin = async () => {
    const { data } = await GoogleSignin.signIn();
    if (!data || !data.idToken) throw new Error('Google 로그인 실패: idToken이 없습니다.');
    googleLoginMutate({ data: { idToken: data.idToken } });
  };

  const appleLogin = async () => {
    const { identityToken } = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    if (!identityToken) throw new Error('Apple 로그인 실패: identityToken이 없습니다.');
    appleLoginMutate({ data: { idToken: identityToken } });
  };

  return { isPending, kakaoLogin, googleLogin, appleLogin };
};
