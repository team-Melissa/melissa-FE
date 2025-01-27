import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { kakaoLoginFn } from "../apis/loginApi";
import { ErrorResponse } from "../types/commonTypes";
import LoginType from "../types/loginTypes";

const useLogin = () => {
  const handleSuccess = (data: LoginType) => {
    console.log(`${data.result.oauthProvider} 로그인 성공!`);
  };
  const handleError = (error: AxiosError<ErrorResponse>) => {
    console.error("로그인 실패!", error.response?.data);
  };

  const { isPending: kakaoIsPending, mutate: kakaoMutate } = useMutation({
    mutationFn: kakaoLoginFn,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const isPending = kakaoIsPending;

  return { isPending, kakaoMutate };
};

export default useLogin;
