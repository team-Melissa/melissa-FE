import { useMutation } from "@tanstack/react-query";
import { logoutFn } from "@/src/apis/loginApi";
import { removeSecureValue } from "@/src/libs/secureStorage";
import { removeStorageValue } from "@/src/libs/mmkv";
import { router } from "expo-router";
import showToast from "@/src/libs/showToast";

const useLogout = () => {
  return useMutation({
    mutationFn: logoutFn,
    onSuccess: async (data) => {
      showToast("로그아웃에 성공했습니다.", "success");
      console.log(data);
      await removeSecureValue("refreshToken");
      removeStorageValue("accessToken");
      router.replace("/login");
    },
    onError: (error) => {
      console.error(error.response?.data);
      showToast("로그아웃에 실패했습니다.", "error");
    },
  });
};

export default useLogout;
