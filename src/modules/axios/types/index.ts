import type { OAuthProvider, SuccessDTO } from "@/src/types/commonTypes";

export type RefreshDTO = SuccessDTO & {
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

export type PendingApiCallback = {
  onRefreshSuccess: (accessToken: string) => void;
  onRefreshError: () => void;
};
