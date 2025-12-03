import { useRegisterToken } from '@/src/apis/_generated/serverAPI';
import type { ApiResponseOAuthLoginResultDTO } from '@/src/apis/_generated/serverAPI.schemas';
import toastMessage from '@/src/constants/toastMessage';
import { getNotificationToken, setAccessToken, setOAuthProvider } from '@/src/libs/mmkv';
import { setRefreshToken } from '@/src/libs/secureStorage';
import { toast } from '@/src/modules/toast';
import type { OAuthProvider } from '@/src/types/commonTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Platform } from 'react-native';
import { appleLoginMutateFn, googleLoginMutateFn, kakaoLoginMutateFn } from '../apis/login';

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

  const { isPending: kakaoIsPending, mutate: kakaoLoginMutate } = useMutation({
    mutationFn: kakaoLoginMutateFn,
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
  });

  const { isPending: googleIsPending, mutate: googleLoginMutate } = useMutation({
    mutationFn: googleLoginMutateFn,
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
  });

  const { isPending: appleIsPending, mutate: appleLoginMutate } = useMutation({
    mutationFn: appleLoginMutateFn,
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
  });

  const isPending = kakaoIsPending || googleIsPending || appleIsPending;

  return { isPending, kakaoLoginMutate, googleLoginMutate, appleLoginMutate };
};
