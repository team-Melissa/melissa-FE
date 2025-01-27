import "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse } from "./commonTypes";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<ErrorResponse>;
  }
}
