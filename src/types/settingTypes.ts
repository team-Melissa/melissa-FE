import { SuccessDTO } from "./commonTypes";

export type CheckNewUserType = SuccessDTO & { result: boolean };

export type RegisterSettingType = SuccessDTO & { result: null };

export type UserSettingResult = SuccessDTO & {
  result: {
    sleepTime: string;
    notificationTime: string;
    notificationSummary: boolean;
  };
};
