import axiosInstance from '../libs/axiosInstance';
import { getNotificationToken } from '../libs/mmkv';
import type { SuccessDTO } from '../types/commonTypes';

/**
 * @deprecated codegen으로 마이그레이션
 */
type DeleteExpoPushTokenDTO = SuccessDTO & {
  result: {
    expoPushToken: string;
    message: string;
  };
};
/**
 * @deprecated codegen으로 마이그레이션
 */
export const deleteExpoPushToken = async () => {
  const expoPushToken = getNotificationToken();
  if (!expoPushToken) return;

  const { data } = await axiosInstance.delete<DeleteExpoPushTokenDTO>(`/api/v1/expo-push-tokens/${expoPushToken}`);
  console.log('Expo push token 삭제 완료: ', data);
  return data;
};
