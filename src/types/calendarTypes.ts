import { SuccessResponse } from "@/src/types/commonTypes";

export type Day = {
  year: number;
  month: number;
  day: number;
  hashTag1: string;
  hashTag2: string;
  imageS3: string;
};

export type Diary = {
  year: number;
  month: number;
  day: number;
  imageS3: string;
  summaryTitle: string;
  summaryContent: string;
  hashTag1: string;
  hashTag2: string;
  summaryMood:
    | "HAPPY"
    | "SAD"
    | "TIRED"
    | "ANGRY"
    | "RELAX"
    | "HAPPY"
    | "SAD"
    | "TIRED"
    | "ANGRY"
    | "RELAX";
};

export type MonthCalendar = SuccessResponse & {
  result: Day[];
};

export type DiaryResult = SuccessResponse & {
  result: Diary;
};

export type DiariesResult = SuccessResponse & {
  result: Diary[];
};
