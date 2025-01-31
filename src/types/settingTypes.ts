import { SuccessResponse } from "./commonTypes";

export type CheckNewUserType = SuccessResponse & { result: boolean };

export type RegisterSettingType = SuccessResponse & { result: null };
