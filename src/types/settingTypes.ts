import { SuccessResponse } from "./commonTypes";

export type CheckNewUserType = SuccessResponse & { result: boolean };

export type RegisterSettingType = SuccessResponse & { result: null };

export type UserSettingResult = SuccessResponse & {
  result: {
    sleepTime: string;
    notificationTime: string;
    notificationSummary: boolean;
  };
};
