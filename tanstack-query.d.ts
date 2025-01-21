import "@tanstack/react-query";
import { AxiosError } from "axios";

// Todo: Error타입 백엔드로부터 전달받으면 수정하기
type ErrorResponse = {
  code: string;
  message: string;
};

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<ErrorResponse>;
  }
}
