import { router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutFn } from "@/src/apis/loginApi";
import { removeSecureValue } from "@/src/libs/secureStorage";
import { removeStorageValue } from "@/src/libs/mmkv";
import toastMessage from "@/src/constants/toastMessage";
import showToast from "@/src/libs/showToast";

const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutFn,
    onSuccess: async (data) => {
      showToast(toastMessage.logout.success, "success");
      console.log(data);
      await removeSecureValue("refreshToken");
      removeStorageValue("accessToken");
      removeStorageValue("aiProfileId");
      queryClient.clear(); // 로그아웃 후 다른 계정에 접속해도 캐시가 남아있는 문제 존재했음. 깜빡했다...
      router.replace("/login");
    },
    onError: (error) => {
      console.error(error.response?.data);
      showToast(toastMessage.logout.failed, "error");
    },
  });
};

export default useLogout;
