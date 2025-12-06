import type { DailySummaryResponseDTO, DiaryDetailDTO } from '@/src/apis/_generated/serverAPI.schemas';
import type { CalendarDayData } from '../types';

export const isNonNullableDailySummaryResponse = (
  value: DailySummaryResponseDTO
): value is NonNullable<DailySummaryResponseDTO> => {
  return !!value?.year;
};

export const isCalendarDayData = (value: DailySummaryResponseDTO): value is CalendarDayData => {
  return !!value && 'showBubble' in value;
};

export const isRequiredDiaryDetail = (value: DiaryDetailDTO): value is Required<DiaryDetailDTO> => {
  return !!value.title && !!value.content && !!value.imageUrl && !!value.hashtag1 && !!value.hashtag2 && !!value.mood;
};
