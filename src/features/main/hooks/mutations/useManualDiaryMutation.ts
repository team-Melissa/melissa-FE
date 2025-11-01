import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DateData } from "react-native-calendars";
import endpoint from "@/src/constants/endpoint";
import toastMessage from "@/src/constants/toastMessage";
import axiosInstance from "@/src/libs/axiosInstance";
import { toast } from "@/src/modules/toast";
import { CALENDAR_QUERY_KEY } from "../queries/useCalendarQuery";
import { DIARIES_QUERY_KEY } from "../queries/useDiariesQuery";
import type { TManualDiaryDTO } from "../../types/calendarTypes";

type Params = {
  date: DateData;
  diary: {
    title: string;
    content: string;
    hashtag1: string;
    hashtag2: string;
  };
};

const postManualDiary = async (_params: Params) => {
  const { date, diary } = _params;
  const params = { year: date.year, month: date.month, day: date.day };
  const body = { ...diary, mood: "HAPPY", generateImage: true };

  const result = await axiosInstance.post<TManualDiaryDTO>(endpoint.calendar.createDiary, body, { params });
  return result.data;
};

export const useManualDiaryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postManualDiary,
    onSuccess: (_, { date }) => {
      const { year, month } = date;
      toast({ message: toastMessage.createDiary.success, options: { type: "success" } });
      queryClient.invalidateQueries({ queryKey: [CALENDAR_QUERY_KEY, year, month] });
      queryClient.invalidateQueries({ queryKey: [DIARIES_QUERY_KEY, year, month] });
    },
    onError: (error) => {
      console.error(error.response?.data);
      toast({ message: toastMessage.createDiary.error, options: { type: "error" } });
    },
  });
};
