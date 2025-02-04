import { SuccessResponse } from "@/src/types/commonTypes";

export type NewThreadResult = SuccessResponse & {
  result: {
    threadId: number;
    year: number;
    month: number;
    day: number;
  };
};

export type ThreadDate = {
  year: number;
  month: number;
  day: number;
};

export type ExpiredDate = Date;
