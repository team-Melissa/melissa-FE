import type { OAuthProvider, SuccessDTO } from '../types/commonTypes';

/**
 * @deprecated codegen으로 마이그레이션
 */
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
