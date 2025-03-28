import type { SuccessDTO } from "@/src/types/commonTypes";

export type LoginDTO = SuccessDTO & {
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
