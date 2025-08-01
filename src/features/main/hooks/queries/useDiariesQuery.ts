import { useQuery } from "@tanstack/react-query";
import type { DiariesDTO, TDiary } from "../../types/calendarTypes";
import { _diaries } from "../../apis/diariesApi";

type TProps = {
  year: number;
  month: number;
};

export const DIARIES_QUERY_KEY = "diaries";

export const useDiariesQuery = ({ year, month }: TProps) => {
  return useQuery({
    queryFn: () => _diaries(year, month),
    queryKey: [DIARIES_QUERY_KEY, year, month],
    staleTime: 5 * 60 * 1000,
    select: (data: DiariesDTO) => data.result.filter((diary): diary is TDiary => !!diary.hashTag1),
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return 3000;
      const isRefetch = data.result.find((d) => !!d.summaryTitle && !d.imageS3);
      return isRefetch ? 2000 : false;
    },
  });
};
