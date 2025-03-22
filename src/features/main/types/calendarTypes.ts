import type { SuccessDTO } from "@/src/types/commonTypes";
import type { DateData } from "react-native-calendars";

export type TPressedDate = Pick<DateData, "year" | "month" | "day">;

export type TDay = {
  year: number;
  month: number;
  day: number;
  hashTag1: string;
  hashTag2: string;
  imageS3: string;
};

export type TDiary = {
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

export type CalendarDTO = SuccessDTO & {
  result: TDay[];
};

export type DiariesDTO = SuccessDTO & {
  result: TDiary[];
};
