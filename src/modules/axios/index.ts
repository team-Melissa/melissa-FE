import type { AxiosError, AxiosRequestConfig } from 'axios';
import { axiosInstance } from './instances/instance';

export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;

export const orvalAxiosInstance = async <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  return axiosInstance({ ...config, ...options }).then(({ data }) => data);
};
