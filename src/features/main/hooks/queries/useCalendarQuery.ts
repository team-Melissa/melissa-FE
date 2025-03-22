import { useQuery } from "@tanstack/react-query";
import type { CalendarDTO } from "../../types/calendarTypes";

type TProps = {
  year?: number;
  month?: number;
};

export const useCalendarQuery = ({ year, month }: TProps) => {
  return useQuery<CalendarDTO>({
    queryKey: ["calendar", year, month],
  });
};
