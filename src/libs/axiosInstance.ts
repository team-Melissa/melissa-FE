import axios from "axios";
import { storage } from "./mmkv";

// 전역 api 엔드포인트 설정
const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

// 모든 요청 수행 전, token이 로컬 스토리지에 존재할 때만 Authorization 헤더에 토큰을 추가하는 인터셉터 등록
// Todo: refresh token, access token 관련 인터셉터 로직 추가하기
axiosInstance.interceptors.request.use((config) => {
  const token = storage.getString("jwt");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// axios 대신 axiosInstance를 사용하면 기본URL과 토큰 추가를 자동으로 수행
export default axiosInstance;
