import { removeAccessToken, setAccessToken } from "@/src/libs/mmkv";
import { getRefreshToken, removeRefreshToken, setRefreshToken } from "@/src/libs/secureStorage";
import type { AxiosError } from "axios";
import axios from "axios";
import { router } from "expo-router";
import { getNewToken } from "../apis/getNewToken";
import type { PendingApiCallback } from "../types";

let pendingApiQueue: PendingApiCallback[] = [];

let isRefreshing = false;

const resolvePendingApiQueue = (accessToken: string) => {
  pendingApiQueue.forEach(({ onRefreshSuccess }) => onRefreshSuccess(accessToken));
  pendingApiQueue = [];
};

const rejectPendingApiQueue = () => {
  pendingApiQueue.forEach(({ onRefreshError }) => onRefreshError());
  pendingApiQueue = [];
};

export const responseErrorInterceptor = async (error: AxiosError) => {
  const requestConfig = error.config;

  if (!requestConfig || error.response?.status !== 401) {
    return Promise.reject(error);
  }

  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      pendingApiQueue.push({
        onRefreshSuccess: (newAccessToken) => {
          requestConfig.headers.Authorization = `Bearer ${newAccessToken}`;
          axios(requestConfig).then(resolve).catch(reject);
        },
        onRefreshError: () => {
          reject(error);
        }
      });
    });
  }

  isRefreshing = true;

  try {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) throw new Error("refreshToken이 없습니다");

    const newTokens = await getNewToken(refreshToken);
    if (!newTokens) throw new Error("토큰 재발급 실패");

    setAccessToken(newTokens.accessToken);
    await setRefreshToken(newTokens.refreshToken);
    resolvePendingApiQueue(newTokens.accessToken);
    requestConfig.headers.Authorization = `Bearer ${newTokens.accessToken}`;
    return axios(requestConfig);
  } catch {
    removeAccessToken();
    await removeRefreshToken();
    rejectPendingApiQueue();
    router.replace("/login");
    return Promise.reject(error);
  } finally {
    isRefreshing = false;
  }
};
