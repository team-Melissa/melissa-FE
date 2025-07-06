import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/src/modules/toast";
import toastMessage from "@/src/constants/toastMessage";
import axiosInstance from "@/src/libs/axiosInstance";
import endpoint from "@/src/constants/endpoint";
import type { TThreadDate } from "../../types/chattingTypes";
import type { DiaryDTO } from "../../types/diaryTypes";

const _postDiary = async ({ year, month, day }: TThreadDate) => {
  const { data } = await axiosInstance.post<DiaryDTO>(endpoint.thread.summary, null, { params: { year, month, day } });
  return data;
};

/**
 * @description 새로운 다이어리를 생성하는 mutation
 */
export const useDiaryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: _postDiary,
    onMutate: () => toast({ message: toastMessage.updateDiary.pending, options: { type: "success" } }),
    onSuccess: ({ result }) => {
      toast({ message: toastMessage.updateDiary.success, options: { type: "success" } });
      queryClient.invalidateQueries({ queryKey: ["calendar", result.year, result.month] });
      queryClient.invalidateQueries({ queryKey: ["diaries", result.year, result.month] });
    },
    onError: (error) => {
      console.log(error);
      toast({ message: toastMessage.updateDiary.error, options: { type: "error" } });
    },
  });
};
