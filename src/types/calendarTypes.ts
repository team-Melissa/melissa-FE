import { SuccessResponse } from "@/src/types/commonTypes";

export type Day = {
  year: number;
  month: number;
  day: number;
  hashTag1: string;
  hashTag2: string;
  imageS3: string;
};

export type MonthCalendar = SuccessResponse & {
  result: Day[];
};
