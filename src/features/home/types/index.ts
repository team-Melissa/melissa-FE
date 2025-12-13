import type { DailySummaryResponseDTO } from '@/src/apis/_generated/serverAPI.schemas';

export type CalendarDayData = NonNullable<DailySummaryResponseDTO> & {
  showBubble?: boolean;
};
