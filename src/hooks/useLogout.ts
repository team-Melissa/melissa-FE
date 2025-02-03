import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { logoutFn } from "@/src/apis/loginApi";
import { removeSecureValue } from "@/src/libs/secureStorage";
import { removeStorageValue } from "@/src/libs/mmkv";
import toastMessage from "@/src/constants/toastMessage";
import showToast from "@/src/libs/showToast";

const useLogout = () => {
  return useMutation({
    mutationFn: logoutFn,
    onSuccess: async (data) => {
      showToast(toastMessage.logout.success, "success");
      console.log(data);
      await removeSecureValue("refreshToken");
      removeStorageValue("accessToken");
      router.replace("/login");
    },
    onError: (error) => {
      console.error(error.response?.data);
      showToast(toastMessage.logout.failed, "error");
    },
  });
};

export default useLogout;
