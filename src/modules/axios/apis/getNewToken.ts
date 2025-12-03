import type { ApiResponseOAuthLoginResultDTO } from '@/src/apis/_generated/serverAPI.schemas';
import axios from 'axios';
import { SERVER_URL } from '../constants';

export const getNewToken = async (refreshToken: string) => {
  const { data } = await axios.post<ApiResponseOAuthLoginResultDTO>(`${SERVER_URL}/api/v1/auth/refresh`, undefined, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
    timeout: 5 * 1000,
  });
  return data.result;
};
