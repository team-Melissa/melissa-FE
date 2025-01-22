import "@tanstack/react-query";
import { AxiosError } from "axios";

type ErrorResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
};

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<ErrorResponse>;
  }
}
