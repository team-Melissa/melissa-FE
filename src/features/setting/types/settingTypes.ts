import type { SuccessDTO } from "@/src/types/commonTypes";

export type UserSettingDTO = SuccessDTO & {
  result: {
    sleepTime: string;
    notificationTime: string;
    notificationSummary: boolean;
  };
};

export type DeleteAccountDTO = SuccessDTO & {
  result: {
    userId: number;
    oauthProvider: "KAKAO" | "GOOGLE" | "APPLE";
    providerId: "string";
    email: "string";
    nickname: "string";
  };
};

export type TDatePickerType = "sleepTime" | "notificationTime" | null;
