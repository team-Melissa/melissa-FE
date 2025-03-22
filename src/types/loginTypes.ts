import { SuccessDTO } from "./commonTypes";

export type LoginType = SuccessDTO & {
  result: {
    userId: number;
    oauthProvider: "KAKAO" | "GOOGLE" | "APPLE";
    email: string;
    nickname: string;
    accessToken: string;
    refreshToken: string;
    tokenType: string;
  };
};

export type DeleteAccount = SuccessDTO & {
  result: {
    userId: number;
    oauthProvider: "KAKAO" | "GOOGLE" | "APPLE";
    providerId: "string";
    email: "string";
    nickname: "string";
  };
};
