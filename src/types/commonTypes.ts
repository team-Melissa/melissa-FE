import { AxiosError, InternalAxiosRequestConfig } from "axios";

export type SuccessDTO = {
  isSuccess: true;
  code: string;
  message: string;
};

export type ErrorDTO = {
  isSuccess: false;
  code: string;
  message: string;
};

// axios interceptors에서 에러 핸들링에 사용할 확장된 AxiosError 타입
export interface AxiosErrorToInterceptors<T = unknown> extends AxiosError<T> {
  config: InternalAxiosRequestConfig & { sent?: true | undefined };
}
