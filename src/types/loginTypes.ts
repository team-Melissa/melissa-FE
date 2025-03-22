import type { SuccessDTO } from "./commonTypes";

export type DeleteAccount = SuccessDTO & {
  result: {
    userId: number;
    oauthProvider: "KAKAO" | "GOOGLE" | "APPLE";
    providerId: "string";
    email: "string";
    nickname: "string";
  };
};
