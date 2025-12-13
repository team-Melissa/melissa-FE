import { getGetCalendarViewQueryKey, useGetCalendarView } from '@/src/apis/_generated/serverAPI';
import type { ApiResponseListDailySummaryResponseDTO } from '@/src/apis/_generated/serverAPI.schemas';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { isNonNullableDailySummaryResponse } from '../utils/typeGuard';

type Props = {
  year: number;
  month: number;
  intervalMs: number;
};

const getHashtagBubbleCount = (totalCount: number) => {
  if (totalCount === 0) return 0;
  if (totalCount >= 16) return 5;
  if (totalCount >= 6) return 3;
  return 1;
};

export const useRandomizeHashtagBubble = ({ year, month, intervalMs }: Props) => {
  const isEvenTurnRef = useRef<boolean>(true);
  const queryClient = useQueryClient();

  const { data } = useGetCalendarView({ year, month });

  useEffect(() => {
    if (!data?.result) return;

    const queryKey = getGetCalendarViewQueryKey({ year, month });

    const interval = setInterval(() => {
      queryClient.setQueryData<ApiResponseListDailySummaryResponseDTO>(queryKey, (oldData) => {
        if (!oldData?.result) return oldData;

        const filteredDays = oldData.result
          .filter(isNonNullableDailySummaryResponse)
          .map(({ day }) => day)
          .filter((day) => (isEvenTurnRef.current ? day % 2 === 0 : day % 2 === 1));

        const hashtagBubbleCount = getHashtagBubbleCount(filteredDays.length);
        const randomizedDays = [...filteredDays].sort(() => Math.random() - 0.5);
        const selectedDays = new Set(randomizedDays.slice(0, hashtagBubbleCount));

        const result = oldData.result.map((item) => {
          if (!item) return item;
          return { ...item, showBubble: selectedDays.has(item.day) };
        });

        return { ...oldData, result };
      });

      isEvenTurnRef.current = !isEvenTurnRef.current;
    }, intervalMs);

    return () => clearInterval(interval);
  }, [data, intervalMs, year, month, queryClient]);
};
