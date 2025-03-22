import axiosInstance from "@/src/libs/axiosInstance";
import endpoint from "@/src/constants/endpoint";
import type { RegisterDTO } from "../types/registerTypes";

export const _register = async () => {
  const { data } = await axiosInstance.post<RegisterDTO>(endpoint.setting.register);
  return data;
};
