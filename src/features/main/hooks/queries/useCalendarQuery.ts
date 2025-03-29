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
    select: (data: CalendarDTO) => data.result.filter((calendar): calendar is TDay => !!calendar.imageS3),
  });
};
