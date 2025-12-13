import endpoint from '@/src/constants/endpoint';
import toastMessage from '@/src/constants/toastMessage';
import axiosInstance from '@/src/libs/axiosInstance';
import { toast } from '@/src/modules/toast';
import type { SuccessDTO } from '@/src/types/commonTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

const removeAiProfile = async (aiProfileId: number) => {
  const { data } = await axiosInstance.delete<SuccessDTO>(`${endpoint.aiProfile.aiProfilesV1}/${aiProfileId}`);
  return data;
};

export const useRemoveAiProfileMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: removeAiProfile,
    onSettled: () => {
      router.replace('/(app)/(tab)/calendar');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [] });
      toast({ message: toastMessage.removeAssistant.success, options: { type: 'success' } });
    },
    onError: (error) => {
      console.error(error.response?.data);
      toast({ message: toastMessage.removeAssistant.error, options: { type: 'error' } });
    },
  });
};
