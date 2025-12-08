import { getGetUserSettingQueryKey, useUpdateUserSetting } from '@/src/apis/_generated/serverAPI';
import type { ApiResponseUserSettingResponse } from '@/src/apis/_generated/serverAPI.schemas';
import { toast } from '@/src/modules/toast';
import { useQueryClient } from '@tanstack/react-query';

export const useUserSettingMutation = (userSetting?: ApiResponseUserSettingResponse) => {
  const queryClient = useQueryClient();
  const queryKey = getGetUserSettingQueryKey();

  return useUpdateUserSetting({
    mutation: {
      onMutate: (variables) => {
        if (!userSetting) return;
        queryClient.setQueryData<ApiResponseUserSettingResponse>(queryKey, {
          ...userSetting,
          result: variables.data,
        });
      },
      onSettled: () => queryClient.invalidateQueries({ queryKey: queryKey }),
      onSuccess: () => toast({ message: '설정 업데이트 완료.', options: { type: 'success' } }),
      onError: () => toast({ message: '설정 업데이트 도중 문제 발생.', options: { type: 'error' } }),
    },
  });
};
