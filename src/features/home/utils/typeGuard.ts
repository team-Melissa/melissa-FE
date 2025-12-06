import type { DailySummaryResponseDTO } from '@/src/apis/_generated/serverAPI.schemas';
import type { CalendarDayData } from '../types';

export const isNonNullableDailySummaryResponse = (
  value: DailySummaryResponseDTO
): value is NonNullable<DailySummaryResponseDTO> => {
  return !!value?.year;
};

export const isCalendarDayData = (value: DailySummaryResponseDTO): value is CalendarDayData => {
  return !!value && 'showBubble' in value;
};
