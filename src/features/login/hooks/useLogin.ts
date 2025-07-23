import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { isAxiosError } from "axios";
import { setAccessToken } from "@/src/libs/mmkv";
import { setRefreshToken } from "@/src/libs/secureStorage";
import { toast } from "@/src/modules/toast";
import toastMessage from "@/src/constants/toastMessage";
import type { ErrorDTO } from "@/src/types/commonTypes";
import type { LoginDTO } from "../types/loginTypes";
import { _appleLogin, _googleLogin, _kakaoLogin } from "../apis/loginApi";
import { IS_NEW_USER_QUERY_KEY } from "@/src/hooks";

const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleSuccess = async (data: LoginDTO) => {
    const { tokenType, accessToken, refreshToken } = data.result;
    setAccessToken(`${tokenType} ${accessToken}`);
    await setRefreshToken(`${tokenType} ${refreshToken}`);
    queryClient.invalidateQueries({ queryKey: [IS_NEW_USER_QUERY_KEY] });
    router.replace("/(app)");
    toast({ message: toastMessage.login.success, options: { type: "success" } });
  };

  const handleError = (error: unknown) => {
    console.error("로그인 실패!", error);
    if (isAxiosError<ErrorDTO>(error)) {
      console.error("OAuth 프로바이더 정상 작동, 백엔드와 문제 발생", error.response?.data);
      toast({ message: toastMessage.login.error, options: { type: "error" } });
    }
  };

  const { isPending: kakaoIsPending, mutate: kakaoMutate } = useMutation({
    mutationFn: _kakaoLogin,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const { isPending: googleIsPending, mutate: googleMutate } = useMutation({
    mutationFn: _googleLogin,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const { isPending: appleIsPending, mutate: appleMutate } = useMutation({
    mutationFn: _appleLogin,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const isPending = kakaoIsPending || googleIsPending || appleIsPending;

  return { isPending, kakaoMutate, googleMutate, appleMutate };
};

export default useLogin;
