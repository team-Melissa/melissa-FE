import type { TThreadDate, TThreadDateSearchParams } from "../types/chattingTypes";

export const readOnlyTypeGuard = (date: TThreadDateSearchParams): date is TThreadDate => {
  return !!date.year && !!date.month && !!date.day;
};
