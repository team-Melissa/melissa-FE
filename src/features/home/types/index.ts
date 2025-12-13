import type { DailySummaryResponseDTO } from '@/src/apis/_generated/serverAPI.schemas';

export type CalendarDayData = NonNullable<DailySummaryResponseDTO> & {
  showBubble?: boolean;
};

export type TDateData = {
  year: number;
  month: number;
  day: number;
  dateString: string;
};
