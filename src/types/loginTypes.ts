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

export type RefreshTokenType = SuccessResponse & {
  result: {
    accessToken: string;
    tokenType: string;
    expiresIn: string;
  };
};
