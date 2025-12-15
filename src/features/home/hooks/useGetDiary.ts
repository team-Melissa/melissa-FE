import { useGetCalendarView } from '@/src/apis/_generated/serverAPI';
import type {
  ApiResponseListDailySummaryResponseDTO,
  GetCalendarViewParams,
} from '@/src/apis/_generated/serverAPI.schemas';
import type { Query } from '@tanstack/react-query';

export const useGetDiary = ({ year, month }: GetCalendarViewParams) => {
  return useGetCalendarView(
    { year, month },
    {
      query: { refetchInterval },
    }
  );
};

const refetchInterval = (query: Query<ApiResponseListDailySummaryResponseDTO>) => {
  const result = query.state.data?.result;
  if (!result) return 3000;

  const isRefetch = result.some((data) => data?.diaries.some((diary) => !!diary.hashtag1 && !diary.imageUrl));
  return isRefetch ? 2000 : false;
};
