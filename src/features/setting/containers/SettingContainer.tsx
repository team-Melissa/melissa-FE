import { getGetUserSettingQueryKey, useGetUserSetting, useUpdateUserSetting } from '@/src/apis/_generated/serverAPI';
import type { ApiResponseUserSettingResponse } from '@/src/apis/_generated/serverAPI.schemas';
import { COLOR } from '@/src/constants/theme';
import { toast } from '@/src/modules/toast';
import { useQueryClient } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import SettingList from '../components/SettingList';

export default function SettingContainer() {
  const queryClient = useQueryClient();
  const { data: userSetting } = useGetUserSetting();

  const updateUserSettingMutation = useUpdateUserSetting({
    mutation: {
      onMutate: (variables) => {
        if (!userSetting) return;
        queryClient.setQueryData<ApiResponseUserSettingResponse>(getGetUserSettingQueryKey(), {
          ...userSetting,
          result: variables.data,
        });
      },
      onSettled: () => queryClient.invalidateQueries({ queryKey: getGetUserSettingQueryKey() }),
      onSuccess: () => toast({ message: '설정 업데이트 완료.', options: { type: 'success' } }),
      onError: () => toast({ message: '설정 업데이트 도중 문제 발생.', options: { type: 'error' } }),
    },
  });

  const handleNotificationToggle = (notificationSummary: boolean) => {
    if (!userSetting?.result || updateUserSettingMutation.isPending) return;
    updateUserSettingMutation.mutate({ data: { ...userSetting.result, notificationSummary } });
  };

  const handleSummaryTimeChange = (sleepTime: string) => {
    if (!userSetting?.result || updateUserSettingMutation.isPending) return;
    updateUserSettingMutation.mutate({ data: { ...userSetting.result, sleepTime } });
  };

  const handleNotificationTimeChange = (notificationTime: string) => {
    if (!userSetting?.result || updateUserSettingMutation.isPending) return;
    updateUserSettingMutation.mutate({ data: { ...userSetting.result, notificationTime } });
  };

  if (!userSetting?.result) return null;

  return (
    <SafeView>
      <SettingList
        settingData={userSetting.result}
        onNotificationToggle={handleNotificationToggle}
        onSummaryTimeChange={handleSummaryTimeChange}
        onNotificationTimeChange={handleNotificationTimeChange}
      />
    </SafeView>
  );
}

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.background};
`;
