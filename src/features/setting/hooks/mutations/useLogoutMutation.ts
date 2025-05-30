import { router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeRefreshToken } from "@/src/libs/secureStorage";
import { removeAccessToken } from "@/src/libs/mmkv";
import { toast } from "@/src/modules/toast";
import axiosInstance from "@/src/libs/axiosInstance";
import toastMessage from "@/src/constants/toastMessage";
import endpoint from "@/src/constants/endpoint";
import type { SuccessDTO } from "@/src/types/commonTypes";

export const _logout = async () => {
  const { data } = await axiosInstance.post<SuccessDTO>(endpoint.auth.logout);
  return data;
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: _logout,
    onSuccess: async (data) => {
      toast({ message: toastMessage.logout.success, options: { type: "success" } });
      console.log(data);
      await removeRefreshToken();
      removeAccessToken();
      queryClient.clear();
      router.replace("/login");
    },
    onError: (error) => {
      console.error(error.response?.data);
      toast({ message: toastMessage.logout.error, options: { type: "error" } });
    },
  });
};
