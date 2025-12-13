import endpoint from '@/src/constants/endpoint';
import toastMessage from '@/src/constants/toastMessage';
import axiosInstance from '@/src/libs/axiosInstance';
import { toast } from '@/src/modules/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { TThreadDate } from '../../types/chattingTypes';
import type { DiaryDTO } from '../../types/diaryTypes';

const upsertDiary = async ({ year, month, day }: TThreadDate) => {
  const { data } = await axiosInstance.post<DiaryDTO>(endpoint.thread.summary, null, { params: { year, month, day } });
  return data;
};

/**
 * @description 새로운 다이어리를 생성하는 mutation
 */
export const useDiaryMutation = (threadDate: TThreadDate) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => upsertDiary(threadDate),
    onMutate: () => toast({ message: toastMessage.updateDiary.pending, options: { type: 'success' } }),
    onSuccess: () => {
      toast({ message: toastMessage.updateDiary.success, options: { type: 'success' } });
      queryClient.invalidateQueries({ queryKey: [] });
      queryClient.invalidateQueries({ queryKey: [] });
    },
    onError: (error) => {
      console.error(error);
      toast({ message: toastMessage.updateDiary.error, options: { type: 'error' } });
    },
  });
};
