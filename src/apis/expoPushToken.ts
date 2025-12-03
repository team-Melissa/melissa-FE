import { Platform } from 'react-native';
import axiosInstance from '../libs/axiosInstance';
import { getNotificationToken } from '../libs/mmkv';
import type { SuccessDTO } from '../types/commonTypes';

export type ExpoPushTokenDTO = SuccessDTO & {
  result: {
    id: number;
    expoPushToken: string;
    platform: 'ANDROID' | 'IOS';
    deviceId: string | null;
    invalid: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

export type DeleteExpoPushTokenDTO = SuccessDTO & {
  result: {
    expoPushToken: string;
    message: string;
  };
};

const getPlatform = () => {
  if (Platform.OS === 'ios') return 'IOS';
  if (Platform.OS === 'android') return 'ANDROID';
  return null;
};

export const postExpoPushToken = async () => {
  const expoPushToken = getNotificationToken();
  const platform = getPlatform();
  if (!expoPushToken || !platform) return;

  const { data } = await axiosInstance.post<ExpoPushTokenDTO>('/api/v1/expo-push-tokens', {
    expoPushToken,
    platform,
  });
  console.log('Expo push token 저장 완료: ', data);
  return data;
};

export const deleteExpoPushToken = async () => {
  const expoPushToken = getNotificationToken();
  if (!expoPushToken) return;

  const { data } = await axiosInstance.delete<DeleteExpoPushTokenDTO>(`/api/v1/expo-push-tokens/${expoPushToken}`);
  console.log('Expo push token 삭제 완료: ', data);
  return data;
};
