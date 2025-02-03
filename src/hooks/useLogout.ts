import { useMutation } from "@tanstack/react-query";
import { logoutFn } from "@/src/apis/loginApi";
import { removeSecureValue } from "@/src/libs/secureStorage";
import { removeStorageValue } from "@/src/libs/mmkv";
import { router } from "expo-router";

const useLogout = () => {
  return useMutation({
    mutationFn: logoutFn,
    onSuccess: async (data) => {
      // Todo: 로그아웃 성공 Toast message 추가
      console.log(data);
      await removeSecureValue("refreshToken");
      removeStorageValue("accessToken");
      router.replace("/login");
    },
    onError: (error) => {
      console.error(error.response?.data);
      // Todo: 로그아웃 실패 Toast message 추가
    },
  });
};

export default useLogout;
