import type { OAuthProvider, SuccessDTO } from "@/src/types/commonTypes";

export type LoginDTO = SuccessDTO & {
  result: {
    userId: number;
    oauthProvider: OAuthProvider;
    email: string;
    nickname: string;
    accessToken: string;
    refreshToken: string;
    tokenType: string;
  };
};
