import { router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAccountFn } from "@/src/apis/loginApi";
import { removeStorageValue } from "@/src/libs/mmkv";
import { removeSecureValue } from "@/src/libs/secureStorage";
import showToast from "@/src/libs/showToast";
import toastMessage from "@/src/constants/toastMessage";

const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAccountFn,
    onSuccess: async (data) => {
      showToast(toastMessage.deleteAccount.success, "success");
      console.log(data);
      await removeSecureValue("refreshToken");
      removeStorageValue("accessToken");
      removeStorageValue("aiProfileId");
      queryClient.clear();
      router.replace("/login");
    },
    onError: (error) => {
      console.error(error.response?.data);
      showToast(toastMessage.deleteAccount.failed, "error");
    },
  });
};

export default useDeleteAccount;
