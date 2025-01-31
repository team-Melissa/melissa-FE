import { SuccessResponse } from "./commonTypes";

export type CheckNewUser = SuccessResponse & { result: boolean };

export type RegisterSettingType = SuccessResponse & { result: null };
