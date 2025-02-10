import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { isAxiosError } from "axios";
import { appleLoginFn, googleLoginFn, kakaoLoginFn } from "../apis/loginApi";
import { setRefreshToken } from "../libs/secureStorage";
import { setAccessToken } from "../libs/mmkv";
import { ErrorResponse } from "../types/commonTypes";
import { LoginType } from "../types/loginTypes";
import toastMessage from "@/src/constants/toastMessage";
import showToast from "@/src/libs/showToast";

const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleSuccess = async (data: LoginType) => {
    console.log(`${data.result.oauthProvider} 로그인 성공!`);
    setAccessToken(`${data.result.tokenType} ${data.result.accessToken}`);
    await setRefreshToken(data.result.refreshToken);
    queryClient.invalidateQueries({ queryKey: ["check-new-user"] });
    router.replace("/(app)");
    showToast(toastMessage.login.success, "success");
  };

  const handleError = (error: unknown) => {
    console.error("로그인 실패!", error);
    if (isAxiosError<ErrorResponse>(error)) {
      console.error("OAuth 프로바이더 정상 작동, 백엔드와 문제 발생", error.response?.data);
      showToast(toastMessage.login.failed, "error");
    }
  };

  const { isPending: kakaoIsPending, mutate: kakaoMutate } = useMutation({
    mutationFn: kakaoLoginFn,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const { isPending: googleIsPending, mutate: googleMutate } = useMutation({
    mutationFn: googleLoginFn,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const { isPending: appleIsPending, mutate: appleMutate } = useMutation({
    mutationFn: appleLoginFn,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const isPending = kakaoIsPending || googleIsPending || appleIsPending;

  return { isPending, kakaoMutate, googleMutate, appleMutate };
};

export default useLogin;
