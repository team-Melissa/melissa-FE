import axios, { AxiosResponse } from "axios";
import { Alert } from "react-native";
import { router } from "expo-router";
import { getStorageValue, setStorageValue, removeStorageValue } from "./mmkv";
import { getSecureValue, removeSecureValue, setSecureValue } from "./secureStorage";
import endpoint from "../constants/endpoint";
import { LoginType } from "../types/loginTypes";
import { AxiosErrorToInterceptors, ErrorResponse } from "../types/commonTypes";

/**
 * 토큰 refresh 도중 새로 발생한 401 error 콜백 함수 Type
 */
type PendingApiCallback = (accessToken: string) => void;

/**
 * 토큰 refresh 도중 새로 발생한 401 error 콜백 함수 Queue
 */
let pendingApiQueue: PendingApiCallback[] = [];

/**
 * 한 번만 refresh를 수행하기 위한 flag
 */
let isRefreshing: boolean = false;

/**
 * 새 토큰을 받았으면, 대기시켰던 api들을 새 토큰으로 다시 요청하고 Queue를 비우는 함수
 */
const runPendingApiCalls = (accessToken: string) => {
  console.log("배열 상태", pendingApiQueue.length);
  pendingApiQueue.forEach((callback) => callback(accessToken));
  pendingApiQueue = [];
};

/**
 * 전역 api 엔드포인트 설정
 */
const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  withCredentials: true,
});

/**
 * access token이 mmkv에 있으면 헤더에 추가하는 request interceptors
 */
axiosInstance.interceptors.request.use((config) => {
  const accessToken = getStorageValue("accessToken");
  if (accessToken) config.headers.Authorization = accessToken;
  return config;
});

/**
 * 응답 코드가 401이면, refresh token을 활용해 토큰 재발급 후 재요청을 수행하는 response interceptors
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosErrorToInterceptors<ErrorResponse>) => {
    const { response, config } = error;

    // 401 에러는 refresh token으로 재발급 시도 후 성공하면 기존 요청 재시도
    // 만약 이미 한 번 시도했는데 다시 여기로 왔다면, 시도 X (config.sent)
    if (response && config && response.status === 401 && !config.sent) {
      // 이미 재발급 중이면 Queue에 대기시킴
      if (isRefreshing) {
        console.log("토큰 재발급중... Queue에 추가합니다.");
        return new Promise((resolve) => {
          pendingApiQueue.push((newAccessToken) => {
            config.headers.Authorization = newAccessToken;
            resolve(axiosInstance(config));
          });
        });
      }

      // 재발급 중이 아니면 재발급 시도
      try {
        console.log("토큰 재발급 로직 시작", config.url);
        isRefreshing = true;
        const refreshToken = await getSecureValue("refreshToken");
        if (!refreshToken) {
          console.error("refresh token이 존재하지 않아 재발급 종료");
          return Promise.reject(error);
        }
        // refresh token으로 새 access token, refresh token 받아오기
        const { data } = await axiosInstance.post<LoginType>(endpoint.auth.refresh, {
          refreshToken,
        });
        // 예기치 못한 런타임 이슈로 무한루프가 발생하는 여지를 제거하기 위한 config 내 커스텀 flag
        config.sent = true;
        // 새 토큰들 저장
        const newAccessToken = `${data.result.tokenType} ${data.result.accessToken}`;
        setStorageValue("accessToken", newAccessToken);
        await setSecureValue("refreshToken", data.result.refreshToken);
        console.log("토큰 재발급 성공");
        // 재요청 대기중이던 api 요청
        runPendingApiCalls(newAccessToken);
        // 토큰 재발급 트리거가 되었던 api 재요청
        config.headers.Authorization = newAccessToken;
        return axiosInstance(config);
      } catch (e) {
        console.error("토큰 재발급 로직 도중 에러", e);
        removeSecureValue("refreshToken");
        removeStorageValue("accessToken");
        Alert.alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
        router.replace("/login");
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    // 그 외의 에러는 그냥 reject
    return Promise.reject(error);
  }
);

// axios 대신 axiosInstance를 사용하면 기본URL과 토큰 추가를 자동으로 수행
export default axiosInstance;
