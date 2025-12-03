import axios from 'axios';
import { SERVER_URL } from '../constants';
import { requestInterceptor } from '../interceptors/request';
import { responseErrorInterceptor } from '../interceptors/response';

export const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
  timeout: 5 * 1000,
});

axiosInstance.interceptors.request.use(requestInterceptor, undefined);
axiosInstance.interceptors.response.use(undefined, responseErrorInterceptor);
