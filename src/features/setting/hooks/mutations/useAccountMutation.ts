import { useDeleteToken, useDeleteUser, useLogout } from '@/src/apis/_generated/serverAPI';
import { getNotificationToken, removeAccessToken, removeNotificationToken } from '@/src/libs/mmkv';
import { removeRefreshToken } from '@/src/libs/secureStorage';
import { toast } from '@/src/modules/toast';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';

export const useAccountMutation = () => {
  const queryClient = useQueryClient();

  const deleteNotificationTokenMutation = useDeleteToken({
    mutation: { onSuccess: () => removeNotificationToken() },
  });

  const handleMutationSuccess = async () => {
    const expoPushToken = getNotificationToken();
    if (expoPushToken) deleteNotificationTokenMutation.mutate({ expoPushToken });
    await removeRefreshToken();
    removeAccessToken();
    queryClient.clear();
    router.replace('/login');
  };

  const logoutMutation = useLogout({
    mutation: {
      onSuccess: async () => {
        toast({ message: '로그아웃에 성공했습니다.', options: { type: 'success' } });
        await handleMutationSuccess();
      },
      onError: () => toast({ message: '로그아웃에 실패했습니다.', options: { type: 'error' } }),
    },
  });

  const deleteUserMutation = useDeleteUser({
    mutation: {
      onSuccess: async () => {
        toast({ message: '이용해주셔서 감사합니다.', options: { type: 'success' } });
        await handleMutationSuccess();
      },
      onError: () => toast({ message: '회원 탈퇴에 실패했습니다.', options: { type: 'error' } }),
    },
  });

  return { logoutMutation, deleteUserMutation };
};
