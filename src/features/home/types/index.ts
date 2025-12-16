import type { DailySummaryResponseDTO } from '@/src/apis/_generated/serverAPI.schemas';

export type CalendarDayData = NonNullable<DailySummaryResponseDTO> & {
  showBubble?: boolean;
};

export type TDate = {
  year: number;
  month: number;
  day: number;
};

export type TDateData = TDate & {
  dateString: string;
};
