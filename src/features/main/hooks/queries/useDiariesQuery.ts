import { useQuery } from "@tanstack/react-query";
import { DiariesDTO } from "../../types/calendarTypes";

type TProps = {
  year: number;
  month: number;
};

export const useDiariesQuery = ({ year, month }: TProps) => {
  return useQuery<DiariesDTO>({
    queryKey: ["diaries", year, month],
    staleTime: 5 * 60 * 1000,
  });
};
