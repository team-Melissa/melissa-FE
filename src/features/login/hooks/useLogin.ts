import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { isAxiosError } from "axios";
import { appleLogin, googleLogin, kakaoLogin, type LoginDTO } from "@/src/apis/auth";
import { postExpoPushToken } from "@/src/apis/expoPushToken";
import { setAccessToken, setOAuthProvider } from "@/src/libs/mmkv";
import { setRefreshToken } from "@/src/libs/secureStorage";
import { toast } from "@/src/modules/toast";
import toastMessage from "@/src/constants/toastMessage";
import type { ErrorDTO } from "@/src/types/commonTypes";

const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleSuccess = async (data: LoginDTO) => {
    const { tokenType, accessToken, refreshToken, oauthProvider } = data.result;

    setAccessToken(`${tokenType} ${accessToken}`);
    await setRefreshToken(`${tokenType} ${refreshToken}`);
    setOAuthProvider(oauthProvider);

    try {
      await postExpoPushToken();
    } catch (error) {
      console.error("Expo push token 저장 도중 에러 발생: ", error);
    }

    queryClient.invalidateQueries({ queryKey: [] });
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
    mutationFn: kakaoLogin,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const { isPending: googleIsPending, mutate: googleMutate } = useMutation({
    mutationFn: googleLogin,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const { isPending: appleIsPending, mutate: appleMutate } = useMutation({
    mutationFn: appleLogin,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const isPending = kakaoIsPending || googleIsPending || appleIsPending;

  return { isPending, kakaoMutate, googleMutate, appleMutate };
};

export default useLogin;
