import axios, { AxiosError, AxiosResponse } from "axios";
import { router } from "expo-router";
import { getStorageValue, setStorageValue, removeStorageValue } from "./mmkv";
import { getSecureValue, removeSecureValue } from "./secureStorage";
import endpoint from "../constants/endpoint";
import { ErrorResponse } from "../types/commonTypes";
import { RefreshTokenType } from "../types/loginTypes";
import { Alert } from "react-native";

// 전역 api 엔드포인트 설정
const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  withCredentials: true,
});

// 모든 요청 수행 전, token이 로컬 스토리지에 존재할 때만 Authorization 헤더에 토큰을 추가하는 인터셉터 등록
axiosInstance.interceptors.request.use((config) => {
  const accessToken = getStorageValue("accessToken");
  if (accessToken) config.headers.Authorization = accessToken;
  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ErrorResponse>) => {
    const { response, config } = error;
    // 401 에러는 refresh token으로 재발급 시도 후 성공하면 기존 요청 재시도
    if (response && config && response.status === 401) {
      try {
        const refreshToken = await getSecureValue("refreshToken");
        if (!refreshToken) throw new Error("refresh token이 null입니다");

        const { data } = await axios.post<RefreshTokenType>(
          `${process.env.EXPO_PUBLIC_API_URL}${endpoint.auth.refresh}`,
          {
            refreshToken,
          }
        );
        setStorageValue("accessToken", `${data.result.tokenType} ${data.result.accessToken}`);
        console.log("토큰 재발급 로직 성공");
        return axiosInstance(config);
      } catch (e) {
        console.error("토큰 재발급 로직 도중 에러", e);
        removeSecureValue("refreshToken");
        removeStorageValue("accessToken");
        Alert.alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
        router.replace("/login");
        return Promise.reject(error);
      }
    }

    // 그 외의 에러는 그냥 reject
    return Promise.reject(error);
  }
);

// axios 대신 axiosInstance를 사용하면 기본URL과 토큰 추가를 자동으로 수행
export default axiosInstance;
