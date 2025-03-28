import type { SuccessDTO } from "@/src/types/commonTypes";

export type TDiary = {
  year: number;
  month: number;
  day: number;
  imageS3: string;
  summaryTitle: string;
  summaryContent: string;
  hashTag1: string;
  hashTag2: string;
  summaryMood: "HAPPY" | "SAD" | "TIRED" | "ANGRY" | "RELAX" | "HAPPY" | "SAD" | "TIRED" | "ANGRY" | "RELAX";
};

export type DiaryDTO = SuccessDTO & {
  result: TDiary;
};
