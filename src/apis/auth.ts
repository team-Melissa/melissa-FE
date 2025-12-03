import axiosInstance from '@/src/libs/axiosInstance';
import type { OAuthProvider, SuccessDTO } from '../types/commonTypes';

/**
 * @deprecated codegen으로 마이그레이션
 */
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

/**
 * @deprecated codegen으로 마이그레이션
 */
type DeleteAccountDTO = SuccessDTO & {
  result: {
    userId: number;
    oauthProvider: 'KAKAO' | 'GOOGLE' | 'APPLE';
    providerId: 'string';
    email: 'string';
    nickname: 'string';
  };
};

/**
 * @deprecated codegen으로 마이그레이션
 */
export const logout = async () => {
  const { data } = await axiosInstance.post<SuccessDTO>('/api/v1/auth/logout');
  console.log('로그아웃 성공: ', data);
  return data;
};

/**
 * @deprecated codegen으로 마이그레이션
 */
export const deleteAccount = async () => {
  const { data } = await axiosInstance.delete<DeleteAccountDTO>('/api/v1/user');
  console.log('회원탈퇴 성공: ', data);
  return data;
};
