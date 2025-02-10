import { SuccessResponse } from "./commonTypes";

export type LoginType = SuccessResponse & {
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

export type DeleteAccount = SuccessResponse & {
  result: {
    userId: number;
    oauthProvider: "KAKAO" | "GOOGLE" | "APPLE";
    providerId: "string";
    email: "string";
    nickname: "string";
  };
};
