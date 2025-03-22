import axiosInstance from "../libs/axiosInstance";
import endpoint from "../constants/endpoint";
import { DeleteAccount } from "@/src/types/loginTypes";
import type { SuccessDTO } from "../types/commonTypes";

export const logoutFn = async () => {
  const { data } = await axiosInstance.post<SuccessDTO>(endpoint.auth.logout);
  return data;
};

export const deleteAccountFn = async () => {
  const { data } = await axiosInstance.delete<DeleteAccount>(endpoint.auth.delete);
  return data;
};
