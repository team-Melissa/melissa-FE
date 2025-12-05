import type { DailyPreviewResponseDTO } from '@/src/apis/_generated/serverAPI.schemas';

export type CalendarDayData = NonNullable<DailyPreviewResponseDTO> & {
  showBubble: boolean;
};
