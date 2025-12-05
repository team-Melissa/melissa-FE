import type { DailyPreviewResponseDTO } from '@/src/apis/_generated/serverAPI.schemas';
import type { CalendarDayData } from '../types';

export const isNonNullableDailyPreviewResponse = (
  value: DailyPreviewResponseDTO
): value is NonNullable<DailyPreviewResponseDTO> => {
  return !!value?.year;
};

export const isCalendarDayData = (value: DailyPreviewResponseDTO): value is CalendarDayData => {
  return !!value && 'showBubble' in value;
};
