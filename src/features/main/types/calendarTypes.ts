import type { ObjectNonNullable } from "@/src/types/UtilTypes";
import type { SuccessDTO } from "@/src/types/commonTypes";
import type { DateData } from "react-native-calendars";

export type TPressedDate = Pick<DateData, "year" | "month" | "day">;

export type TNullableDay = {
  year: number;
  month: number;
  day: number;
  hashTag1: string | null;
  hashTag2: string | null;
  imageS3: string | null;
};

// Todo: placeholder 이미지로 변경되면, 타입 정리 필요
export type TDay = Omit<ObjectNonNullable<TNullableDay>, "imageS3"> & { imageS3: string | null };

export type TNullableDiary = {
  year: number;
  month: number;
  day: number;
  imageS3: string | null;
  summaryTitle: string | null;
  summaryContent: string | null;
  hashTag1: string | null;
  hashTag2: string | null;
  summaryMood: ("HAPPY" | "SAD" | "TIRED" | "ANGRY" | "RELAX") | null;
};

// Todo: placeholder 이미지로 변경되면, 타입 정리 필요
export type TDiary = Omit<ObjectNonNullable<TNullableDiary>, "imageS3"> & { imageS3: string | null };

export type CalendarDTO = SuccessDTO & {
  result: (TNullableDay | TDay)[];
};

export type DiariesDTO = SuccessDTO & {
  result: (TNullableDiary | TDiary)[];
};
