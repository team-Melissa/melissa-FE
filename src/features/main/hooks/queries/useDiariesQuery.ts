import { useQuery } from "@tanstack/react-query";
import type { DiariesDTO, TDiary } from "../../types/calendarTypes";

type TProps = {
  year: number;
  month: number;
};

export const useDiariesQuery = ({ year, month }: TProps) => {
  return useQuery({
    queryKey: ["diaries", year, month],
    staleTime: 5 * 60 * 1000,
    select: (data: DiariesDTO) => data.result.filter((diary): diary is TDiary => !!diary.imageS3),
  });
};
