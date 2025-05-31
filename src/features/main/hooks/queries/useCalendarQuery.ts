import { useQuery, skipToken } from "@tanstack/react-query";
import type { CalendarDTO, TDay } from "../../types/calendarTypes";
import { _calendar } from "../../apis/calendarApi";

type TProps = {
  year?: number;
  month?: number;
};

export const useCalendarQuery = ({ year, month }: TProps) => {
  return useQuery({
    queryFn: year && month ? () => _calendar(year, month) : skipToken,
    queryKey: ["calendar", year, month],
    staleTime: 5 * 60 * 1000,
    select: (data: CalendarDTO) => data.result.filter((calendar): calendar is TDay => !!calendar.hashTag1),
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return 3000;
      const isRefetch = data.result.find((d) => !!d.hashTag1 && !d.imageS3);
      return isRefetch ? 2000 : false;
    },
  });
};
