import { router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeAccessToken } from "@/src/libs/mmkv";
import { removeRefreshToken } from "@/src/libs/secureStorage";
import { toast } from "@/src/modules/toast";
import toastMessage from "@/src/constants/toastMessage";
import axiosInstance from "@/src/libs/axiosInstance";
import endpoint from "@/src/constants/endpoint";
import type { DeleteAccountDTO } from "../../types/settingTypes";

export const _deleteAccount = async () => {
  const { data } = await axiosInstance.delete<DeleteAccountDTO>(endpoint.auth.delete);
  return data;
};

export const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: _deleteAccount,
    onSuccess: async (data) => {
      toast({ message: toastMessage.deleteAccount.success, options: { type: "success" } });
      console.log(data);
      await removeRefreshToken();
      removeAccessToken();
      queryClient.clear();
      router.replace("/login");
    },
    onError: (error) => {
      console.error(error.response?.data);
      toast({ message: toastMessage.deleteAccount.failed, options: { type: "error" } });
    },
  });
};
